<script setup lang="ts" generic="T extends object">
import { computed } from 'vue';
import { QMenu, QList, QItem, QIcon } from 'quasar'
import type { TMangrove64TreeContextMenu } from '../models';

// props
const propsComponent = defineProps<{
  node: T;
  contextMenu: TMangrove64TreeContextMenu<T>;
}>();

// functions
async function runActionAndClose(action: TMangrove64TreeContextMenu<T>['actions'][number]) {
  await action.action(propsComponent.node);
}

// computeds
const innerClasses = computed(() => {
  let classes = '';
  if (propsComponent.contextMenu.cssClass) {
    classes += propsComponent.contextMenu.cssClass;
  }
  return classes;
});
</script>

<template>
  <q-menu context-menu touch-position>
    <q-list :class="innerClasses" dense>
      <q-item
        v-for="action in propsComponent.contextMenu.actions"
        :key="action.label"
        :class="action.cssClass"
        class="flex row no-wrap items-center"
        dense
        clickable
        v-close-popup
        @click="runActionAndClose(action)"
      >
        <q-icon v-if="action.icon" :name="action.icon" size="xs" class="q-pr-xs" />
        {{ action.label }}
      </q-item>
    </q-list>
  </q-menu>
</template>
