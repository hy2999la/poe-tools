<script setup lang="ts">
import { inject, ref } from 'vue';
import InputGridItem from './InputGridItem.vue';

import type { TimelessJewelDictItem } from '@/types/TimelessJewelDict';

const inputValue = ref('');

const props = defineProps<{
  allRolls: boolean;
  modelValue: number[];
}>();

const emits = defineEmits([
  'update:modelValue',
  'deleteRoll',
  'deleteAllRolls',
]);

const selectedJewelDict = inject('selectedJewelDict') as TimelessJewelDictItem;

const validateRoll = function (num: string): boolean {
  const reg = /^\s*\d*\s*$/;
  if (!reg.test(num)) {
    return false;
  }
  const numParsed = Number(num.trim());
  return (
    numParsed >= selectedJewelDict.min && numParsed <= selectedJewelDict.max
  );
};

const updateValue = function (e: KeyboardEvent) {
  if (e.key === 'Enter') {
    const val = (e.target as HTMLInputElement).value;
    const newValue = [...props.modelValue];
    const badValues: string[] = [];
    val.split(',').forEach((v) => {
      if (validateRoll(v) && newValue.indexOf(Number(v)) < 0) {
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
  <main>
    <label class="rollNumberList" for="rollNumberInput">
      <span v-if="allRolls"></span>
      <InputGridItem
        v-else
        v-for="item in modelValue"
        :key="item"
        :roll="item"
        @click="$emit('deleteRoll', item)"
      >
        {{ item }}
      </InputGridItem>
      <input
        class="rollNumberInput"
        id="rollNumberInput"
        :value="inputValue"
        :placeholder="allRolls ? 'Searching for all rolls' : 'Roll number...'"
        :disabled="allRolls"
        @keyup="updateValue"
      />
    </label>
    <label class="minMaxText" for="rollNumber"
      >{{ selectedJewelDict.min }} - {{ selectedJewelDict.max }}</label
    >
    <button @click="$emit('deleteAllRolls')">Clear</button>
  </main>
</template>

<style scoped>
.rollNumberList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  width: 40vw;
  max-width: 40vw;
  padding: 1em;
  border: 1px solid white;
  gap: 0.5vw;
  cursor: text;
  border-radius: 15px;
}
input {
  background: none;
  border: none;
  color: rgba(235, 235, 235, 0.64);
  float: left;
}
input:focus {
  outline: none;
}
</style>
