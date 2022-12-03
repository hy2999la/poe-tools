<script setup lang="ts">
import RadioButton from './RadioButton.vue';

import type { RadioTileOptions } from '@/types/RadioTilesOptions';

defineProps<{
  name: string;
  modelValue: string;
  options: RadioTileOptions[] | string[];
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <div v-if="typeof options[0] === 'string'" class="tiles">
    <RadioButton
      v-for="option in (options as string[])"
      :key="option"
      :name="name"
      :value="option"
      :label="option"
      :checked="modelValue === option"
      @radio-select="$emit('update:modelValue', $event)"
    />
  </div>
  <div v-else class="tiles">
    <RadioButton
      v-for="option in (options as RadioTileOptions[])"
      :key="option.id"
      :name="name"
      :value="option.id"
      :label="option.label"
      :checked="modelValue === option.id"
      @radio-select="$emit('update:modelValue', $event)"
    >
      <component :is="option.icon" class="radioIcon" />
    </RadioButton>
  </div>
</template>

<style scoped>
.tiles {
  display: flex;
  flex-direction: row;
  justify-content: start;
  column-gap: 1em;
  row-gap: 0.5em;
  flex-wrap: wrap;
  width: 100%;
  margin-inline: 2em;
}
.radioIcon {
  width: 40%;
  height: 40%;
}
</style>
