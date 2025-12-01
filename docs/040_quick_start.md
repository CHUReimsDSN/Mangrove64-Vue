---
title: Démarage rapide
---

# Démarrage rapide


Utiliser le composant `Mangrove64Tree` pour afficher une arborescence de données :  

```vue
<script setup lang="ts">
import { Mangrove64Tree, type TMangrove64TreeColumn } from 'mangrove64-vue';
import { ref } from 'vue';

type TComment = {
  id: number;
  label: string;
  date: Date;
}
const comments = ref<TComment[]>([]);
const columns: TMangrove64TreeColumn<TComment>[] = [
  { name: 'label', label: 'Label', fieldTarget: 'label' },
  { name: 'date', label: 'Date', fieldTarget: 'date' },
];
</script>

<template>
  <Mangrove64Tree
    :nodes="comments"
    :columns="columns"
  />
</template>
```
