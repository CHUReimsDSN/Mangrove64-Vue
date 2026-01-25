---
title: Réference
---

# Réference

Il est possible de définir une référence sur le composant Mangrove64TreeTable afin d'accèder à des méthodes ou données utilitaires.

Exemple :  

```vue
<script setup lang="ts">
import { Mangrove64Tree, type TMangrove64TreeApi } from 'mangrove64-vue';

const mangrove64Ref = ref<TMangrove64TreeApi>()

function example() {
  if (!mangrove64Ref.value) {
    return
  }
  mangrove64Ref.value.getSelectedKeys()
}
</script>

<template>
  <Mangrove64Tree ref="mangrove64Ref" />
</template>
```

{: .important }
Consulter les [Définitions]({% link 120_definitions.md %}) pour savoir quelles méthodes sont disponibles.
