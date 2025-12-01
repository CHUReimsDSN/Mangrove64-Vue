---
title: Surcharge
---

# Surcharge

Il est possible de surcharger certains élements de Mangrove64 :

- les cellules

## Surcharge des cellules

Exemple :

```vue
<script setup lang="ts">
import { Mangrove64Tree } from "mangrove64-vue";

type TComment = {
  id: number;
  label: string;
  date: Date;
};
const comments = ref<TComment[]>([]);
</script>

<template>
  <Mangrove64Tree :nodes="comments">
    <template #label="{ node }">
      <div class="bg-amber">{{ node.label }}</div>
    </template>
  </Mangrove64Tree>
</template>
```

<br /><br />
