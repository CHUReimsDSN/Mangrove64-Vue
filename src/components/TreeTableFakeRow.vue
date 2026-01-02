<script setup lang="ts" generic="T">
import { computed } from "vue";
import type {
  TMangrove64TreeColumn,
} from "../models";
import type {
  TTreeTableBorderStrategy,
  TTreeTableNodeKey,
} from "../private-models";

// emits
const emitsComponent = defineEmits<{
  (e: "node-click", node: T): void;
}>();

// props
const propsComponent = defineProps<{
  node: T;
  columns: TMangrove64TreeColumn<T>[];
  nodeKey: keyof T;
  disabledKey: keyof T | undefined;
  expanded: boolean;
  selected: boolean;
  hidden: boolean;
  level: number;
  indentationPx: number;
  borderStrategy: TTreeTableBorderStrategy;
  rowCssClass: string | undefined;
  cellCssClass: string | undefined;
  isDragging: boolean;
}>();

// consts
const fakeElementPrefix = "__tree-table-fake-row-";

// functions
function getNodeKeyValue(node: T) {
  return node[propsComponent.nodeKey] as TTreeTableNodeKey;
}
function getNodeKeyData(node: T) {
  return `${fakeElementPrefix}${getNodeKeyValue(node).toString()}`;
}
function onNodeClick(node: T) {
  emitsComponent("node-click", node);
}

// computeds
const rowClass = computed(() => {
  let classes = "mangrove64-row mangrove64-fake-row";
  classes += ` ${propsComponent.rowCssClass}`;
  if (propsComponent.selected) {
    classes += " mangrove64-row-selected";
  }
  if (propsComponent.hidden) {
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
    @click="onNodeClick(propsComponent.node)"
    :class="rowClass"
    :data-key="getNodeKeyData(propsComponent.node)"
  >
    <template v-for="col in propsComponent.columns" :key="col.name">
      <td :class="getcellCssClass"></td>
    </template>
  </tr>
</template>
