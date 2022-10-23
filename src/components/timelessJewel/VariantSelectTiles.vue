<script setup lang="ts">
import RadioButton from '../RadioButton.vue';
import type { RadioTileOptions } from '@/types/RadioTilesOptions';
defineProps<{
  modelValue: string;
  options: RadioTileOptions[];
}>();

const emit = defineEmits(['update:modelValue']);

const selectValue = function (e: string) {
  emit('update:modelValue', e);
};
</script>

<template>
  <main class="tiles">
    <RadioButton
      v-for="(option, i) in options"
      :id="option.id"
      :key="option.id"
      name="variantRadio"
      :label="option.label"
      :checked="i == 0"
      @radioSelect="selectValue"
    />
  </main>
</template>

<style>
.tiles {
  display: inline-grid;
  column-gap: 0.5rem;
  grid-auto-flow: column;
}
</style>
