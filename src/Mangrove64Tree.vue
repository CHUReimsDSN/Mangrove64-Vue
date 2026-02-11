<script setup lang="ts" generic="T extends TMangreove64NodeItemData">
import {
  computed,
  onMounted,
  ref,
  nextTick,
  useSlots,
  type UnwrapRef,
  type Slot,
} from "vue";
import TreeTableHeaderCell from "./components/TreeTableHeaderCell.vue";
import TreeTableRow from "./components/TreeTableRow.vue";
import TreeTableFakeRow from "./components/TreeTableFakeRow.vue";
import type {
  TMangrove64TreeProps,
  TMangrove64TreeApi,
  TMangrove64NodeItem,
  TMangreove64NodeItemData,
  TMangrove64NodeKeyValue
} from "./models";
import type {
  TMangrove64DragMode,
  TMangrove64Hierarchy,
  TMangrove64Slot,
  TMangrove64Theme,
} from "./private-models";
import { NodeItemApi } from "./node-item";

// props
const propsComponent = withDefaults(defineProps<TMangrove64TreeProps<T>>(), {
  draggable: false,
  nodeKey: "id",
  childrenKey: "children",
  hasChildrenKey: "has_children",
  parentKey: "parent_id",
  expandeAllNodeAtStart: false,
  selectionMode: "unique",
  resizableColumns: false,
  indentationPx: 25,
  borderStrategy: "none",
  tableCssClass: "",
  rowCssClass: "",
  cellCssClass: "",
  checkboxColor: "primary",
  onNodeExpand: () => { },
  onNodeCollapse: () => { },
  onNodeSelect: () => { },
  onNodeUnselect: () => { },
  onLazyLoadChildren: () => { },
  onNodesMove: () => { }
});

// slots
defineSlots<Record<string, TMangrove64Slot<T>>>();

// lets
let lastNodeItemIndexDragOver: number | null = null;
let lastNodeItemModeDragOver: TMangrove64DragMode | null = null;
let isDropping = false

// consts
const slots = useSlots();
const dataKeyAttribute = "data-key" as const;
const dropIndicatorCssClass = "mangrove64-drop-indicator" as const;
const hierarchiKeys: Map<TMangrove64NodeKeyValue | null, TMangrove64Hierarchy> = new Map();
const elementKeys: Map<string, HTMLElement> = new Map()

// refs
const nodeItems = ref<TMangrove64NodeItem<T>[]>([])
const isReady = ref(false);
const isDragging = ref(false);
const draggingNodeItems = ref<TMangrove64NodeItem<T>[]>([])
const themeMode = ref<TMangrove64Theme>('light')
const mangrove64TableBody = ref<HTMLElement | null>(null)

