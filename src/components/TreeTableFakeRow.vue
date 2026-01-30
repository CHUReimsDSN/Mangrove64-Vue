<script setup lang="ts">
import { computed } from "vue";
import type {
  TMangrove64TreeColumn,
  TNodeItem,
} from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableTheme,
} from "../private-models";
import { NodeItemApi } from "../node-item";

// emits
const emitsComponent = defineEmits<{
  (e: "node-click", nodeItem: TNodeItem): void;
}>();

// props
const propsComponent = defineProps<{
  item: TNodeItem;
  columns: TMangrove64TreeColumn[];
  indentationPx: number;
  borderStrategy: TTreeTableBorderStrategy;
  rowCssClass: string | undefined;
  cellCssClass: string | undefined;
  isDragging: boolean;
  theme: TTreeTableTheme;
}>();

// functions
function onNodeClick(nodeItem: TNodeItem) {
  emitsComponent("node-click", nodeItem);
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
  if (propsComponent.isDragging) {
    classes += " mangrove64-fake-row-display";
  }
  return classes;
});
const getcellCssClass = computed(() => {
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
  <tr
    @click="onNodeClick(propsComponent.item)"
    :class="rowClass"
    :data-key="NodeItemApi.getFakeDataKeyValue(propsComponent.item)"
  >
    <template v-for="col in propsComponent.columns" :key="col.name">
      <td :class="getcellCssClass"></td>
    </template>
  </tr>
</template>
