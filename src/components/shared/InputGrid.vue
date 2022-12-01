<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

import InputGridItem from './InputGridItem.vue';

const inputValue = ref('');

const props = defineProps<{
  modelValue: number[];
  validator: Function;
}>();

const emits = defineEmits([
  'update:modelValue',
  'deleteRoll',
  'deleteAllRolls',
]);

const updateValue = function (e: KeyboardEvent) {
  if (e.key === 'Enter') {
    const val = (e.target as HTMLInputElement).value;
    const newValue = [...props.modelValue];
    const badValues: string[] = [];
    val.split(',').forEach((v) => {
      if (props.validator(v) && newValue.indexOf(Number(v)) < 0) {
        newValue.push(Number(v));
      } else {
        badValues.push(v);
      }
    });
    inputValue.value = badValues.join(',');
    emits('update:modelValue', newValue);
  }
};
</script>

<template>
  <main class="inputGridWrapper">
    <div class="inputGrid">
      <label
        class="inputGridList"
        for="inputGridInput"
        :disabled="$attrs.disabled"
      >
        <InputGridItem
          v-for="item in modelValue"
          :key="item"
          :roll="item"
          @click="$emit('deleteRoll', item)"
        >
          {{ item }}
        </InputGridItem>
        <div style="display: block">
          <input
            id="inputGridInput"
            class="inputGridInput"
            :placeholder="($attrs.placeholder as string)"
            :disabled="($attrs.disabled as boolean)"
            :value="inputValue"
            @keyup="updateValue"
          />
        </div>
      </label>
    </div>
    <div class="inputGridSubContent">
      <span style="color: rgba(150, 150, 150, 0.64)">
        <slot></slot>
      </span>
      <button @click="$emit('deleteAllRolls')">Clear All</button>
    </div>
  </main>
</template>

<style scoped>
.inputGridWrapper {
  margin-inline: 2em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.inputGrid {
  width: 100%;
  border: 1px solid white;
  border-radius: 15px;
  overflow: hidden;
}
.inputGridList {
  min-height: 2em;
  display: flex;
  flex-wrap: wrap;
  place-items: flex-start;
  padding: 1em;
  gap: 0.5vw;
  cursor: text;
}

.inputGridSubContent {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1.5em;
}
input {
  background: none;
  border: none;
  color: rgba(235, 235, 235, 0.64);
}

input:focus {
  outline: none;
}
.inputGridList[disabled='true'] {
  cursor: default;
  background-color: #393939;
}
</style>
