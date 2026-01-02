<script setup lang="ts" generic="T">
import { computed } from "vue";
import type { TMangrove64TreeColumn } from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableSlot,
} from "../private-models";

// props
const propsComponent = withDefaults(
  defineProps<{
    node: T;
    column: TMangrove64TreeColumn<T>;
    cellCssClass: string | undefined;
    borderStrategy: TTreeTableBorderStrategy;
    slotRender: TTreeTableSlot<T> | undefined;
  }>(),
  {}
);

// computeds
const nodeFieldByColumn = computed(() => {
  if (propsComponent.column.format) {
    return propsComponent.column.format(propsComponent.node);
  }
  if (propsComponent.column.fieldTarget) {
    return propsComponent.node[propsComponent.column.fieldTarget];
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
        :is="{ render: () => propsComponent.slotRender!({ node: propsComponent.node }) }"
      />
    </template>
    <div v-else class="mangrove64-cell-inner">
      {{ nodeFieldByColumn }}
    </div>
  </td>
</template>