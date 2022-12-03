<script setup lang="ts">
import { useForbiddenJewelStore } from '@/store/forbiddenJewel';

import RadioTiles from '../shared/RadioTiles.vue';

const forbiddenJewelStore = useForbiddenJewelStore();
</script>

<template>
  <RadioTiles
    v-model="forbiddenJewelStore.formData.passive"
    name="passiveRadio"
    :options="forbiddenJewelStore.state.currentPassives"
  />
</template>

<style scoped></style>
