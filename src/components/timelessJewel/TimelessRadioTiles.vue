<script setup lang="ts">
import { useTimelessJewelStore } from '@/store/timelessJewel';

import IconBrutalRestraint from '../icons/timelessJewel/IconBrutalRestraint.vue';
import IconElegantHubris from '../icons/timelessJewel/IconElegantHubris.vue';
import IconGloriousVanity from '../icons/timelessJewel/IconGloriousVanity.vue';
import IconLethalPride from '../icons/timelessJewel/IconLethalPride.vue';
import IconMilitantFaith from '../icons/timelessJewel/IconMilitantFaith.vue';
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
    v-model.lazy="timelessStore.formData.jewelName"
    name="timelessJewelRadio"
    :options="jewels"
  />
</template>
