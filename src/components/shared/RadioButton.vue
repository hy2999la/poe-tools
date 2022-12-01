<script lang="ts">
interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  type?: ButtonType;
}
</script>

<script setup lang="ts">
import type { ButtonType } from '@/types/Button';

withDefaults(defineProps<RadioButtonProps>(), {
  type: 'button',
});

const emit = defineEmits(['radioSelect']);

const radioClick = function (e: Event) {
  emit('radioSelect', (e.target as HTMLInputElement).id);
};
</script>

<template>
  <div :class="['btnWrapper', `type_${type}`]">
    <input
      :id="value"
      :name="name"
      type="radio"
      :checked="checked"
      @input="radioClick"
    />
    <label :for="value">
      <slot id="icon" class="icon"></slot>
      <span class="labelText">{{ label }}</span>
    </label>
  </div>
</template>

<style scoped>
@import '@/css/base-button.css';
.labelText {
  user-select: none;
}
</style>
