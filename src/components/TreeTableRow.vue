<script setup lang="ts">
import type {
  TMangrove64TreeColumn,
  TNodeItem,
} from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableSelectionMode,
  TTreeTableSlot,
  TTreeTableTheme,
} from "../private-models";
import { computed } from "vue";
import TreeTableBodyCell from "./TreeTableBodyCell.vue";
import TreeTableBodyFirstRowCell from "./TreeTableBodyFirstRowCell.vue";
import { NodeItemApi } from "../node-item";

// emits
const emitsComponent = defineEmits<{
  (e: "node-expand-toggle", nodeItem: TNodeItem, state: boolean): void;
  (e: "node-checkbox-toggle", nodeItem: TNodeItem, state: boolean): void;
  (e: "node-click", nodeItem: TNodeItem): void;
}>();

// props
const propsComponent = defineProps<{
  item: TNodeItem;
  columns: TMangrove64TreeColumn[];
  selectionMode: TTreeTableSelectionMode;
  indentationPx: number;
  borderStrategy: TTreeTableBorderStrategy;
  rowCssClass: string | undefined;
  cellCssClass: string | undefined;
  slotMap: Map<string, TTreeTableSlot>;
  checkboxColor: string;
  theme: TTreeTableTheme;
}>();

// functions
function nodeToggleExpand(nodeItem: TNodeItem, state: boolean) {
  emitsComponent("node-expand-toggle", nodeItem, state);
}
function onToggleCheckbox(nodeItem: TNodeItem, state: boolean) {
  emitsComponent("node-checkbox-toggle", nodeItem, state);
}
function onNodeClick(nodeItem: TNodeItem) {
  emitsComponent("node-click", nodeItem);
}

// computeds
const rowClass = computed(() => {
  let classes = "mangrove64-row";
  classes += ` ${propsComponent.rowCssClass}`;
  if (propsComponent.item.selected) {
    classes += " mangrove64-row-selected";
    if (propsComponent.theme === 'dark') {
      classes += ' mangrove64-row-selected-dark'
    }
  }
  if (propsComponent.item.hidden) {
    classes += " mangrove64-row-hidden";
  }
  return classes;
});
</script>

<template>
  <tr @click="onNodeClick(propsComponent.item)" :class="rowClass" :data-key="NodeItemApi.getDataKeyValue(propsComponent.item)">
    <template v-for="(col, colIndex) in propsComponent.columns" :key="col.name">
      <TreeTableBodyFirstRowCell v-if="colIndex === 0" :column="col" :item="propsComponent.item"
        :indentationPx="propsComponent.indentationPx" :selectionMode="propsComponent.selectionMode"
        :cell-css-class="propsComponent.cellCssClass" :border-strategy="propsComponent.borderStrategy"
        :slot-render="propsComponent.slotMap.get(col.name)" :checkbox-color="propsComponent.checkboxColor"
        @node-expand-toggle="nodeToggleExpand" @node-checkbox-toggle="onToggleCheckbox" />
      <TreeTableBodyCell v-else :column="col" :item="propsComponent.item" :cell-css-class="propsComponent.cellCssClass"
        :border-strategy="propsComponent.borderStrategy" :slot-render="propsComponent.slotMap.get(col.name)" />
    </template>
  </tr>
</template>