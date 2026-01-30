<script setup lang="ts">
import { computed } from "vue";
import type { TMangrove64TreeColumn, TNodeItem } from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableSlot,
} from "../private-models";

// props
const propsComponent = withDefaults(
  defineProps<{
    item: TNodeItem;
    column: TMangrove64TreeColumn;
    cellCssClass: string | undefined;
    borderStrategy: TTreeTableBorderStrategy;
    slotRender: TTreeTableSlot | undefined;
  }>(),
  {}
);

// computeds
const nodeFieldByColumn = computed(() => {
  if (propsComponent.column.format) {
    return propsComponent.column.format(propsComponent.item);
  }
  if (propsComponent.column.fieldTarget) {
    return propsComponent.item.data[propsComponent.column.fieldTarget];
  }
});
const getcellCssClass = computed(() => {
  let classes = "mangrove64-cell";
  classes += ` ${propsComponent.cellCssClass}`;
  if (propsComponent.column.cssClass) {
    classes += ` ${propsComponent.column.cssClass}`;
  }
  switch (propsComponent.borderStrategy) {
    case "horizontal":
      classes += " mangrove64-bordered-t";
      break;
    case "vertical":
      classes += " mangrove64-bordered-lr";
      break;
    case "cell":
      classes += " mangrove64-bordered-ltr";
      break;
  }
  return classes;
});
</script>

<template>
  <td :class="getcellCssClass">
    <template v-if="propsComponent.slotRender">
      <component
        :is="{ render: () => propsComponent.slotRender!({ nodeItem: propsComponent.item }) }"
      />
    </template>
    <div v-else class="mangrove64-cell-inner">
      {{ nodeFieldByColumn }}
    </div>
  </td>
</template>