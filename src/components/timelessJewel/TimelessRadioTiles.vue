<script setup lang="ts">
import { useTimelessJewelStore } from '@/store/timelessJewel';

import IconBrutalRestraint from '../icons/timeless/IconBrutalRestraint.vue';
import IconElegantHubris from '../icons/timeless/IconElegantHubris.vue';
import IconGloriousVanity from '../icons/timeless/IconGloriousVanity.vue';
import IconLethalPride from '../icons/timeless/IconLethalPride.vue';
import IconMilitantFaith from '../icons/timeless/IconMilitantFaith.vue';
import RadioTiles from '../shared/RadioTiles.vue';

const timelessStore = useTimelessJewelStore();

const jewels = [
  {
    icon: IconBrutalRestraint,
    id: 'brutalRestraint',
    label: 'Brutal Restraint',
  },
  {
    icon: IconElegantHubris,
    id: 'elegantHubris',
    label: 'Elegant Hubris',
  },
  {
    icon: IconGloriousVanity,
    id: 'gloriousVanity',
    label: 'Glorious Vanity',
  },
  {
    icon: IconLethalPride,
    id: 'lethalPride',
    label: 'Lethal Pride',
  },
  {
    icon: IconMilitantFaith,
    id: 'militantFaith',
    label: 'Militant Faith',
  },
];
</script>

<template>
  <RadioTiles
    v-model="timelessStore.formData.jewelName"
    name="timelessJewelRadio"
    :options="jewels"
  />
</template>

<style>
@media (min-width: 830px) {
  .labelText {
    white-space: nowrap;
  }
}
svg {
  width: 50%;
  height: 50%;
}
</style>
