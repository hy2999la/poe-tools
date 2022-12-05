import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

import timelessJewelJson from '@/data/timelessJewel.json';

import type { TimelessJewelDict } from '@/types/TimelessJewelDict';

const jewelDict: TimelessJewelDict = timelessJewelJson;

export const useTimelessJewelStore = defineStore('timelessJewel', () => {
  const linkPrefix = 'https://www.pathofexile.com/trade/search/Kalandra/';
  const modifierPrefix = 'explicit.pseudo_timeless_jewel_';

  const jewelName = ref<string>(Object.keys(jewelDict)[0]);
  const variantName = ref<string>(jewelDict[jewelName.value].variants[0]);
  const rollNumber = ref<number[]>([]);
  const allRolls = ref<boolean>(false);

  const currentVariants = computed<Array<{ id: string; label: string }>>(() => [
    ...jewelDict[jewelName.value].variants.map((v) => ({
      id: v.toLowerCase(),
      label: v,
    })),
    {
      id: 'all',
      label: 'All',
    },
  ]);

  const minMax = computed<number[]>(() => [
    jewelDict[jewelName.value].min,
    jewelDict[jewelName.value].max,
  ]);

  const timelessLink = ref('');

  const timelessLinkText = computed<string>(() => {
    if (timelessLink.value.length > 0) {
      return 'Trade Link!';
    } else {
      return 'Select your jewel configurations';
    }
  });

  const timelessLinkClass = computed<string>(() => {
    if (timelessLink.value.length > 0) {
      return 'link';
    } else {
      return 'Select your jewel configurations';
    }
  });

  const deleteRoll = function (roll: number) {
    const i = rollNumber.value.indexOf(roll);
    rollNumber.value.splice(i, 1);
  };

  const deleteAllRolls = function () {
    rollNumber.value = [];
  };

  watch(currentVariants, (newVariants) => {
    variantName.value = newVariants[0].id;
  });

  const buildLink = async function () {
    let filters;
    if (variantName.value === 'all') {
      filters = jewelDict[jewelName.value].variants
        .map((variant: string) =>
          rollNumber.value.map((num: number) => ({
            disabled: false,
            id: modifierPrefix + variant.toLowerCase(),
            value: allRolls.value ? null : { max: num, min: num },
          }))
        )
        .flat();
    } else {
      filters = rollNumber.value.map((num: number) => ({
        disabled: false,
        id: modifierPrefix + variantName.value.toLowerCase(),
        value: allRolls.value ? null : { max: num, min: num },
      }));
    }

    const stats = [
      {
        filters,
        type: 'count',
        value: { min: 1 },
      },
    ];

    const queryTemplate = {
      query: {
        name: jewelDict[jewelName.value].label,
        stats,
        status: { option: 'online' },
        type: 'Timeless Jewel',
      },
      sort: { price: 'asc' },
    };

    try {
      const res = await fetch('http://localhost:3000/tradeSearch', {
        body: JSON.stringify(queryTemplate),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const jsonBody = await res.text();
      return linkPrefix + jsonBody;
    } catch (e) {
      return `${linkPrefix}?q=${JSON.stringify(queryTemplate)}`;
    }
  };

  const generateLink = async function () {
    console.log('generating...');
    // if (rollNumber.value.length === 0 && !allRolls.value) {
    //   timelessLink.value = '';
    //   timelessLinkText.value = 'Select your jewel configurations';
    //   timelessLinkClass.value = '';
    //   timelessLinkShow.value = false;
    //   return;
    // }

    // if (formData.value.allRolls) {
    timelessLink.value = await buildLink();
    // timelessLinkShow.value = true;
    // } else {
    //   state.value.timelessLink = '';
    //   state.value.timelessLinkText = 'Invalid Roll Number';
    //   state.value.timelessLinkClass = 'error disabled';
    //   state.value.timelessLinkShow = false;
    // }
  };

  return {
    deleteAllRolls,
    deleteRoll,
    formData: {
      allRolls,
      jewelName,
      rollNumber,
      variantName,
    },
    generateLink,
    state: {
      currentVariants,
      minMax,
      timelessLink,
      timelessLinkClass,
      timelessLinkText,
    },
  };
});
