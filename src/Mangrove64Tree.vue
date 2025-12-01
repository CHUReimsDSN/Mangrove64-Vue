<script setup lang="ts" generic="T extends object">
import {
  computed,
  onMounted,
  ref,
  watch,
  nextTick,
  onScopeDispose,
  useSlots,
  type Ref,
  type Slot,
} from "vue";
import TreeTableHeaderCell from "./components/TreeTableHeaderCell.vue";
import TreeTableRow from "./components/TreeTableRow.vue";
import TreeTableFakeRow from "./components/TreeTableFakeRow.vue";
import Sortable, { MultiDrag, type Options } from "sortablejs";
import type {
  TMangrove64TreeProps,
  TMangrove64TreeColumn,
  TMangrove64TreeApi,
} from "./models";
import type {
  TTreeTableHierarchy,
  TTreeTableNodeKey,
  TTreeTableSlot,
} from "./private-models";

// props
const propsComponent = withDefaults(defineProps<TMangrove64TreeProps<T>>(), {
  draggable: false,
  nodeKey: "id" as keyof T,
  childrenKey: "children" as keyof T,
  hasChildrenKey: "has_children" as keyof T,
  parentKey: "parent_id" as keyof T,
  expandeAllNodeAtStart: false,
  selectionMode: "unique",
  resizableColumns: false,
  indentationPx: 25,
  borderStrategy: "none",
  tableCssClass: "",
  rowCssClass: "",
  cellCssClass: "",
  nodeKeyType: "number",
  checkboxColor: "primary",
});

// emits
const emitsComponent = defineEmits<{
  (e: "node-expand", node: T): void;
  (e: "node-collapse", node: T): void;
  (e: "node-select", node: T): void;
  (e: "node-unselect", node: T): void;
  (
    e: "lazy-load-children",
    params: {
      node: T;
      nodeKey: TTreeTableNodeKey;
      done: (node: T[]) => Promise<void> | void;
    }
  ): void;
  (
    e: "node-move",
    node: T,
    parentKey: TTreeTableNodeKey | null,
    positionWithinParent: number
  ): void;
}>();

// slots
defineSlots<Record<string, TTreeTableSlot<T>>>();

// vars
let moveEventTargetAttribute: string | null = null;

// consts
const dataKeyAttribute = "data-key" as const;
const fakeElementPrefix = "__tree-table-fake-row-" as const;
const rootHierarchyKey = "__tree-table-null-hierarchy-key" as const;
const slots = useSlots();
const elementKeys: Map<TTreeTableNodeKey, HTMLElement> = new Map();
const hierarchiKeys: Map<TTreeTableNodeKey, TTreeTableHierarchy> = new Map();
const indexKeys: Map<TTreeTableNodeKey, number> = new Map();

// refs
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const nodesRef = ref<T[]>([]) as Ref<T[]>;
const columnsRef = ref<TMangrove64TreeColumn<T>[]>(
  propsComponent.columns
) as Ref<TMangrove64TreeColumn<T>[]>;
const expandedKeys = ref<Set<TTreeTableNodeKey>>(new Set());
const selectedKeys = ref<Set<TTreeTableNodeKey>>(new Set());
const levelKeys = ref<Map<TTreeTableNodeKey, number>>(new Map());
const hiddenKeys = ref<Set<TTreeTableNodeKey>>(new Set());
const loadingKeys = ref<Set<TTreeTableNodeKey>>(new Set());
const treeBodyEl = ref<HTMLElement | null>(null);
const isReady = ref(false);
const isDragging = ref(false);
const rerenderTrick = ref(0);

// hooks
const hook = useSortable(treeBodyEl);

