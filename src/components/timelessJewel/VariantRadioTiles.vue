<script setup lang="ts">
import { useTimelessJewelStore } from '@/store/timelessJewel';

import RadioTiles from '../shared/RadioTiles.vue';

const timelessStore = useTimelessJewelStore();
</script>

<template>
  <RadioTiles
    v-model="timelessStore.formData.variantName"
    name="variantRadio"
    :options="timelessStore.state.currentVariants"
  />
</template>
