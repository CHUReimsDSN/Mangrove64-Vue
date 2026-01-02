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
  let classes = "tree-table-cell";
  classes += ` ${propsComponent.cellCssClass}`;
  if (propsComponent.column.cssClass) {
    classes += ` ${propsComponent.column.cssClass}`;
  }
  switch (propsComponent.borderStrategy) {
    case "horizontal":
      classes += " tree-table-bordered-t";
      break;
    case "vertical":
      classes += " tree-table-bordered-lr";
      break;
    case "cell":
      classes += " tree-table-bordered-ltr";
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
    <div v-else class="tree-table-cell-inner">
      {{ nodeFieldByColumn }}
    </div>
  </td>
</template>