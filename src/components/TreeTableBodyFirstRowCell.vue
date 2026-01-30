<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { QIcon, QCheckbox, QSpinner } from 'quasar'
import type { TMangrove64TreeColumn, TNodeItem } from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableSelectionMode,
  TTreeTableSlot,
} from "../private-models";
import { NodeItemApi } from "../node-item";
// emits
const emitsComponent = defineEmits<{
  (e: "node-expand-toggle", nodeItem: TNodeItem, state: boolean): void;
  (e: "node-checkbox-toggle", nodeItem: TNodeItem, state: boolean): void;
}>();

// props
const propsComponent = withDefaults(
  defineProps<{
    item: TNodeItem;
    column: TMangrove64TreeColumn;
    indentationPx: number;
    selectionMode: TTreeTableSelectionMode;
    cellCssClass?: string | undefined;
    borderStrategy: TTreeTableBorderStrategy;
    slotRender?: TTreeTableSlot | undefined;
    checkboxColor: string;
  }>(),
  {}
);

// refs
const selected = ref(propsComponent.item.selected);

// functions
function toggleExpanded() {
  emitsComponent(
    "node-expand-toggle",
    propsComponent.item,
    !propsComponent.item.expanded
  );
}
function toggleCheckbox() {
  emitsComponent(
    "node-checkbox-toggle",
    propsComponent.item,
    !propsComponent.item.selected
  );
}

// computeds
const checkboxSelectionMode = computed(() => {
  return propsComponent.selectionMode === "checkbox";
});
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
  if (propsComponent.item.selected) {
    classes += " mangrove64-selected";
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
const getCellStyle = computed(() => {
  return `padding-left: ${
    propsComponent.item.level * propsComponent.indentationPx
  }px;`;
});

// watchs
watch(
  () => propsComponent.item.selected,
  (newValue) => {
    selected.value = newValue;
  }
);
</script>

<template>
  <td :class="getcellCssClass" :style="getCellStyle">
    <div class="flex row no-wrap items-center mangrove64-cell-inner">
      <q-checkbox
        v-if="checkboxSelectionMode"
        @update:model-value="toggleCheckbox"
        v-model="selected"
        size="xs"
        dense
        :color="propsComponent.checkboxColor"
      />
      <template v-if="!propsComponent.item.loading">
        <template v-if="!NodeItemApi.isLeaf(propsComponent.item)">
          <q-icon
            v-if="!propsComponent.item.expanded"
            @click="toggleExpanded"
            name="chevron_right"
            size="1.2rem"
            class="cursor-pointer"
          />
          <q-icon
            v-else
            @click="toggleExpanded"
            name="keyboard_arrow_down"
            size="1.2rem"
            class="cursor-pointer"
          />
        </template>

        <template v-else>
          <span class="q-pr-xs"></span>
        </template>
      </template>

      <template v-else>
        <q-spinner
          size="xs"
          :color="propsComponent.checkboxColor"
          :thickness="4"
        />
      </template>

      <template v-if="propsComponent.slotRender">
        <component
          :is="{ render: () => propsComponent.slotRender!({ nodeItem: propsComponent.item }) }"
        />
      </template>
      <div v-else>
        {{ nodeFieldByColumn }}
      </div>
    </div>
  </td>
</template>
