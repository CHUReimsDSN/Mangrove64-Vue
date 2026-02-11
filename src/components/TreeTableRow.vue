<script setup lang="ts" generic="T extends TMangreove64NodeItemData">
import type {
  TMangrove64TreeColumn,
  TMangrove64NodeItem,
  TMangreove64NodeItemData,
} from "../models";
import type {
  TMangrove64BorderStrategy,
  TMangrove64DragMode,
  TMangrove64SelectionMode,
  TMangrove64Slot,
  TMangrove64Theme,
} from "../private-models";
import { computed } from "vue";
import TreeTableBodyCell from "./TreeTableBodyCell.vue";
import TreeTableBodyFirstRowCell from "./TreeTableBodyFirstRowCell.vue";

// emits
const emitsComponent = defineEmits<{
  (e: "node-expand-toggle", nodeItem: TMangrove64NodeItem<T>, state: boolean): void;
  (e: "node-checkbox-toggle", nodeItem: TMangrove64NodeItem<T>, state: boolean): void;
  (e: "node-click", nodeItem: TMangrove64NodeItem<T>): void;
  (e: "on-drag-start", event: DragEvent): void;
  (e: "on-drag-enter", event: DragEvent, nodeItem: TMangrove64NodeItem<T>, mode: TMangrove64DragMode): void;
  (e: "on-drag-end", event: DragEvent): void;
}>();

// props
const propsComponent = defineProps<{
  item: TMangrove64NodeItem<T>;
  columns: TMangrove64TreeColumn<T>[];
  selectionMode: TMangrove64SelectionMode;
  draggable: boolean;
  indentationPx: number;
  borderStrategy: TMangrove64BorderStrategy;
  rowCssClass: string | undefined;
  cellCssClass: string | undefined;
  slotMap: Map<string, TMangrove64Slot<T>>;
  checkboxColor: string;
  theme: TMangrove64Theme;
}>();

// functions
function nodeToggleExpand(nodeItem: TMangrove64NodeItem<T>, state: boolean) {
  emitsComponent("node-expand-toggle", nodeItem, state);
}
function onToggleCheckbox(nodeItem: TMangrove64NodeItem<T>, state: boolean) {
  emitsComponent("node-checkbox-toggle", nodeItem, state);
}
function onNodeClick(nodeItem: TMangrove64NodeItem<T>) {
  emitsComponent("node-click", nodeItem);
}
function onDragOver(event: DragEvent) {
  event.preventDefault()
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
  if (propsComponent.item.highlighted) {
    classes += " mangrove64-row-highlight"
    if (propsComponent.theme === 'dark') {
      classes += " mangrove64-row-highlight-dark"
    }
  }
  return classes;
});
</script>

<template>
  <tr @click="onNodeClick(propsComponent.item)" :class="rowClass"
    :draggable="propsComponent.draggable && propsComponent.item.selected && !propsComponent.item.disabled"
    @dragstart="emitsComponent('on-drag-start', $event)"
    @dragenter="emitsComponent('on-drag-enter', $event, propsComponent.item, 'child')" @dragover="onDragOver($event)"
    @dragend="emitsComponent('on-drag-end', $event)" :data-key="propsComponent.item.dataIdentifierValue">
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
