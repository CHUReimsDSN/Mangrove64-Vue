<script setup lang="ts" generic="T extends TMangreove64NodeItemData">
import { computed } from "vue";
import type { TMangrove64TreeColumn, TMangrove64NodeItem, TMangreove64NodeItemData } from "../models";
import type {
  TMangrove64BorderStrategy,
  TMangrove64Slot,
} from "../private-models";

// props
const propsComponent = withDefaults(
  defineProps<{
    item: TMangrove64NodeItem<T>;
    column: TMangrove64TreeColumn<T>;
    cellCssClass: string | undefined;
    borderStrategy: TMangrove64BorderStrategy;
    slotRender: TMangrove64Slot<T> | undefined;
  }>(),
  {}
);

// computeds
const nodeFieldByColumn = computed(() => {
  if (propsComponent.column.format) {
    return propsComponent.column.format(propsComponent.item.data);
  }
  if (propsComponent.column.fieldTarget) {
    return propsComponent.item.data[propsComponent.column.fieldTarget];
  }
  return ''
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
