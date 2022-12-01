<script setup lang="ts">
import RadioButton from './RadioButton.vue';

import type { RadioTileOptions } from '@/types/RadioTilesOptions';

defineProps<{
  name: string;
  modelValue: string;
  options: RadioTileOptions[];
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <main class="tiles">
    <RadioButton
      v-for="option in options"
      :key="option.id"
      :name="name"
      :value="option.id"
      :label="option.label"
      :checked="modelValue === option.id"
      @radio-select="$emit('update:modelValue', $event)"
    >
      <component :is="option.icon" />
    </RadioButton>
  </main>
</template>

<style scoped>
.tiles {
  display: flex;
  flex-direction: row;
  justify-content: start;
  column-gap: 1rem;
  margin-inline: 2em;
  width: 100%;
}
</style>