// functions
function computeNodeItems(
  nodes: T[],
  accumulator: TMangrove64NodeItem<T>[]
): TMangrove64NodeItem<T>[] {
  for (const node of nodes) {
    const keyValue = node[propsComponent.nodeKey] as TMangrove64NodeKeyValue;
    let disabled = false
    if (propsComponent.disabledKey) {
      disabled = (node[propsComponent.disabledKey] ?? false) as boolean
    }
    const nodeItem: TMangrove64NodeItem<T> = {
      dataIdentifierValue: keyValue,
      dataIdentifierKey: propsComponent.nodeKey,
      childrenKey: propsComponent.childrenKey,
      dataHasChildrenKey: propsComponent.hasChildrenKey,
      dataOrderKey: propsComponent.orderKey,
      parentKey: propsComponent.parentKey,
      index: 0,
      expanded: false,
      selected: false,
      level: 0,
      hidden: false,
      loading: false,
      highlighted: false,
      disabled: disabled,
      isLeaf: node[propsComponent.hasChildrenKey] === true ? false : true,
      data: node
    }
    accumulator.push(nodeItem)
    const children = (node[propsComponent.childrenKey] as T[]) ?? [];
    computeNodeItems(
      children,
      accumulator
    )
  }
  return accumulator;
}
function onDragStart(event: DragEvent) {
  if (!propsComponent.draggable) {
    return
  }
  isDragging.value = true;
  draggingNodeItems.value = getSelectedNodeItems()
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'link'
  }
}
function onDragEnter(event: DragEvent, nodeItemHovered: TMangrove64NodeItem<T>, mode: TMangrove64DragMode) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'link'
  }
  const targetHierarchy = hierarchiKeys.get(nodeItemHovered.dataIdentifierValue);
  if (!targetHierarchy) {
    return false;
  }
  if (draggingNodeItems.value.length === 0) {
    return false;
  }
  if (lastNodeItemIndexDragOver !== null) {
    const oldDragOverNodeItem = getNodeItemByIndex(lastNodeItemIndexDragOver)
    let nodeItemHtmlElement: undefined | HTMLElement = undefined
    if (lastNodeItemModeDragOver === 'brother') {
      nodeItemHtmlElement = elementKeys.get(NodeItemApi.getFakeDataKeyValue(oldDragOverNodeItem))
    }
    if (lastNodeItemModeDragOver === 'child') {
      nodeItemHtmlElement = elementKeys.get(String(oldDragOverNodeItem.dataIdentifierValue))
    }
    if (nodeItemHtmlElement) {
      nodeItemHtmlElement.classList.remove(dropIndicatorCssClass)
    }
  } else {
    for (const nodeItem of draggingNodeItems.value) {
      nodeItem.hidden = true
    }
  }
  lastNodeItemModeDragOver = mode
  lastNodeItemIndexDragOver = nodeItemHovered.index
  const oldDragOverNodeItem = getNodeItemByIndex(lastNodeItemIndexDragOver)
  let nodeItemHtmlElement: undefined | HTMLElement = undefined
  if (mode === 'brother') {
    nodeItemHtmlElement = elementKeys.get(NodeItemApi.getFakeDataKeyValue(oldDragOverNodeItem))
  }
  if (mode === 'child') {
    nodeItemHtmlElement = elementKeys.get(String(oldDragOverNodeItem.dataIdentifierValue))
  }
  if (nodeItemHtmlElement) {
    nodeItemHtmlElement.classList.add(dropIndicatorCssClass)
  }
}
async function onDragDrop(event: DragEvent) {
  // setup
  event.preventDefault()
  isDropping = true
  if (!isDragging.value) {
    endDragMode()
    return
  }
  if (lastNodeItemIndexDragOver === null) {
    endDragMode()
    return
  }
  if (lastNodeItemModeDragOver === null) {
    endDragMode()
    return
  }
  const nodeTarget = getNodeItemByIndex(lastNodeItemIndexDragOver)
  if (nodeTarget.disabled) {
    endDragMode()
    return
  }
  const nodeTargetHierarchy = hierarchiKeys.get(nodeTarget.dataIdentifierValue)
  if (!nodeTargetHierarchy) {
    endDragMode()
    return
  }

  // // expand node if child
  if (lastNodeItemModeDragOver === 'child' && nodeTarget.expanded === false) {
    await onNodeExpandToggle(nodeTarget, true)
  }

  // update moving nodes levels, data parent and splice old indexes and old parents
  let keyNewParent: TMangrove64NodeKeyValue | null = null;
  if (lastNodeItemModeDragOver === 'brother') {
    keyNewParent = NodeItemApi.getParentKeyValue(nodeTarget)
  } else if (lastNodeItemModeDragOver === 'child') {
    keyNewParent = nodeTarget.dataIdentifierValue
  }
  let relativePositionInParent = 0;
  if (lastNodeItemModeDragOver === 'brother') {
    relativePositionInParent = NodeItemApi.getDataOrder(nodeTarget) + 1
  } else if (lastNodeItemModeDragOver === 'child') {
    const parentNodeTargetHierarchy = hierarchiKeys.get(keyNewParent)
    if (parentNodeTargetHierarchy && parentNodeTargetHierarchy.childrenIndex.length > 0) {
      relativePositionInParent = NodeItemApi.getDataOrder(getNodeItemByIndex(parentNodeTargetHierarchy.childrenIndex[0]!))
    }
  }
  const nodesToMoveForReal: UnwrapRef<TMangrove64NodeItem<T>>[] = []

  for (let i = 0; i < draggingNodeItems.value.length; i++) {
    const draginNodeItem = draggingNodeItems.value[i]!
    draginNodeItem.hidden = false
    const isParentIsDraginList = draggingNodeItems.value.findIndex((draginParentFind) => {
      return draginParentFind.dataIdentifierValue === NodeItemApi.getParentKeyValue(draginNodeItem)
    }) !== -1
    if (isParentIsDraginList) {
      continue
    }
    if (lastNodeItemModeDragOver === 'brother') {
      draginNodeItem.level = nodeTarget.level
    } else if (lastNodeItemModeDragOver === 'child') {
      draginNodeItem.level = nodeTarget.level + 1
    }
    NodeItemApi.setDataOrder(draginNodeItem, relativePositionInParent - draggingNodeItems.value.length + i)
    const oldParentIndex = hierarchiKeys.get(draginNodeItem.dataIdentifierValue)?.parentIndex
    if (oldParentIndex !== undefined && oldParentIndex !== null) {
      const oldParentNode = getNodeItemByIndex(oldParentIndex)
      let newDataChildren = NodeItemApi.getDataChildren(oldParentNode)
      newDataChildren = newDataChildren.filter((dataChild) => {
        return dataChild[propsComponent.nodeKey] !== draginNodeItem.dataIdentifierValue
      })
      NodeItemApi.setDataChildren(oldParentNode, newDataChildren)
    }
    NodeItemApi.setParentKeyValue(draginNodeItem, keyNewParent)
    nodesToMoveForReal.push(draginNodeItem)
    const deepChildCount = getRecursiveChildrenCount(draginNodeItem as TMangrove64NodeItem<T>, 0)
    nodeItems.value.splice(draginNodeItem.index, 1 + deepChildCount)
  }

  // inject all nodes in new parent at right position
  if (lastNodeItemModeDragOver === 'child') {
    const newDataChildren = NodeItemApi.getDataChildren(nodeTarget)
    newDataChildren.push(...nodesToMoveForReal.map((nodeToMove) => {
      return nodeToMove.data as T
    }))
    NodeItemApi.setDataChildren(nodeTarget, newDataChildren)
    nodeTarget.isLeaf = false
  }
  if (lastNodeItemModeDragOver === 'brother') {
    const targetNodeParentIndex = hierarchiKeys.get(nodeTarget.dataIdentifierValue)?.parentIndex
    if (targetNodeParentIndex !== undefined && targetNodeParentIndex !== null) {
      const targetNodeParentNode = getNodeItemByIndex(targetNodeParentIndex)
      const newdataChildren = NodeItemApi.getDataChildren(targetNodeParentNode)
      newdataChildren.push(...nodesToMoveForReal.map((nodeToMove) => {
        return nodeToMove.data as T
      }))
      NodeItemApi.setDataChildren(targetNodeParentNode, newdataChildren)
    }
  }
  nodeItems.value.splice(nodeTarget.index + 1, 0, ...draggingNodeItems.value)

  // finish
  lastNodeItemIndexDragOver = nodeTarget.index
  endDragMode()
  computeAllOrderAndLevelAndIndexeAndHierarchyAndElements()
  await propsComponent.onNodesMove(
    nodesToMoveForReal as TMangrove64NodeItem<T>[],
  );
}
function onDragEnd(_event: DragEvent) {
  if (isDropping || !isDragging.value) {
    return
  }
  endDragMode()
}
function endDragMode() {
  isDragging.value = false;
  isDropping = false;
  for (const draginItem of draggingNodeItems.value) {
    const linkedNode = getNodeItemByIndex(draginItem.index)
    linkedNode.hidden = false
  }
  if (lastNodeItemIndexDragOver !== null) {
    const oldNideItemDragOver = getNodeItemByIndex(lastNodeItemIndexDragOver)
    let nodeItemHtmlElement: HTMLElement | undefined = undefined
    if (lastNodeItemModeDragOver === 'brother') {
      nodeItemHtmlElement = elementKeys.get(NodeItemApi.getFakeDataKeyValue(oldNideItemDragOver))
    }
    if (lastNodeItemModeDragOver === 'child') {
      nodeItemHtmlElement = elementKeys.get(String(oldNideItemDragOver.dataIdentifierValue))
    }
    if (nodeItemHtmlElement) {
      nodeItemHtmlElement.classList.remove(dropIndicatorCssClass)
    }
  }
  draggingNodeItems.value = []
  lastNodeItemIndexDragOver = null
  lastNodeItemModeDragOver = null
}
function getRecursiveChildrenCount(
  nodeItem: TMangrove64NodeItem<T>,
  accumulator: number
) {
  const hierarchyNode = hierarchiKeys.get(nodeItem.dataIdentifierValue);
  if (!hierarchyNode) {
    return accumulator;
  }
  for (const childIndex of hierarchyNode.childrenIndex) {
    accumulator++;
    const childNodeItem = getNodeItemByIndex(childIndex)
    accumulator = getRecursiveChildrenCount(childNodeItem, accumulator);
  };
  return accumulator;
}
function getNodeItemByIndex(index: number) {
  return nodeItems.value[index] as TMangrove64NodeItem<T>
}
function clearSelectedNode() {
  for (const nodeItem of getSelectedNodeItems()) {
    if (nodeItem.selected) {
      nodeItem.selected = false
    }
  }
}
async function onNodeClick(nodeItem: TMangrove64NodeItem<T>) {
  switch (propsComponent.selectionMode) {
    case "unique":
      if (nodeItem.selected) {
        clearSelectedNode();
        await propsComponent.onNodeUnselect(nodeItem)
      } else {
        clearSelectedNode();
        nodeItem.selected = true
        await propsComponent.onNodeSelect(nodeItem)
      }
      break;

    case "multiple": {
      if (nodeItem.selected) {
        nodeItem.selected = false
        await propsComponent.onNodeUnselect(nodeItem)
      } else {
        nodeItem.selected = true
        await propsComponent.onNodeSelect(nodeItem)
      }
      propagateSelectionDown(nodeItem, !nodeItem.selected);
      break;
    }

    case "checkbox":
      return;
  }
}
async function lazyLoad(nodeItem: TMangrove64NodeItem<T>) {
  nodeItem.loading = true
  const doneCallback = (newChildrenNode: T[]) => {
    const computedNodeItem = computeNodeItems(newChildrenNode, [])
    NodeItemApi.setDataChildren(nodeItem, newChildrenNode)
    nodeItems.value.splice(nodeItem.index + 1, 0, ...computedNodeItem as UnwrapRef<TMangrove64NodeItem<T>>[]);
    computeAllOrderAndLevelAndIndexeAndHierarchyAndElements()
    if (nodeItem.selected) {
      propagateSelectionDown(nodeItem, true);
    }
    nodeItem.loading = false
  };
  await propsComponent.onLazyLoadChildren(
    nodeItem,
    nodeItem.dataIdentifierValue,
    doneCallback,
  );
}
async function onNodeExpandToggle(nodeItem: TMangrove64NodeItem<T>, state: boolean) {
  if (state) {
    nodeItem.expanded = true
    await propsComponent.onNodeExpand(nodeItem)
    if (nodeItem.isLeaf) {
      return;
    }
    if (NodeItemApi.getDataChildren(nodeItem).length > 0) {
      const hierarchy = hierarchiKeys.get(nodeItem.dataIdentifierValue)
      if (!hierarchy) {
        return;
      }
      setChildrenHideState(hierarchy, false, false);
    } else {
      await lazyLoad(nodeItem)
    }
  } else {
    nodeItem.expanded = false
    await propsComponent.onNodeCollapse(nodeItem)
    const hierarchy = hierarchiKeys.get(nodeItem.dataIdentifierValue)
    if (!hierarchy) {
      return;
    }
    setChildrenHideState(hierarchy, true, true);
  }
}
function setChildrenHideState(
  hierarchy: TMangrove64Hierarchy,
  state: boolean,
  deep: boolean
) {
  for (const childIndex of hierarchy.childrenIndex) {
    const childNodeItem = getNodeItemByIndex(childIndex)
    if (state) {
      childNodeItem.hidden = true
      childNodeItem.selected = false
    } else {
      childNodeItem.hidden = false
    }
    if (deep) {
      const childHierarchy = hierarchiKeys.get(childNodeItem.dataIdentifierValue);
      if (childHierarchy) {
        setChildrenHideState(childHierarchy, state, deep);
      }
    }
  }
}
async function onNodeCheckboxToggle(nodeItem: TMangrove64NodeItem<T>, state: boolean) {
  switch (propsComponent.selectionMode) {
    case "checkbox":
      nodeItem.selected = state
      if (state) {
        await propsComponent.onNodeSelect(nodeItem)
      } else {
        propagateSelectionUp(nodeItem, state)
        await propsComponent.onNodeUnselect(nodeItem)
      }
      propagateSelectionDown(nodeItem, state);
      break;

    case "multiple":
    case "unique":
      return;
  }
}
function propagateSelectionDown(nodeItem: TMangrove64NodeItem<T>, state: boolean) {
  const hierarchy = hierarchiKeys.get(nodeItem.dataIdentifierValue);
  if (!hierarchy) {
    return;
  }
  for (const childNodeIndex of hierarchy.childrenIndex) {
    const childNodeItem = getNodeItemByIndex(childNodeIndex)
    childNodeItem.selected = state
    propagateSelectionDown(childNodeItem, state);
  }
}
function propagateSelectionUp(nodeItem: TMangrove64NodeItem<T>, state: boolean) {
  const hierarchy = hierarchiKeys.get(nodeItem.dataIdentifierValue);
  if (!hierarchy) {
    return;
  }
  if (hierarchy.parentIndex) {
    const parentNodeItem = getNodeItemByIndex(hierarchy.parentIndex)
    parentNodeItem.selected = state
    propagateSelectionUp(parentNodeItem, state);
  }
}
function computeAllOrderAndLevelAndIndexeAndHierarchyAndElements() {
  const mapParentKeyChildRef = new Map<TMangrove64NodeKeyValue | null, TMangrove64NodeItem<T>[]>()
  for (const nodeItem of nodeItems.value) {
    const parentKeyValue = NodeItemApi.getParentKeyValue(nodeItem)
    const mapParentEntry = mapParentKeyChildRef.get(parentKeyValue)
    if (!mapParentEntry) {
      mapParentKeyChildRef.set(parentKeyValue, [nodeItem as TMangrove64NodeItem<T>])
    } else {
      mapParentEntry.push(nodeItem as TMangrove64NodeItem<T>)
    }
  }
  for (const childrenNodeItem of mapParentKeyChildRef.values()) {
    childrenNodeItem.sort((nodeA, nodeB) => {
      return NodeItemApi.getDataOrder(nodeA) - NodeItemApi.getDataOrder(nodeB)
    })
  }
  const fillNewNodeItemsCallback = (parentKeyValue: TMangrove64NodeKeyValue | null, parentLevel: number, accumulator: TMangrove64NodeItem<T>[], mapKeyIndexAccumulator: Map<TMangrove64NodeKeyValue | null, number>) => {
    const childrenNodes = mapParentKeyChildRef.get(parentKeyValue)
    if (!childrenNodes) {
      return accumulator
    }
    for (const child of childrenNodes) {
      child.level = parentLevel + 1
      const indexAlreadyIn = mapKeyIndexAccumulator.get(child.dataIdentifierValue)
      if (indexAlreadyIn !== undefined) {
        accumulator[indexAlreadyIn] = child
      } else {
        accumulator.push(child)
      }
      mapKeyIndexAccumulator.set(child.dataIdentifierValue, accumulator.length - 1)
      fillNewNodeItemsCallback(child.dataIdentifierValue, parentLevel + 1, accumulator, mapKeyIndexAccumulator)
    }
    return accumulator
  }
  const newNodeItems = fillNewNodeItemsCallback(null, -1, [], new Map())

  hierarchiKeys.clear();
  const mapKeyIndex = new Map<TMangrove64NodeKeyValue, number>()
  for (let i = 0; i < newNodeItems.length; i++) {
    const nodeItem = newNodeItems[i]!
    mapKeyIndex.set(nodeItem.dataIdentifierValue, i)
    nodeItem.index = i
    const parentKeyValue = NodeItemApi.getParentKeyValue(nodeItem)
    let nodeHierarchy = hierarchiKeys.get(nodeItem.dataIdentifierValue)
    if (!nodeHierarchy) {
      nodeHierarchy = {
        parentIndex: null,
        childrenIndex: []
      }
    }
    let parentIndex = null
    if (parentKeyValue !== null) {
      parentIndex = mapKeyIndex.get(parentKeyValue) ?? null
    }
    nodeHierarchy.parentIndex = parentIndex
    hierarchiKeys.set(nodeItem.dataIdentifierValue, nodeHierarchy)

    if (parentIndex !== null) {
      const parentNodeItem = getNodeItemByIndex(parentIndex)
      let parentNodeHierarchy = hierarchiKeys.get(parentNodeItem.dataIdentifierValue)
      if (!parentNodeHierarchy) {
        parentNodeHierarchy = {
          parentIndex: null,
          childrenIndex: []
        }
      }
      parentNodeHierarchy.childrenIndex.push(i)
      hierarchiKeys.set(parentNodeItem.dataIdentifierValue, parentNodeHierarchy)
    }
  }
  nodeItems.value = newNodeItems

  void nextTick(() => {
    if (!mangrove64TableBody.value) {
      return
    }
    elementKeys.clear()
    const rowElements = Array.from(mangrove64TableBody.value.querySelectorAll(".mangrove64-row"))
    for (const rowElement of rowElements) {
      const rowDataKeyValue = rowElement.getAttribute(dataKeyAttribute)
      if (!rowDataKeyValue) {
        continue
      }
      elementKeys.set(rowDataKeyValue, rowElement as HTMLElement)
    }
  })
}
function getNodeItemByKeyValue(nodeKeyValue: TMangrove64NodeKeyValue) {
  return nodeItems.value.find((nodeItem) => {
    return nodeItem.dataIdentifierValue === nodeKeyValue;
  }) as TMangrove64NodeItem<T> | undefined;
}
function updateNodes(nodesData: T[]) {
  for (const node of nodesData) {
    const keyValue = node[propsComponent.nodeKey] as TMangrove64NodeKeyValue
    const nodeItem = getNodeItemByKeyValue(keyValue)
    if (!nodeItem) {
      continue;
    }
    nodeItem.data = node
  }
  computeAllOrderAndLevelAndIndexeAndHierarchyAndElements()
}
function setNodes(nodes: T[]) {
  nodeItems.value = computeNodeItems(
    nodes,
    []
  )
  computeAllOrderAndLevelAndIndexeAndHierarchyAndElements()
}
async function addNodes(
  nodes: T[],
) {
  const computedNodeItem = computeNodeItems(nodes, [])
  for (const nodeItem of computedNodeItem) {
    nodeItems.value.splice(nodeItem.index + 1, 0, ...computedNodeItem as UnwrapRef<TMangrove64NodeItem<T>>[]);
    computeAllOrderAndLevelAndIndexeAndHierarchyAndElements()
    const hierarchy = hierarchiKeys.get(nodeItem.dataIdentifierValue)
    if (hierarchy && hierarchy.parentIndex !== null) {
      const parentNode = getNodeItemByIndex(hierarchy.parentIndex)
      if (parentNode.expanded === false) {
        await onNodeExpandToggle(parentNode, true)
      }
      const parentDataChildren = NodeItemApi.getDataChildren(parentNode)
      parentDataChildren.push(nodeItem.data)
      NodeItemApi.setDataChildren(parentNode, parentDataChildren)
      if (parentNode.isLeaf) {
        parentNode.isLeaf = false
      }
      if (parentNode.selected) {
        propagateSelectionDown(parentNode, true);
      }
    }
  }
}
function removeNodes(keyValues: TMangrove64NodeKeyValue[]) {
  nodeItems.value = nodeItems.value.filter((nodeItem) => {
    return !keyValues.includes(nodeItem.dataIdentifierValue)
  })
  computeAllOrderAndLevelAndIndexeAndHierarchyAndElements()
}
function highlightNodes(keyValues: TMangrove64NodeKeyValue[]) {
  const nodeItemsFound = nodeItems.value.filter((nodeItem) => {
    return keyValues.includes(nodeItem.dataIdentifierValue)
  })
  for (const nodeItem of nodeItemsFound) {
    nodeItem.highlighted = true
    setTimeout(() => {
      nodeItem.highlighted = false
    }, 11000)
  }
}
function expandNodes(keyValues: TMangrove64NodeKeyValue[]) {
  const nodeItemsFound = nodeItems.value.filter((nodeItem) => {
    return keyValues.includes(nodeItem.dataIdentifierValue)
  })
  for (const nodeItem of nodeItemsFound) {
    onNodeExpandToggle(nodeItem as TMangrove64NodeItem<T>, true)
  }
}
function getSelectedNodeItems() {
  return nodeItems.value.filter((nodeItem) => {
    return nodeItem.selected
  }) as TMangrove64NodeItem<T>[]
}
function getExpandedNodeItems() {
  return nodeItems.value.filter((nodeItem) => {
    return nodeItem.expanded
  }) as TMangrove64NodeItem<T>[]
}
function setupThemeMode() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeMode.value = "dark";
  }
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
  return map;
});

