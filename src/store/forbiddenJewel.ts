import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

import ascendanciesJson from '@/data/ascendancies.json';
import ascendancyPassivesJson from '@/data/ascendencyPassives.json';
import forbiddenJewelHashJson from '@/data/forbiddenJewelHash.json';

import type { AscendanciesDict } from '@/types/AscendanciesDict';
import type { AscendancyPassivesDict } from '@/types/AscendanciesPassiveDict';
import type { ForbiddenJewelHashDict } from '@/types/ForbiddenJewelHashDict';
import type { RadioTileOptions } from '@/types/RadioTilesOptions';

const ascendanciesDict: AscendanciesDict = ascendanciesJson;
const ascendancyPassivesDict: AscendancyPassivesDict = ascendancyPassivesJson;
const forbiddenJewelHashDict: ForbiddenJewelHashDict = forbiddenJewelHashJson;

export const useForbiddenJewelStore = defineStore('forbiddenJewel', () => {
  const linkPrefix = 'https://www.pathofexile.com/trade/search/Kalandra/';

  const forbiddenFleshModifier = 'explicit.stat_2460506030';
  const forbiddenFlameModifier = 'explicit.stat_1190333629';

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

  const currentPassives = computed<Array<string>>(() => [
    ...ascendancyPassivesDict[ascendancy.value],
    ascendanciesDict[className.value].hiddenForbiddenJewelPassive,
  ]);

  const passive = ref<string>(ascendancyPassivesDict[ascendancy.value][0]);

  const forbiddenJewelLink = ref<string[]>(['', '']);

  watch(currentAscendancies, (newAscendancies) => {
    ascendancy.value = newAscendancies[0].id;
  });

  watch(currentPassives, (newPassives) => {
    passive.value = newPassives[0];
  });

  const buildLink = async function () {
    const queryTemplateFlame = {
      query: {
        stats: [
          {
            filters: [
              {
                disabled: false,
                id: forbiddenFlameModifier,
                value: { option: forbiddenJewelHashDict[passive.value] },
              },
            ],
            type: 'and',
          },
        ],
        status: { option: 'online' },
      },
      sort: { price: 'asc' },
    };

    const queryTemplateFlesh = {
      query: {
        stats: [
          {
            filters: [
              {
                disabled: false,
                id: forbiddenFleshModifier,
                value: { option: forbiddenJewelHashDict[passive.value] },
              },
            ],
            type: 'and',
          },
        ],
        status: { option: 'online' },
      },
      sort: { price: 'asc' },
    };

    return [
      `${linkPrefix}?q=${JSON.stringify(queryTemplateFlame)}`,
      `${linkPrefix}?q=${JSON.stringify(queryTemplateFlesh)}`,
    ];
  };

  const generateLink = async function () {
    console.log('generating...');
    forbiddenJewelLink.value = await buildLink();
  };

  return {
    formData: {
      ascendancy,
      className,
      passive,
    },
    generateLink,
    state: {
      currentAscendancies,
      currentClasses,
      currentPassives,
      forbiddenJewelLink,
    },
  };
});
