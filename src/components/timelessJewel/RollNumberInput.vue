<script setup lang="ts">
import { useTimelessJewelStore } from '@/store/timelessJewel';

import InputGrid from '../shared/InputGrid.vue';

defineEmits(['deleteRoll', 'deleteAllRolls']);

const timelessStore = useTimelessJewelStore();

const validateRoll = function (num: string): boolean {
  const reg = /^\s*\d*\s*$/;
  if (!reg.test(num)) {
    return false;
  }
  const numParsed = Number(num.trim());
  return (
    numParsed >= timelessStore.state.minMax[0] &&
    numParsed <= timelessStore.state.minMax[1]
  );
};
</script>

<template>
  <InputGrid
    v-model="timelessStore.formData.rollNumber"
    :disabled="timelessStore.formData.allRolls"
    :validator="validateRoll"
    :placeholder="
      timelessStore.formData.allRolls ? 'Rolls searching off' : 'Roll number...'
    "
    @delete-all-rolls="timelessStore.deleteAllRolls()"
    @delete-roll="timelessStore.deleteRoll($event)"
  >
    Roll Range: {{ timelessStore.state.minMax[0] }} -
    {{ timelessStore.state.minMax[1] }}
  </InputGrid>
</template>

<style scoped>
.rollNumberForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
.allRollsLabel {
  margin-left: 5px;
  user-select: none;
}
</style>
