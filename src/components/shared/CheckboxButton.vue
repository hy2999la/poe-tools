<script lang="ts">
interface CheckboxButtonProps {
  label: string;
  modelValue: boolean;
  name: string;
  type?: ButtonType;
}
</script>

<script setup lang="ts">
import type { ButtonType } from '@/types/Button';

withDefaults(defineProps<CheckboxButtonProps>(), {
  type: 'button',
});

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
      <span class="labelText">{{ label }}</span>
    </label>
  </div>
</template>

<style scoped>
@import '@/css/base-button.css';
.icon {
  display: inline-block;
}

.labelText {
  user-select: none;
  font-style: italic;
}

input {
  opacity: 0;
  z-index: 1;
}

.type_button input:checked ~ label {
  background-color: rgb(95, 119, 89);
}

.type_text input:checked ~ label {
  color: rgb(95, 119, 89);
  overflow: visible;
}

.type_text label:hover > .labelText {
  text-decoration-line: underline;
}

/* .type_text input:checked ~ label::after {
  content: '🗸';
  margin-left: 0.5em;
} */
</style>
