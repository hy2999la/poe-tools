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
    <div class="rollNumberWrapper">
      <div class="minMaxText">
        {{ selectedJewelDict.min }} - {{ selectedJewelDict.max }}
      </div>
      <hr />
      <div v-if="allRolls" class="allRolls">Searching for all rolls.</div>
      <label v-else class="rollNumberList" for="rollNumberInput">
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
            id="rollNumberInput"
            class="rollNumberInput"
            :value="inputValue"
            placeholder="Roll number..."
            :disabled="allRolls"
            @keyup="updateValue"
          />
        </div>
      </label>
    </div>
    <button @click="$emit('deleteAllRolls')">Clear</button>
  </main>
</template>

<style scoped>
.rollNumberWrapper {
  width: 40vw;
  max-width: 40vw;
  min-height: 6em;
  border: 1px solid white;
  border-radius: 15px;
}
.rollNumberList {
  min-height: 6em;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1em;
  gap: 0.5vw;
  cursor: text;
}
input {
  background: none;
  border: none;
  color: rgba(235, 235, 235, 0.64);
}
input:focus {
  outline: none;
}
</style>
