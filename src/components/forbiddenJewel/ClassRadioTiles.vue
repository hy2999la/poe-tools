<script setup lang="ts">
import { useForbiddenJewelStore } from '@/store/forbiddenJewel';

import RadioTiles from '../shared/RadioTiles.vue';

const forbiddenJewelStore = useForbiddenJewelStore();
</script>

<template>
  <RadioTiles
    v-model="forbiddenJewelStore.formData.className"
    name="classRadio"
    :options="forbiddenJewelStore.state.currentClasses"
  />
</template>

<style scoped></style>
