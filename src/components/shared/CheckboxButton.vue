<script setup lang="ts">
import type { ButtonType } from '@/types/Button';

withDefaults(
  defineProps<{
    label: string;
    modelValue: boolean;
    name: string;
    type?: ButtonType;
  }>(),
  {
    type: 'button',
  }
);

defineEmits(['update:modelValue']);
</script>

<template>
  <div :class="['btnWrapper', `type_${type}`]">
    <input
      :id="name"
      :checked="modelValue"
      :name="name"
      type="checkbox"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <label :for="name">
      <slot id="icon" class="icon"></slot>
      <span v-if="label.length > 0" class="labelText">{{ label }}</span>
    </label>
  </div>
</template>

<style scoped>
@import '@/css/button.css';
.labelText {
  user-select: none;
  font-style: italic;
}

.type_button input:checked ~ label {
  background-color: rgb(95, 119, 89);
}

/* .type_text input:checked ~ label::after {
  content: '🗸';
  margin-left: 0.5em;
} */
</style>
