<script setup lang="ts" generic="T extends TMangreove64NodeItemData">
import { computed } from "vue";
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
import { NodeItemApi } from "../node-item";

// emits
const emitsComponent = defineEmits<{
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
function onNodeClick(nodeItem: TMangrove64NodeItem<T>) {
  emitsComponent("node-click", nodeItem);
}
function onDragOver(event: DragEvent) {
  event.preventDefault()
}

// computeds
const rowClass = computed(() => {
  let classes = "mangrove64-row mangrove64-fake-row";
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
const getCellCssClass = computed(() => {
  let classes = "";
  classes += ` ${propsComponent.cellCssClass}`;
  switch (propsComponent.borderStrategy) {
    case "horizontal":
      classes += " mangrove64-bordered-b";
      break;
    case "vertical":
      classes += " mangrove64-bordered-lr";
      break;
    case "cell":
      classes += " mangrove64-bordered-lbr";
      break;
  }
  return classes;
});
</script>

<template>
  <tr @click="onNodeClick(propsComponent.item)" :class="rowClass"
    :draggable="propsComponent.draggable && propsComponent.item.selected && !propsComponent.item.disabled"
    @dragstart="emitsComponent('on-drag-start', $event)"
    @dragenter="emitsComponent('on-drag-enter', $event, propsComponent.item, 'brother')"
    @dragover="onDragOver($event)"
    @dragend="emitsComponent('on-drag-end', $event)" :data-key="NodeItemApi.getFakeDataKeyValue(propsComponent.item)">
    <template v-for="col in propsComponent.columns" :key="col.name">
      <td :class="getCellCssClass"></td>
    </template>
  </tr>
</template>
