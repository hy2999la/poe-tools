<script setup lang="ts">
import { useForbiddenJewelStore } from '@/store/forbiddenJewel';

import RadioTiles from '../shared/RadioTiles.vue';

const forbiddenJewelStore = useForbiddenJewelStore();
</script>

<template>
  <RadioTiles
    v-model="forbiddenJewelStore.formData.ascendancy"
    name="ascendanciesRadio"
    :options="forbiddenJewelStore.state.currentAscendancies"
  />
</template>

<style scoped></style>