// functions
function init() {
  hierarchiKeys.set(rootHierarchyKey, {
    parent: rootHierarchyKey + "-unknown",
    children: [],
  });

  nodesRef.value = computedAllNodes(
    propsComponent.nodes,
    0,
    rootHierarchyKey,
    []
  )[0];

  if (propsComponent.expandeAllNodeAtStart) {
    nodesRef.value.forEach((node) => {
      expandedKeys.value.add(getNodeKeyValue(node as unknown as T));
    });
  } else {
    propsComponent.expandedNodeAtStart?.forEach((expandedNode) => {
      expandedKeys.value.add(expandedNode);
    });
  }

  propsComponent.selectedNodeAtStart?.forEach((selectedNode) => {
    setSelectedKeys(selectedNode, true);
  });

  hook.start();
}
function useSortable(el: Ref<HTMLElement | null>) {
  let sortable: Sortable | undefined;

  const options: Options = {
    multiDrag: true,
    dataIdAttr: "node-key",
    onStart: () => {
      isDragging.value = true;
    },
    onEnd: (event) => {
      const nodeAttribute = event.item.getAttribute(dataKeyAttribute);
      if (!nodeAttribute) {
        isDragging.value = false;
        return;
      }
      if (!selectedKeys.value.has(castAttributeToNodeKeyType(nodeAttribute))) {
        isDragging.value = false;
        return;
      }
      if (nodeAttribute.includes(fakeElementPrefix)) {
        isDragging.value = false;
        return;
      }
      if (!moveEventTargetAttribute) {
        isDragging.value = false;
        return;
      }

      // determine mode
      const movingMode: "child-to-previous" | "brother-to-previous" =
        moveEventTargetAttribute.includes(fakeElementPrefix)
          ? "brother-to-previous"
          : "child-to-previous";
      const targetNodeKey = castAttributeToNodeKeyType(
        moveEventTargetAttribute.replaceAll(fakeElementPrefix, "")
      );
      const targetHierarchy = hierarchiKeys.get(targetNodeKey);
      if (!targetHierarchy) {
        isDragging.value = false;
        return;
      }

      // update moving nodes hierarchy and levels
      let hasResetParentChildren = false;
      [...selectedKeys.value]
        .sort((selectedA, selectedB) => {
          return (
            (indexKeys.get(selectedA) ?? 0) - (indexKeys.get(selectedB) ?? 0)
          );
        })
        .forEach((movingNodeKey) => {
          const hierarchyMovingNode = hierarchiKeys.get(movingNodeKey);
          if (!hierarchyMovingNode) {
            return;
          }

          if (selectedKeys.value.has(hierarchyMovingNode.parent)) {
            const levelMovingParent =
              levelKeys.value.get(hierarchyMovingNode.parent) ?? -1;
            levelKeys.value.set(movingNodeKey, levelMovingParent + 1);
            return;
          }

          const oldParentHierarchy = hierarchiKeys.get(
            hierarchyMovingNode.parent
          );
          if (oldParentHierarchy) {
            oldParentHierarchy.children = oldParentHierarchy.children.filter(
              (childFilter) => {
                return childFilter !== movingNodeKey;
              }
            );
          }

          let newPositionInParent = -1;

          if (movingMode === "brother-to-previous") {
            hierarchyMovingNode.parent = targetHierarchy.parent;
            const targetParentHierarchy = hierarchiKeys.get(
              targetHierarchy.parent
            );
            if (targetParentHierarchy) {
              newPositionInParent = targetParentHierarchy.children.findIndex(
                (childFindIndex) => {
                  return childFindIndex === targetNodeKey;
                }
              );
              if (newPositionInParent !== -1) {
                newPositionInParent += 1;
              }
              targetParentHierarchy.children.splice(
                newPositionInParent,
                0,
                movingNodeKey
              );
            }
          } else if (movingMode === "child-to-previous") {
            hierarchyMovingNode.parent = targetNodeKey;
            const targetHierarchy = hierarchiKeys.get(targetNodeKey);
            if (targetHierarchy) {
              targetHierarchy.children.unshift(movingNodeKey);
            }
          }

          // nodesref update
          if (newPositionInParent !== -1) {
            const keyNewParent =
              hierarchyMovingNode.parent === rootHierarchyKey
                ? null
                : hierarchyMovingNode.parent;
            const recursiveChildrenCount = getRecursiveChildrenCount(
              movingNodeKey,
              0
            );
            const nodeRefOldIndex = indexKeys.get(movingNodeKey) ?? 0;
            const nodesRefToMove = nodesRef.value.splice(
              nodeRefOldIndex,
              recursiveChildrenCount + 1
            );
            computeIndexKeys();
            const nodeRefNewIndex = indexKeys.get(targetNodeKey) ?? 0;
            if (keyNewParent !== null) {
              const parentNodeIndex = indexKeys.get(keyNewParent);
              if (parentNodeIndex !== undefined) {
                const parentNode = nodesRef.value[parentNodeIndex]!;
                let parentChildren: T[] = [];
                if (!hasResetParentChildren) {
                  parentChildren = [];
                  hasResetParentChildren = true;
                } else {
                  parentChildren = parentChildren.concat(
                    getNodeChildren(parentNode)
                  );
                }
                parentChildren.push(nodesRefToMove[0]!);
                setNodeChildren(parentNode, parentChildren);
              }
            }
            setNodeParent(nodesRefToMove[0]!, keyNewParent);
            setNodeOrder(nodesRefToMove[0]!, newPositionInParent);
            nodesRef.value.splice(nodeRefNewIndex + 1, 0, ...nodesRefToMove);
            computeIndexKeys();
            emitsComponent(
              "node-move",
              nodesRefToMove[0]!,
              keyNewParent,
              newPositionInParent
            );
          }
        });

      // re-adjust fake rows
      if (movingMode === "child-to-previous") {
        const targetElementFake = elementKeys.get(
          getElementFakeNodeKey(targetNodeKey)
        );
        if (targetElementFake && targetElementFake.parentElement) {
          const parentElement = targetElementFake.parentElement;
          parentElement.removeChild(targetElementFake);
          parentElement.insertBefore(targetElementFake, event.item);
        }
      }

      isDragging.value = false;
      moveEventTargetAttribute = null;
      rerenderTrick.value++;
      void nextTick(() => {
        elementKeys.clear();
        setupElementsKeys(nodesRef.value);
        hook.stop();
        hook.start();
        selectedKeys.value.forEach((selectedKey) => {
          setSelectedKeys(selectedKey, true);
        });
      });
    },
    onSelect: (event) => {
      const nodeKey = event.item.getAttribute(dataKeyAttribute);
      if (!nodeKey) {
        return false;
      }
      if (!selectedKeys.value.has(nodeKey)) {
        Sortable.utils.deselect(event.item);
      }
    },
    onDeselect: (event) => {
      const nodeKey = event.item.getAttribute(dataKeyAttribute);
      if (!nodeKey) {
        return false;
      }
      if (selectedKeys.value.has(nodeKey)) {
        Sortable.utils.select(event.item);
      }
    },
    onMove: (event) => {
      const nodeAttribute = event.dragged.getAttribute(dataKeyAttribute);
      if (!nodeAttribute) {
        return false;
      }
      if (!selectedKeys.value.has(castAttributeToNodeKeyType(nodeAttribute))) {
        return false;
      }
      if (nodeAttribute.includes(fakeElementPrefix)) {
        return false;
      }
      const targetAttribute = event.willInsertAfter
        ? event.related.getAttribute(dataKeyAttribute)
        : event.related.previousElementSibling?.getAttribute(dataKeyAttribute);
      if (!targetAttribute) {
        return false;
      }
      moveEventTargetAttribute = targetAttribute;

      // determine mode
      const movingMode: "child-to-previous" | "brother-to-previous" =
        targetAttribute.includes(fakeElementPrefix)
          ? "brother-to-previous"
          : "child-to-previous";

      const targetNodeKey =
        movingMode === "child-to-previous" && event.willInsertAfter
          ? castAttributeToNodeKeyType(targetAttribute)
          : castAttributeToNodeKeyType(
              targetAttribute.replaceAll(fakeElementPrefix, "")
            );
      const targetHierarchy = hierarchiKeys.get(targetNodeKey);
      if (!targetHierarchy) {
        return false;
      }

      // update levels
      [...selectedKeys.value]
        .sort((selectedA, selectedB) => {
          return (
            (indexKeys.get(selectedA) ?? 0) - (indexKeys.get(selectedB) ?? 0)
          );
        })
        .forEach((movingNodeKey) => {
          const hierarchyMovingNode = hierarchiKeys.get(movingNodeKey);
          if (!hierarchyMovingNode) {
            return;
          }

          const levelTargetKey = levelKeys.value.get(targetNodeKey) ?? 0;
          if (movingMode === "brother-to-previous") {
            levelKeys.value.set(movingNodeKey, levelTargetKey);
          } else if (movingMode === "child-to-previous") {
            levelKeys.value.set(movingNodeKey, levelTargetKey + 1);
          }
        });
    },
  };

  const start = () => {
    if (!propsComponent.draggable || el.value === null) {
      return;
    }
    try {
      Sortable.mount(new MultiDrag());
    } catch {
      // Can't unmount, either ignore the remount error, or have a Mangrove64.init()
    }
    sortable = new Sortable(el.value, { ...options });
  };

  const stop = () => {
    if (!propsComponent.draggable) {
      return;
    }
    sortable?.destroy();
    sortable = undefined;
  };

  return {
    stop,
    start,
  };
}
function getRecursiveChildrenCount(
  nodeKey: TTreeTableNodeKey,
  accumulator: number
) {
  const hierarchyNode = hierarchiKeys.get(nodeKey);
  if (!hierarchyNode) {
    return accumulator;
  }
  hierarchyNode.children.forEach((childKey) => {
    accumulator++;
    accumulator = getRecursiveChildrenCount(childKey, accumulator);
  });
  return accumulator;
}
function computedAllNodes(
  nodes: T[],
  level: number,
  parent: TTreeTableHierarchy["parent"],
  accumulator: T[]
): [T[], TTreeTableNodeKey[]] {
  const nodeKeys: TTreeTableNodeKey[] = [];
  nodes
    .sort((nodeA, nodeB) => {
      return getNodeOrder(nodeB) - getNodeOrder(nodeA);
    })
    .forEach((node) => {
      const nodeKey = getNodeKeyValue(node);
      accumulator.push(node);
      indexKeys.set(nodeKey, accumulator.length - 1);
      const results = computedAllNodes(
        getNodeChildren(node),
        level + 1,
        nodeKey,
        accumulator
      );
      hierarchiKeys.set(nodeKey, {
        parent: parent,
        children: results[1],
      });
      const parentHierarchy = hierarchiKeys.get(parent);
      if (parentHierarchy) {
        parentHierarchy.children.push(nodeKey);
      }
      levelKeys.value.set(nodeKey, level);
      accumulator = results[0];
    });
  return [accumulator, nodeKeys];
}
function computeIndexKeys() {
  indexKeys.clear();
  nodesRef.value.forEach((node, nodeIndex) => {
    const nodeKey = getNodeKeyValue(node);
    indexKeys.set(nodeKey, nodeIndex);
  });
}
function setupElementsKeys(nodes: T[]) {
  if (!treeBodyEl.value) {
    return;
  }
  const allRowElement = [
    ...treeBodyEl.value.querySelectorAll(".tree-table-row"),
  ];
  nodes.forEach((node) => {
    const nodeKey = getNodeKeyValue(node);
    const rowElement = allRowElement.find((rowElementFind) => {
      const attribute = rowElementFind.getAttribute(dataKeyAttribute);
      return castAttributeToNodeKeyType(attribute) === nodeKey;
    });
    if (!rowElement) {
      return;
    }
    elementKeys.set(nodeKey, rowElement as HTMLElement);

    const fakeRowElement = allRowElement.find((rowElementFind) => {
      const attribute = rowElementFind.getAttribute(dataKeyAttribute);
      return attribute?.toString() === getElementFakeNodeKey(nodeKey);
    });
    if (!fakeRowElement) {
      return;
    }
    elementKeys.set(
      getElementFakeNodeKey(nodeKey),
      fakeRowElement as HTMLElement
    );
  });
}
function castAttributeToNodeKeyType(
  attribute: string | null
): TTreeTableNodeKey {
  switch (propsComponent.nodeKeyType) {
    case "string":
      return attribute ?? String();
    case "symbol":
      return Symbol(attribute?.toString());
    case "number":
      return Number(attribute);
  }
}
function setSelectedKeys(nodeKey: TTreeTableNodeKey, state: boolean) {
  if (state) {
    selectedKeys.value.add(nodeKey);
    const element = elementKeys.get(nodeKey);
    const fakeElement = elementKeys.get(getElementFakeNodeKey(nodeKey));
    if (element && fakeElement && propsComponent.draggable) {
      Sortable.utils.select(element);
      Sortable.utils.select(fakeElement);
    }
  } else {
    selectedKeys.value.delete(nodeKey);
    const element = elementKeys.get(nodeKey);
    const fakeElement = elementKeys.get(getElementFakeNodeKey(nodeKey));
    if (element && fakeElement && propsComponent.draggable) {
      Sortable.utils.deselect(element);
      Sortable.utils.deselect(fakeElement);
    }
  }
}
function clearSelectedKeys() {
  selectedKeys.value.forEach((selectedKey) => {
    const rowElement = elementKeys.get(selectedKey);
    if (rowElement) {
      Sortable.utils.deselect(rowElement);
    }
  });
  selectedKeys.value.clear();
}
function onNodeClick(node: T) {
  let emitCallback: () => void = () => {
    return;
  };
  const nodeKey = getNodeKeyValue(node);
  switch (propsComponent.selectionMode) {
    case "unique":
      clearSelectedKeys();
      setSelectedKeys(nodeKey, true);
      emitCallback = () => emitsComponent("node-select", node);
      break;

    case "multiple": {
      const state = selectedKeys.value.has(nodeKey);
      if (state) {
        setSelectedKeys(nodeKey, false);
        emitCallback = () => emitsComponent("node-unselect", node);
      } else {
        setSelectedKeys(nodeKey, true);
        const parentNodeKey = hierarchiKeys.get(nodeKey)?.parent;
        if (parentNodeKey) {
          setSelectedKeys(parentNodeKey, state);
        }
        emitCallback = () => emitsComponent("node-select", node);
      }
      propagateSelectionDown(nodeKey, state);
      break;
    }

    case "checkbox":
      return;
  }
  emitCallback();
}
function onNodeExpandToggle(node: T, state: boolean) {
  if (state) {
    expandedKeys.value.add(getNodeKeyValue(node));
    emitsComponent("node-expand", node);
    if (isNodeLeaf(node)) {
      return;
    }
    if (getNodeChildren(node).length > 0) {
      const hierarchy = getNodeHierarchy(node);
      if (!hierarchy) {
        return;
      }
      setChildrenHideState(hierarchy, false, false);
    } else {
      const nodeKey = getNodeKeyValue(node);
      loadingKeys.value.add(nodeKey);
      const doneCallback = (childrenNode: T[]) => {
        const targetIndex = indexKeys.get(nodeKey);
        if (targetIndex === undefined) {
          return;
        }
        const oldHierarchy = hierarchiKeys.get(nodeKey);
        hierarchiKeys.set(nodeKey, {
          parent: oldHierarchy?.parent ?? rootHierarchyKey,
          children: childrenNode.map((childNode) => {
            return getNodeKeyValue(childNode);
          }),
        });
        const nodeLevel = levelKeys.value.get(nodeKey) ?? 0;
        childrenNode.forEach((childNode) => {
          const childNodeKey = getNodeKeyValue(childNode);
          hierarchiKeys.set(childNodeKey, {
            parent: nodeKey,
            children: [],
          });
          levelKeys.value.set(childNodeKey, nodeLevel + 1);
        });
        setNodeChildren(node, childrenNode);
        nodesRef.value.splice(targetIndex + 1, 0, ...childrenNode);
        computeIndexKeys();
        void nextTick(() => {
          setupElementsKeys(childrenNode);
          if (selectedKeys.value.has(nodeKey)) {
            setSelectedKeys(nodeKey, true);
            propagateSelectionDown(nodeKey, true);
          }
        });
      };
      emitsComponent("lazy-load-children", {
        node: node,
        nodeKey: nodeKey,
        done: doneCallback,
      });
      loadingKeys.value.delete(nodeKey);
    }
  } else {
    expandedKeys.value.delete(getNodeKeyValue(node));
    emitsComponent("node-collapse", node);
    const hierarchy = getNodeHierarchy(node);
    if (!hierarchy) {
      return;
    }
    setChildrenHideState(hierarchy, true, true);
  }
}
function setChildrenHideState(
  hierarchy: TTreeTableHierarchy,
  state: boolean,
  deep: boolean
) {
  hierarchy.children.forEach((childHierarchyKey) => {
    if (state) {
      hiddenKeys.value.add(childHierarchyKey);
      setSelectedKeys(childHierarchyKey, !state);
    } else {
      hiddenKeys.value.delete(childHierarchyKey);
    }
    if (deep) {
      const childHierarchy = hierarchiKeys.get(childHierarchyKey);
      if (childHierarchy) {
        setChildrenHideState(childHierarchy, state, deep);
      }
    }
  });
}
function onNodeCheckboxToggle(node: T, state: boolean) {
  let emitCallback: () => void = () => {
    return;
  };
  const nodeKey = getNodeKeyValue(node);
  switch (propsComponent.selectionMode) {
    case "checkbox":
      if (state) {
        setSelectedKeys(nodeKey, state);
        emitCallback = () => emitsComponent("node-select", node);
      } else {
        setSelectedKeys(nodeKey, state);
        const parentNodeKey = hierarchiKeys.get(nodeKey)?.parent;
        if (parentNodeKey) {
          setSelectedKeys(parentNodeKey, state);
        }
        emitCallback = () => emitsComponent("node-unselect", node);
      }
      propagateSelectionDown(nodeKey, state);
      break;

    case "multiple":
    case "unique":
      return;
  }
  emitCallback();
}
function propagateSelectionDown(nodeKey: TTreeTableNodeKey, state: boolean) {
  const hierarchy = hierarchiKeys.get(nodeKey);
  if (!hierarchy) {
    return;
  }
  hierarchy.children.forEach((childNodeKey) => {
    if (state) {
      setSelectedKeys(childNodeKey, true);
    } else {
      setSelectedKeys(childNodeKey, false);
    }
    propagateSelectionDown(childNodeKey, state);
  });
}
function getElementFakeNodeKey(nodeKey: TTreeTableNodeKey) {
  return `${fakeElementPrefix}${nodeKey.toString()}`;
}
function setNodeChildren(node: T, children: T[]) {
  (node as { [K in keyof typeof node]: T[] })[
    propsComponent.childrenKey as keyof T
  ] = children;
}
function setNodeParent(node: T, parent: TTreeTableNodeKey | null) {
  if (!propsComponent.parentKey) {
    return;
  }
  (node as { [K in keyof typeof node]: TTreeTableNodeKey | null })[
    propsComponent.parentKey as keyof T
  ] = parent;
}
function setNodeOrder(node: T, orderWithinParent: number) {
  if (!propsComponent.orderKey) {
    return;
  }
  (node as { [K in keyof typeof node]: TTreeTableNodeKey | null })[
    propsComponent.orderKey as keyof T
  ] = orderWithinParent;
}
function getNodeChildren(node: T) {
  return (node[propsComponent.childrenKey as keyof T] ?? []) as T[];
}
function getNodeKeyValue(node: T) {
  return node[propsComponent.nodeKey as keyof T] as TTreeTableNodeKey;
}
function getNodeHierarchy(node: T) {
  const nodeKey = getNodeKeyValue(node);
  return hierarchiKeys.get(nodeKey);
}
function getNodeLevel(node: T) {
  const nodeKey = getNodeKeyValue(node);
  return levelKeys.value.get(nodeKey) ?? 0;
}
function getNodeOrder(node: T) {
  return (node[propsComponent.orderKey as keyof T] ?? 0) as number;
}
function isNodeLeaf(node: T) {
  return Boolean(node[propsComponent.hasChildrenKey as keyof T]) === false;
}
function isNodeExpanded(node: T) {
  const nodeKey = getNodeKeyValue(node);
  return expandedKeys.value.has(nodeKey);
}
function isNodeSelected(node: T) {
  const nodeKey = getNodeKeyValue(node);
  return selectedKeys.value.has(nodeKey);
}
function isNodeLoading(node: T) {
  const nodeKey = getNodeKeyValue(node);
  return loadingKeys.value.has(nodeKey);
}
function isNodeHidden(node: T) {
  const nodeKey = getNodeKeyValue(node);
  return hiddenKeys.value.has(nodeKey);
}
function getNodeByKey(nodeKey: TTreeTableNodeKey) {
  return nodesRef.value.find((node) => {
    return getNodeKeyValue(node) === nodeKey;
  });
}
function updateNode(nodeKey: TTreeTableNodeKey, nodeData: T) {
  const nodeIndex = indexKeys.get(nodeKey);
  if (nodeIndex === undefined) {
    return;
  }
  nodesRef.value[nodeIndex] = nodeData;
}
function addNode(
  node: T,
  parentNodeKey: TTreeTableNodeKey,
  positionBelowParent: number
) {
  const nodeKey = getNodeKeyValue(node);
  const parentHierarchy = hierarchiKeys.get(parentNodeKey);
  if (parentHierarchy) {
    parentHierarchy.children.push(nodeKey);
  }
  hierarchiKeys.set(nodeKey, {
    parent: parentNodeKey,
    children: [],
  });
  setupElementsKeys([node]);
  levelKeys.value.set(nodeKey, (levelKeys.value.get(parentNodeKey) ?? 0) + 1);
  if (hiddenKeys.value.has(parentNodeKey)) {
    hiddenKeys.value.add(nodeKey);
  }
  const parentNodeIndex = indexKeys.get(parentNodeKey);
  if (parentNodeIndex === undefined) {
    nodesRef.value.splice(positionBelowParent, 0, node);
  } else {
    nodesRef.value.splice(
      parentNodeIndex + Math.abs(positionBelowParent),
      0,
      node
    );
  }
  computeIndexKeys();
}
function removeNode(nodeKey: TTreeTableNodeKey) {
  const hierarchy = hierarchiKeys.get(nodeKey);
  if (!hierarchy || hierarchy.children.length > 0) {
    return;
  }
  nodesRef.value = nodesRef.value.filter((nodeFilter) => {
    return getNodeKeyValue(nodeFilter) !== nodeKey;
  });
  elementKeys.delete(nodeKey);
  hierarchiKeys.delete(nodeKey);
  expandedKeys.value.delete(nodeKey);
  selectedKeys.value.delete(nodeKey);
  levelKeys.value.delete(nodeKey);
  hiddenKeys.value.delete(nodeKey);
  computeIndexKeys();
}
function isFakeRowHidden(node: T) {
  return isNodeHidden(node) || !isDragging.value
}
function getSelectedKeys() {
  return selectedKeys.value;
}
function getExpandedKeys() {
  return expandedKeys.value;
}

