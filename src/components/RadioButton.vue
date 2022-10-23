<script setup lang="ts">
interface RadioButtonProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
}

defineProps<RadioButtonProps>();
const emit = defineEmits(['radioSelect']);

const radioClick = function (e: Event) {
  emit('radioSelect', (e.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="radioWrapper">
    <input
      :id="id"
      :name="name"
      :value="id"
      @input="radioClick"
      type="radio"
      :checked="checked"
    />
    <label :for="id">
      <slot id="icon" class="icon"></slot>
      <span class="labelText">{{ label }}</span>
    </label>
  </div>
</template>

<style scoped>
.radioWrapper {
  display: inline-block;
  margin-inline: auto;
  width: 80%;
  height: 100%;
  max-width: 100px;
}

.icon {
  display: inline-block;
}

.labelText {
  margin-inline: 10px;
  user-select: none;
}

input {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

label {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  line-height: 1.2em;
  text-align: center;

  padding: 0.5em;

  cursor: pointer;

  border: 1px solid transparent;
  border-radius: 3px;

  background-color: rgb(70, 70, 70);

  z-index: 0;
}

input {
  opacity: 0;
  z-index: 1;
}

input:checked ~ label {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  box-shadow: 20px;
}
</style>
