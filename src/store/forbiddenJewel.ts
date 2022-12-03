import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

import ascendanciesJson from '@/data/ascendancies.json';
import ascendancyPassivesJson from '@/data/ascendencyPassives.json';

import type { AscendanciesDict } from '@/types/AscendanciesDict';
import type { AscendancyPassivesDict } from '@/types/AscendanciesPassiveDict';
import type { RadioTileOptions } from '@/types/RadioTilesOptions';

const ascendanciesDict: AscendanciesDict = ascendanciesJson;
const ascendancyPassivesDict: AscendancyPassivesDict = ascendancyPassivesJson;

export const useForbiddenJewelStore = defineStore('forbiddenJewel', () => {
  const linkPrefix = 'https://www.pathofexile.com/trade/search/Kalandra/';

  ("trade: { ids: { explicit: ['explicit.stat_2460506030'] }, option: true }");

  const modifierPrefix = 'explicit.pseudo_timeless_jewel_';

  const currentClasses = computed<Array<RadioTileOptions>>(() =>
    Object.entries(ascendanciesDict).map((c) => ({
      id: c[0],
      label: c[1].label,
    }))
  );

  const className = ref<string>(currentClasses.value[0].id);

  const currentAscendancies = computed<Array<RadioTileOptions>>(() =>
    Object.entries(ascendanciesDict[className.value].ascendancies).map((a) => ({
      id: a[0],
      label: a[1].label,
    }))
  );

  const ascendancy = ref<string>(currentAscendancies.value[0].id);

  const currentPassives = computed<Array<string>>(
    () => ascendancyPassivesDict[ascendancy.value]
  );

  const passive = ref<string>(ascendancyPassivesDict[ascendancy.value][0]);

  const timelessLinkText = computed<string>(() => {
    return '';
  });

  // const setJewelName = function (jewel: string) {
  //   jewelName.value = jewel;
  // };

  // const setVariantName = function (variant: string) {
  //   variantName.value = variant;
  // };

  watch(currentAscendancies, (newAscendancies) => {
    ascendancy.value = newAscendancies[0].id;
  });

  watch(currentPassives, (newPassives) => {
    passive.value = newPassives[0];
  });

  return {
    formData: {
      ascendancy,
      className,
      passive,
    },
    // setJewelName,
    // setVariantName,
    state: {
      currentAscendancies,
      currentClasses,
      currentPassives,
    },
  };
});