// exposes
defineExpose<TMangrove64TreeApi<T>>({
  getSelectedNodeItems,
  getExpandedNodeItems,
  getNodeItemByKeyValue,
  updateNodes,
  addNodes,
  setNodes,
  removeNodes,
  highlightNodes,
  expandNodes
});

// lifeCycle
onMounted(() => {
  setupThemeMode();
  setNodes(propsComponent.nodes)
  void nextTick(() => {
    isReady.value = true;
  });
});
</script>

<template>
  <div>
    <div>
      <table class="mangrove64-table" :class="tableClass">
        <thead>
          <tr>
            <template v-for="(col, i) in propsComponent.columns" :key="col.name">
              <TreeTableHeaderCell :column="col" :resizableColumns="propsComponent.resizableColumns" :index="i"
                :borderStrategy="propsComponent.borderStrategy" :theme="themeMode" />
            </template>
          </tr>
        </thead>
        <tbody ref="mangrove64TableBody" @drop="onDragDrop">
          <template v-for="item in nodeItems" :key="item.dataIdentifierKey">
            <TreeTableRow :item="(item as TMangrove64NodeItem<T>)" :columns="propsComponent.columns"
              :selectionMode="propsComponent.selectionMode" :indentationPx="propsComponent.indentationPx"
              :row-css-class="propsComponent.rowCssClass" :cell-css-class="propsComponent.cellCssClass"
              :border-strategy="propsComponent.borderStrategy" :slot-map="slotMap" :theme="themeMode"
              :draggable="propsComponent.draggable" :checkbox-color="propsComponent.checkboxColor"
              @node-expand-toggle="onNodeExpandToggle" @node-checkbox-toggle="onNodeCheckboxToggle"
              @node-click="onNodeClick" @onDragStart="onDragStart" @onDragEnter="onDragEnter" @onDragEnd="onDragEnd" />
            <TreeTableFakeRow :item="(item as TMangrove64NodeItem<T>)" :columns="propsComponent.columns"
              :selectionMode="propsComponent.selectionMode" :draggable="propsComponent.draggable"
              :indentationPx="propsComponent.indentationPx" :row-css-class="propsComponent.rowCssClass"
              :cell-css-class="propsComponent.cellCssClass" :border-strategy="propsComponent.borderStrategy"
              :slot-map="slotMap" :checkbox-color="propsComponent.checkboxColor" @onDragStart="onDragStart"
              @onDragEnd="onDragEnd" @onDragEnter="onDragEnter" :theme="themeMode" @node-click="onNodeClick" />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
