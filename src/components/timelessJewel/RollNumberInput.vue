<script setup lang="ts">
import InputGrid from '../InputGrid.vue';

interface InputListProps {
  rollNumber: number[];
  allRolls: boolean;
}

defineProps<InputListProps>();

defineEmits([
  'update:allRolls',
  'update:rollNumber',
  'deleteRoll',
  'deleteAllRolls',
]);
</script>

<template>
  <main class="rollNumberForm">
    <InputGrid
      :allRolls="allRolls"
      :modelValue="rollNumber"
      @update:modelValue="$emit('update:rollNumber', $event)"
      @deleteRoll="$emit('deleteRoll', $event)"
      @deleteAllRolls="$emit('deleteAllRolls')"
    />
    <div class="rollNumberInput">
      <input
        type="checkbox"
        name="allRolls"
        id="allRolls"
        @input="
          $emit('update:allRolls', ($event.target as HTMLInputElement).checked)
        "
      />
      <label class="allRollsLabel" for="allRolls">All Rolls</label>
    </div>
  </main>
</template>

<style scoped>
.rollNumberForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.rollNumberInput {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.allRollsLabel {
  margin-left: 5px;
  user-select: none;
}
</style>