// computeds
const tableClass = computed(() => {
  let classes = "";
  classes += propsComponent.tableCssClass;
  return classes;
});
const slotMap = computed(() => {
  const map = new Map<string, Slot>();
  for (const key in slots) {
    const slot = slots[key];
    if (slot) {
      map.set(key, slot);
    }
  }
  console.log(map)
  return map;
});

// exposes
defineExpose<TMangrove64TreeApi<T>>({
  getSelectedKeys,
  getExpandedKeys,
  getNodeByKey,
  updateNode,
  addNode,
  removeNode,
});

// watchs
watch(
  () => propsComponent.columns,
  (newValue) => {
    columnsRef.value = newValue;
  }
);

// lifeCycle
onMounted(() => {
  init();
  void nextTick(() => {
    setupElementsKeys(nodesRef.value);
    isReady.value = true;
  });
});
onScopeDispose(() => {
  hook.stop();
});
</script>

<template>
  <div>
    <div>
      <table class="tree-table-table" :class="tableClass">
        <thead>
          <tr>
            <template v-for="(col, i) in columnsRef" :key="col.fieldTarget">
              <TreeTableHeaderCell
                :column="col"
                :resizableColumns="propsComponent.resizableColumns"
                :index="i"
                :borderStrategy="propsComponent.borderStrategy"
              />
            </template>
          </tr>
        </thead>
        <tbody ref="treeBodyEl" :key="rerenderTrick">
          <template
            v-for="node in nodesRef"
            :key="node[propsComponent.nodeKey as keyof T]"
          >
            <TreeTableRow
              :node="node"
              :columns="columns"
              :node-key="propsComponent.nodeKey as keyof T"
              :children-key="propsComponent.childrenKey as keyof T"
              :has-children-key="propsComponent.hasChildrenKey as keyof T"
              :disabled-key="propsComponent.disabledKey"
              :selectionMode="propsComponent.selectionMode"
              :expanded="isNodeExpanded(node)"
              :selected="isNodeSelected(node)"
              :isLoading="isNodeLoading(node)"
              :level="getNodeLevel(node)"
              :hidden="isNodeHidden(node)"
              :indentationPx="propsComponent.indentationPx"
              :row-css-class="propsComponent.rowCssClass"
              :cell-css-class="propsComponent.cellCssClass"
              :border-strategy="propsComponent.borderStrategy"
              :context-menu="propsComponent.contextMenu"
              :slot-map="slotMap"
              :checkbox-color="propsComponent.checkboxColor"
              @node-expand-toggle="onNodeExpandToggle"
              @node-checkbox-toggle="onNodeCheckboxToggle"
              @node-click="onNodeClick"
            />
            <TreeTableFakeRow
              :node="node"
              :columns="columns"
              :node-key="propsComponent.nodeKey as keyof T"
              :disabled-key="propsComponent.disabledKey"
              :expanded="isNodeExpanded(node)"
              :selected="isNodeSelected(node)"
              :level="getNodeLevel(node)"
              :hidden="isFakeRowHidden(node)"
              :indentationPx="propsComponent.indentationPx"
              :row-css-class="propsComponent.rowCssClass"
              :cell-css-class="propsComponent.cellCssClass"
              :border-strategy="propsComponent.borderStrategy"
              :context-menu="propsComponent.contextMenu"
              :is-dragging="isDragging"
              @node-click="onNodeClick"
            />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
