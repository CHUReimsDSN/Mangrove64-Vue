<script setup lang="ts" generic="T">
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import type { TMangrove64TreeColumn } from "../models";
import type { TTreeTableBorderStrategy, TTreeTableTheme } from "../private-models";

// props
const propsComponent = defineProps<{
  column: TMangrove64TreeColumn<T>;
  index: number;
  resizableColumns: boolean;
  borderStrategy: TTreeTableBorderStrategy;
  theme: TTreeTableTheme
}>();

const thEl = ref<HTMLElement | null>(null);
const handle = ref<HTMLElement | null>(null);

// vars
let startX = 0;
let startWidth = 0;
let dragging = false;

// functions
function onMouseDown(event: MouseEvent) {
  if (event.button !== 0) {
    return;
  }
  startDrag(event.clientX);
  event.preventDefault();
}
function onTouchStart(event: TouchEvent) {
  const touche = event.touches[0];
  if (!touche) {
    return;
  }
  startDrag(touche.clientX);
  event.preventDefault();
}
function startDrag(clientX: number) {
  const th = thEl.value;
  if (!th) {
    return;
  }
  startX = clientX;
  startWidth = th.getBoundingClientRect().width;
  dragging = true;
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd);
}
function onMouseMove(event: MouseEvent) {
  if (!dragging) {
    return;
  }
  doResize(event.clientX);
}
function onTouchMove(event: TouchEvent) {
  if (!dragging) {
    return;
  }
  const touche = event.touches[0];
  if (!touche) {
    return;
  }
  doResize(touche.clientX);
  event.preventDefault();
}
function doResize(clientX: number) {
  const th = thEl.value;
  if (!th) {
    return;
  }
  const dx = clientX - startX;
  const newWidth = Math.max(60, Math.round(startWidth + dx));
  th.style.width = `${newWidth}px`;
}
function onMouseUp() {
  stopDrag();
}
function onTouchEnd() {
  stopDrag();
}
function stopDrag() {
  if (!dragging) {
    return;
  }
  dragging = false;
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", onTouchEnd);
}

// computed
const headerStyle = computed(() => {
  return `text-align: ${propsComponent.column.align ?? "left"};`;
});
const headerCssClasses = computed(() => {
  let classes = "mangrove64-cell-header-content";
  if (propsComponent.theme === 'dark') {
    classes += " mangrove64-cell-header-content-dark"
  }
  return classes
})
const cellClass = computed(() => {
  let classes = "mangrove64-cell-header";
  if (propsComponent.borderStrategy !== "none") {
    classes += " mangrove64-bordered-ltrb";
  }
  return classes;
});

// lifeCycle
onMounted(() => {
  if (!propsComponent.resizableColumns) {
    return;
  }
  const handleValue = handle.value;
  if (!handleValue) {
    return;
  }
  handleValue.addEventListener("mousedown", onMouseDown);
  handleValue.addEventListener("touchstart", onTouchStart, { passive: false });
});
onBeforeUnmount(() => {
  if (!propsComponent.resizableColumns) {
    return;
  }
  const handleValue = handle.value;
  if (handleValue) {
    handleValue.removeEventListener("mousedown", onMouseDown);
    handleValue.removeEventListener("touchstart", onTouchStart);
  }
  stopDrag();
});
</script>

<template>
  <th :class="cellClass" ref="thEl">
    <div :class="headerCssClasses" :style="headerStyle">
      {{ propsComponent.column.label }}
      <div
        v-if="propsComponent.resizableColumns"
        class="mangrove64-resize-handle"
        ref="handle"
      ></div>
    </div>
  </th>
</template>

