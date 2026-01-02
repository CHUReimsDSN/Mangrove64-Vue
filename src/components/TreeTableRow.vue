<script setup lang="ts" generic="T">
import type {
  TMangrove64TreeColumn,
} from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableNodeKey,
  TTreeTableSelectionMode,
  TTreeTableSlot,
} from "../private-models";
import { computed } from "vue";
import TreeTableBodyCell from "./TreeTableBodyCell.vue";
import TreeTableBodyFirstRowCell from "./TreeTableBodyFirstRowCell.vue";

// emits
const emitsComponent = defineEmits<{
  (e: "node-expand-toggle", node: T, state: boolean): void;
  (e: "node-checkbox-toggle", node: T, state: boolean): void;
  (e: "node-click", node: T): void;
}>();

// props
const propsComponent = defineProps<{
  node: T;
  columns: TMangrove64TreeColumn<T>[];
  nodeKey: keyof T;
  childrenKey: keyof T;
  hasChildrenKey: keyof T;
  disabledKey: keyof T | undefined;
  selectionMode: TTreeTableSelectionMode;
  expanded: boolean;
  selected: boolean;
  isLoading: boolean;
  hidden: boolean;
  level: number;
  indentationPx: number;
  borderStrategy: TTreeTableBorderStrategy;
  rowCssClass: string | undefined;
  cellCssClass: string | undefined;
  slotMap: Map<string, TTreeTableSlot<T>>;
  checkboxColor: string;
}>();

// functions
function nodeToggleExpand(node: T, state: boolean) {
  emitsComponent("node-expand-toggle", node, state);
}
function onToggleCheckbox(node: T, state: boolean) {
  emitsComponent("node-checkbox-toggle", node, state);
}
function onNodeClick(node: T) {
  emitsComponent("node-click", node);
}
function getNodeKeyValue(node: T) {
  return node[propsComponent.nodeKey] as TTreeTableNodeKey;
}

// computeds
const isNodeLeaf = computed(() => {
  return !(propsComponent.node[propsComponent.hasChildrenKey] as boolean);
});
const isNodeDisabled = computed(() => {
  if (propsComponent.disabledKey === undefined) {
    return undefined;
  }
  return propsComponent.node[propsComponent.disabledKey] as boolean;
});
const rowClass = computed(() => {
  let classes = "tree-table-row";
  classes += ` ${propsComponent.rowCssClass}`;
  if (propsComponent.selected) {
    classes += " tree-table-row-selected";
  }
  if (propsComponent.hidden) {
    classes += " tree-table-row-hidden";
  }
  return classes;
});
</script>

<template>
  <tr
    @click="onNodeClick(propsComponent.node)"
    :class="rowClass"
    :data-key="getNodeKeyValue(propsComponent.node)"
  >
    <template v-for="(col, colIndex) in propsComponent.columns" :key="col.name">
      <TreeTableBodyFirstRowCell
        v-if="colIndex === 0"
        :column="col"
        :node="propsComponent.node"
        :level="propsComponent.level"
        :indentationPx="propsComponent.indentationPx"
        :leaf="isNodeLeaf"
        :expanded="propsComponent.expanded"
        :disabled="isNodeDisabled"
        :selected="propsComponent.selected"
        :isLoading="propsComponent.isLoading"
        :selectionMode="propsComponent.selectionMode"
        :cell-css-class="propsComponent.cellCssClass"
        :border-strategy="propsComponent.borderStrategy"
        :slot-render="propsComponent.slotMap.get(col.name)"
        :checkbox-color="propsComponent.checkboxColor"
        @node-expand-toggle="nodeToggleExpand"
        @node-checkbox-toggle="onToggleCheckbox"
      />
      <TreeTableBodyCell
        v-else
        :column="col"
        :node="propsComponent.node"
        :cell-css-class="propsComponent.cellCssClass"
        :border-strategy="propsComponent.borderStrategy"
        :slot-render="propsComponent.slotMap.get(col.name)"
      />
    </template>
  </tr>
</template>