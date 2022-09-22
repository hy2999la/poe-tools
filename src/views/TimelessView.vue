<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      jewelDict: {
        brutalRestraint: {
          name: 'Brutal Restraint',
          min: 500,
          max: 8000,
          variants: ['Asenath', 'Balbala', 'Nasima'],
        },
        elegantHubris: {
          name: 'Elegant Hubris',
          min: 2000,
          max: 160000,
          variants: ['Cadiro', 'Caspiro', 'Victario'],
        },
        gloriousVanity: {
          name: 'Glorious Vanity',
          min: 100,
          max: 8000,
          variants: ['Ahuana', 'Doryani', 'Xibaqua'],
        },
        lethalPride: {
          name: 'Lethal Pride',
          min: 10000,
          max: 18000,
          variants: ['Akoya', 'Kaom', 'Rakiata'],
        },
        militantFaith: {
          name: 'Militant Faith',
          min: 2000,
          max: 10000,
          variants: ['Avarius', 'Dominus', 'Maxarius'],
        },
      } as { [key: string]: any },
      modifierPrefix: 'explicit.pseudo_timeless_jewel_',
      linkPrefix: 'https://www.pathofexile.com/trade/search/Kalandra?q=',
      jewelName: 'brutalRestraint',
      variantName: 'asenath',
      minMaxText: '500 - 8000',
      rollNumber: '',
      timelessLinkClass: '',
      timelessLinkShow: true,
      timelessLink: '',
      timelessLinkText: 'Select your jewel configurations',
    };
  },
  methods: {
    generateLink(): void {
      console.log('generating...');
      if (this.rollNumber) {
        if (validateRoll(this.jewelDict, this.jewelName, this.rollNumber)) {
          this.timelessLink = buildLink(
            this.jewelDict,
            this.jewelName,
            this.variantName,
            this.rollNumber,
            this.modifierPrefix,
            this.linkPrefix
          );
          this.timelessLinkText = 'Trade Site';
          this.timelessLinkClass = 'link';
          this.timelessLinkShow = true;
        } else {
          this.timelessLink = '';
          this.timelessLinkText = 'Invalid Roll Number';
          this.timelessLinkClass = 'error disabled';
          this.timelessLinkShow = false;
        }
      } else {
        this.timelessLink = '';
        this.timelessLinkText = 'Select your jewel configurations';
        this.timelessLinkClass = '';
        this.timelessLinkShow = false;
      }
    },
  },
  mounted() {
    this;
  },
});

function validateRoll(
  jewelDict: { [key: string]: any },
  jewelName: string,
  rollNumber: string
): boolean {
  console.log('validating...', rollNumber);
  const jewel = jewelDict[jewelName];
  const validateNums =
    rollNumber.indexOf(',') >= 0 ? rollNumber.split(',') : [rollNumber];
  console.log(validateNums);
  for (const num of validateNums) {
    console.log(num);
    if (!Number(num) || num < jewel.min || num > jewel.max) {
      console.log(false);
      return false;
    }
  }
  console.log(true);
  return true;
}

function buildLink(
  jewelDict: { [key: string]: any },
  jewelName: string,
  variantName: string,
  rollNumber: string,
  modifierPrefix: string,
  linkPrefix: string
): string {
  let filters;
  if (variantName === 'all') {
    filters = jewelDict[jewelName].variants.map((variant: string) => ({
      id: modifierPrefix + variant.toLowerCase(),
      disabled: false,
      value: { min: rollNumber, max: rollNumber },
    }));
  } else {
    filters = [
      {
        id: modifierPrefix + variantName.toLowerCase(),
        disabled: false,
        value: { min: rollNumber, max: rollNumber },
      },
    ];
  }

  const stats = [
    {
      type: 'count',
      filters,
      value: { min: 1 },
    },
  ];

  const queryTemplate = {
    query: {
      status: { option: 'online' },
      name: jewelDict[jewelName].name,
      type: 'Timeless Jewel',
      stats,
    },
    sort: { price: 'asc' },
  };

  console.log(queryTemplate);

  return linkPrefix + JSON.stringify(queryTemplate);
}
</script>

<template>
  <div class="timeless">
    <h1>Timeless Jewel Link</h1>

    <div class="inputs">
      <form name="timelessJewel" @input="generateLink">
        <select
          name="jewelName"
          id="jewelName"
          v-model="jewelName"
          @change="
            variantName = jewelDict[jewelName].variants[0].toLowerCase();
            minMaxText = `${jewelDict[jewelName].min} - ${jewelDict[jewelName].max}`;
          "
        >
          <option
            v-for="(jewel, jewelId) in jewelDict"
            :key="jewelId"
            :value="jewelId"
          >
            {{ jewel.name }}
          </option>
        </select>

        <select name="variantName" id="variantName" v-model="variantName">
          <option
            v-for="variant in jewelDict[jewelName].variants"
            :key="variant.toLowerCase()"
            :value="variant.toLowerCase()"
          >
            {{ variant }}
          </option>
        </select>

        <span class="minMaxText">{{ minMaxText }}</span>

        <input v-model="rollNumber" placeholder="Roll number" />
      </form>
      <span id="tradeLink"
        ><a v-if="timelessLinkShow" v-bind:href="timelessLink">{{
          timelessLinkText
        }}</a>
        <p v-else :class="timelessLinkClass">{{ timelessLinkText }}</p></span
      >
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .timeless {
    min-height: 100vh;
  }
}
.timeless {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
select,
input,
.minMaxText {
  margin: 10px;
  display: block;
  padding: 5px;
}
select {
  min-width: 200px;
}
.error {
  color: rgb(236, 76, 76);
}
</style>
