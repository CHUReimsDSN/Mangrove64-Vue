<script setup lang="ts" generic="T extends object">
import { computed } from "vue";
import type {
  TMangrove64TreeColumn,
  TMangrove64TreeContextMenu,
} from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableNodeKey,
} from "../private-models";
import TreeTableContextMenu from "./TreeTableContextMenu.vue";

// emits
const emitsComponent = defineEmits<{
  (e: "node-click", node: T): void;
}>();

// props
const propsComponent = defineProps<{
  node: T;
  columns: TMangrove64TreeColumn<T>[];
  nodeKey: keyof T;
  disabledKey: keyof T | undefined;
  expanded: boolean;
  selected: boolean;
  hidden: boolean;
  level: number;
  indentationPx: number;
  contextMenu: TMangrove64TreeContextMenu<T> | undefined;
  borderStrategy: TTreeTableBorderStrategy;
  rowCssClass: string | undefined;
  cellCssClass: string | undefined;
  isDragging: boolean;
}>();

// consts
const fakeElementPrefix = "__tree-table-fake-row-";

// functions
function getNodeKeyValue(node: T) {
  return node[propsComponent.nodeKey] as TTreeTableNodeKey;
}
function getNodeKeyData(node: T) {
  return `${fakeElementPrefix}${getNodeKeyValue(node).toString()}`;
}
function onNodeClick(node: T) {
  emitsComponent("node-click", node);
}

// computeds
const rowClass = computed(() => {
  let classes = "tree-table-row tree-table-fake-row";
  classes += ` ${propsComponent.rowCssClass}`;
  if (propsComponent.selected) {
    classes += " tree-table-row-selected";
  }
  if (propsComponent.hidden) {
    classes += " tree-table-row-hidden";
  }
  if (propsComponent.isDragging) {
    classes += " tree-table-fake-row-display";
  }
  return classes;
});
const getcellCssClass = computed(() => {
  let classes = "";
  classes += ` ${propsComponent.cellCssClass}`;
  switch (propsComponent.borderStrategy) {
    case "horizontal":
      classes += " tree-table-bordered-b";
      break;
    case "vertical":
      classes += " tree-table-bordered-lr";
      break;
    case "cell":
      classes += " tree-table-bordered-lbr";
      break;
  }
  return classes;
});
</script>

<template>
  <tr
    @click="onNodeClick(propsComponent.node)"
    :class="rowClass"
    :data-key="getNodeKeyData(propsComponent.node)"
  >
    <template v-for="col in propsComponent.columns" :key="col.name">
      <td :class="getcellCssClass"></td>
    </template>
    <TreeTableContextMenu
      v-if="propsComponent.contextMenu"
      :context-menu="propsComponent.contextMenu"
      :node="propsComponent.node"
    />
  </tr>
</template>
