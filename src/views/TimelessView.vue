<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';

import TimelessSelectTiles from '@/components/timelessJewel/TimelessSelectTiles.vue';
import VariantSelectTiles from '@/components/timelessJewel/VariantSelectTiles.vue';
import RollNumberInput from '@/components/timelessJewel/RollNumberInput.vue';

import type {
  TimelessJewelDict,
  TimelessJewelDictItem,
} from '@/types/TimelessJewelDict';
import jewelJson from '@/data/timelessJewel.json';

interface FormDataModel {
  allRolls: boolean;
  jewelName: string;
  rollNumber: number[];
  variantName: string;
}

interface StateModel {
  timelessLink: string;
  timelessLinkClass: string;
  timelessLinkShow: boolean;
  timelessLinkText: string;
}

const jewelDict: TimelessJewelDict = jewelJson;

const linkPrefix = 'https://www.pathofexile.com/trade/search/Kalandra/';
const modifierPrefix = 'explicit.pseudo_timeless_jewel_';

const formData = ref<FormDataModel>({
  allRolls: false,
  jewelName: 'brutalRestraint',
  rollNumber: [],
  variantName: 'asenath',
});

const state = ref<StateModel>({
  timelessLink: '',
  timelessLinkClass: '',
  timelessLinkShow: false,
  timelessLinkText: 'Select your jewel configurations',
});

const variants = computed(() => {
  const variantOptions = jewelDict[formData.value.jewelName].variants.map(
    (v) => ({
      id: v.toLowerCase(),
      label: v,
    })
  );
  variantOptions.push({
    id: 'all',
    label: 'All',
  });

  return variantOptions;
});

watch(variants, (newVariants) => {
  formData.value.variantName = newVariants[0].id;
  console.log(formData.value);
});

provide<TimelessJewelDictItem>(
  'selectedJewelDict',
  jewelDict[formData.value.jewelName]
);

const generateLink = async function (): Promise<void> {
  console.log('generating...');
  if (formData.value.rollNumber.length === 0 && !formData.value.allRolls) {
    state.value.timelessLink = '';
    state.value.timelessLinkText = 'Select your jewel configurations';
    state.value.timelessLinkClass = '';
    state.value.timelessLinkShow = false;
    return;
  }

  // if (formData.value.allRolls) {
  state.value.timelessLink = await buildLink(
    formData.value.jewelName,
    formData.value.variantName,
    formData.value.allRolls,
    formData.value.rollNumber
  );
  state.value.timelessLinkText = state.value.timelessLink;
  state.value.timelessLinkClass = 'link';
  state.value.timelessLinkShow = true;
  // } else {
  //   state.value.timelessLink = '';
  //   state.value.timelessLinkText = 'Invalid Roll Number';
  //   state.value.timelessLinkClass = 'error disabled';
  //   state.value.timelessLinkShow = false;
  // }
};

const buildLink = async function (
  jewelName: string,
  variantName: string,
  allRolls: boolean,
  rollNumberArray: number[]
): Promise<string> {
  let filters;
  console.log(variantName);
  if (variantName === 'all') {
    filters = (jewelDict as TimelessJewelDict)[jewelName].variants
      .map((variant: string) =>
        rollNumberArray.map((num: number) => ({
          disabled: false,
          id: modifierPrefix + variant.toLowerCase(),
          value: allRolls ? null : { max: num, min: num },
        }))
      )
      .flat();
  } else {
    filters = rollNumberArray.map((num: number) => ({
      disabled: false,
      id: modifierPrefix + variantName.toLowerCase(),
      value: allRolls ? null : { max: num, min: num },
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
      name: jewelDict[jewelName].name,
      stats,
      status: { option: 'online' },
      type: 'Timeless Jewel',
    },
    sort: { price: 'asc' },
  };

  const res = await fetch('http://localhost:3000/tradeSearch', {
    body: JSON.stringify(queryTemplate),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  const jsonBody = await res.text();
  console.log(jsonBody);

  return linkPrefix + jsonBody;
};

const deleteRoll = function (e: number) {
  const i = formData.value.rollNumber.indexOf(e);
  formData.value.rollNumber.splice(i, 1);
};

const deleteAllRolls = function () {
  formData.value.rollNumber = [];
};
</script>

<template>
  <main class="timeless">
    <h1>Timeless Jewel Link</h1>
    <TimelessSelectTiles v-model="formData.jewelName" />
    <VariantSelectTiles v-model="formData.variantName" :options="variants" />
    <RollNumberInput
      v-model:rollNumber="formData.rollNumber"
      v-model:allRolls="formData.allRolls"
      @deleteRoll="deleteRoll"
      @deleteAllRolls="deleteAllRolls"
    />
    <button @click="generateLink">Generate Link</button>
    <span id="tradeLink"
      ><a v-if="state.timelessLinkShow" v-bind:href="state.timelessLink">{{
        state.timelessLinkText
      }}</a>
      <p v-else :class="state.timelessLinkClass">
        {{ state.timelessLinkText }}
      </p>
    </span>
  </main>
</template>

<style>
/* @media (min-width: 1024px) {
  .timeless {
    min-height: 100vh;
  }
} */
.timeless {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 60vw;
}
.error {
  color: rgb(236, 76, 76);
}
</style>
