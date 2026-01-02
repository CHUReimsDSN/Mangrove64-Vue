<script setup lang="ts" generic="T">
import { computed, ref, watch } from "vue";
import { QIcon, QCheckbox, QSpinner } from 'quasar'
import type { TMangrove64TreeColumn } from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableSelectionMode,
  TTreeTableSlot,
} from "../private-models";
// emits
const emitsComponent = defineEmits<{
  (e: "node-expand-toggle", node: T, state: boolean): void;
  (e: "node-checkbox-toggle", node: T, state: boolean): void;
}>();

// props
const propsComponent = withDefaults(
  defineProps<{
    node: T;
    column: TMangrove64TreeColumn<T>;
    level: number;
    indentationPx: number;
    leaf: boolean;
    expanded: boolean;
    selected: boolean;
    isLoading: boolean;
    disabled?: boolean | undefined;
    selectionMode: TTreeTableSelectionMode;
    cellCssClass?: string | undefined;
    borderStrategy: TTreeTableBorderStrategy;
    slotRender?: TTreeTableSlot<T> | undefined;
    checkboxColor: string;
  }>(),
  {}
);

// refs
const selected = ref(propsComponent.selected);

// functions
function toggleExpanded() {
  if (propsComponent.disabled) {
    return;
  }
  emitsComponent(
    "node-expand-toggle",
    propsComponent.node,
    !propsComponent.expanded
  );
}
function toggleCheckbox() {
  if (propsComponent.disabled) {
    return;
  }
  emitsComponent(
    "node-checkbox-toggle",
    propsComponent.node,
    !propsComponent.selected
  );
}

// computeds
const checkboxSelectionMode = computed(() => {
  return propsComponent.selectionMode === "checkbox";
});
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
  if (propsComponent.selected) {
    classes += " tree-table-selected";
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
const getCellStyle = computed(() => {
  return `padding-left: ${
    propsComponent.level * propsComponent.indentationPx
  }px;`;
});

// watchs
watch(
  () => propsComponent.selected,
  (newValue) => {
    selected.value = newValue;
  }
);
</script>

<template>
  <td :class="getcellCssClass" :style="getCellStyle">
    <div class="flex row no-wrap items-center tree-table-cell-inner">
      <q-checkbox
        v-if="checkboxSelectionMode"
        @update:model-value="toggleCheckbox"
        v-model="selected"
        size="xs"
        dense
        :color="propsComponent.checkboxColor"
        :disabled="propsComponent.disabled"
      />
      <template v-if="!propsComponent.isLoading">
        <template v-if="!propsComponent.leaf">
          <q-icon
            v-if="!propsComponent.expanded"
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
          :is="{ render: () => propsComponent.slotRender!({ node: propsComponent.node }) }"
        />
      </template>
      <div v-else>
        {{ nodeFieldByColumn }}
      </div>
    </div>
  </td>
</template>
