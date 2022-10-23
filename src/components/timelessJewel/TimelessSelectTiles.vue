<script setup lang="ts">
import RadioButton from '../RadioButton.vue';
import IconBrutalRestraint from '../icons/timeless/IconBrutalRestraint.vue';
import IconElegantHubris from '../icons/timeless/IconElegantHubris.vue';
import IconGloriousVanity from '../icons/timeless/IconGloriousVanity.vue';
import IconLethalPride from '../icons/timeless/IconLethalPride.vue';
import IconMilitantFaith from '../icons/timeless/IconMilitantFaith.vue';

defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(['update:modelValue']);

const selectValue = function (e: string) {
  emit('update:modelValue', e);
};
</script>

<template>
  <main class="tiles">
    <RadioButton
      name="timelessRadio"
      id="brutalRestraint"
      label="Brutal Restraint"
      checked
      @radioSelect="selectValue"
    >
      <IconBrutalRestraint />
    </RadioButton>
    <RadioButton
      name="timelessRadio"
      id="elegantHubris"
      label="Elegant Hubris"
      @radioSelect="selectValue"
    >
      <IconElegantHubris />
    </RadioButton>
    <RadioButton
      name="timelessRadio"
      id="gloriousVanity"
      label="Glorious Vanity"
      @radioSelect="selectValue"
    >
      <IconGloriousVanity />
    </RadioButton>
    <RadioButton
      name="timelessRadio"
      id="lethalPride"
      label="Lethal Pride"
      @radioSelect="selectValue"
    >
      <IconLethalPride />
    </RadioButton>
    <RadioButton
      name="timelessRadio"
      id="militantFaith"
      label="Militant Faith"
      @radioSelect="selectValue"
    >
      <IconMilitantFaith />
    </RadioButton>
  </main>
</template>

<style>
.tiles {
  display: inline-grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  column-gap: 0.5rem;
  margin: 2em;
}
</style>
