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
      id="brutalRestraint"
      name="timelessRadio"
      label="Brutal Restraint"
      checked
      @radio-select="selectValue"
    >
      <IconBrutalRestraint />
    </RadioButton>
    <RadioButton
      id="elegantHubris"
      name="timelessRadio"
      label="Elegant Hubris"
      @radio-select="selectValue"
    >
      <IconElegantHubris />
    </RadioButton>
    <RadioButton
      id="gloriousVanity"
      name="timelessRadio"
      label="Glorious Vanity"
      @radio-select="selectValue"
    >
      <IconGloriousVanity />
    </RadioButton>
    <RadioButton
      id="lethalPride"
      name="timelessRadio"
      label="Lethal Pride"
      @radio-select="selectValue"
    >
      <IconLethalPride />
    </RadioButton>
    <RadioButton
      id="militantFaith"
      name="timelessRadio"
      label="Militant Faith"
      @radio-select="selectValue"
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
