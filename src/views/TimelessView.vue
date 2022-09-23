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
      linkPrefix: 'https://www.pathofexile.com/trade/search/Kalandra/',
      jewelName: 'brutalRestraint',
      variantName: 'asenath',
      minMaxText: '500 - 8000',
      rollNumber: '',
      timelessLinkClass: '',
      timelessLinkShow: false,
      timelessLink: '',
      timelessLinkText: 'Select your jewel configurations',
      allRolls: false,
    };
  },
  methods: {
    async generateLink(): Promise<void> {
      console.log('generating...');
      if (this.rollNumber || this.allRolls) {
        const rollNumberArray =
          this.rollNumber.indexOf(',') >= 0
            ? [...new Set(this.rollNumber.split(','))]
            : [this.rollNumber];
        if (
          validateRoll(
            this.jewelDict,
            this.jewelName,
            this.allRolls,
            rollNumberArray
          )
        ) {
          this.timelessLink = await buildLink(
            this.jewelDict,
            this.jewelName,
            this.variantName,
            this.allRolls,
            rollNumberArray,
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
});

function validateRoll(
  jewelDict: { [key: string]: any },
  jewelName: string,
  allRolls: boolean,
  rollNumberArray: string[]
): boolean {
  console.log('validating...', rollNumberArray);
  if (allRolls) return true;
  const jewel = jewelDict[jewelName];
  for (const num of rollNumberArray) {
    if (!Number(num) || num < jewel.min || num > jewel.max) {
      return false;
    }
  }
  return true;
}

async function buildLink(
  jewelDict: { [key: string]: any },
  jewelName: string,
  variantName: string,
  allRolls: boolean,
  rollNumberArray: string[],
  modifierPrefix: string,
  linkPrefix: string
): Promise<string> {
  let filters;
  console.log(variantName);
  if (variantName === 'all') {
    filters = jewelDict[jewelName].variants
      .map((variant: string) =>
        rollNumberArray.map((num: string) => ({
          id: modifierPrefix + variant.toLowerCase(),
          disabled: false,
          value: allRolls ? null : { min: num, max: num },
        }))
      )
      .flat();
    console.log(filters);
  } else {
    filters = rollNumberArray.map((num: string) => ({
      id: modifierPrefix + variantName.toLowerCase(),
      disabled: false,
      value: allRolls ? null : { min: num, max: num },
    }));
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

  const res = await fetch('http://localhost:3000/tradeSearch', {
    method: 'POST',
    body: JSON.stringify(queryTemplate),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jsonBody = await res.text();
  console.log(jsonBody);

  return linkPrefix + jsonBody;
}
</script>

<template>
  <div class="timeless">
    <h1>Timeless Jewel Link</h1>

    <div class="inputs">
      <form name="timelessJewel" @submit.prevent="generateLink">
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
          <option key="all" value="all">All</option>
        </select>

        <span class="minMaxText">{{ minMaxText }}</span>

        <div class="rollNumberForm">
          <input
            v-model="rollNumber"
            :placeholder="allRolls ? 'Searching for all rolls' : 'Roll number'"
            v-bind:disabled="allRolls"
          />
          <input type="checkbox" name="allRolls" v-model="allRolls" />
          <label for="allRolls">All Rolls</label>
        </div>
        <button type="submit">Generate Link</button>
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
.rollNumberForm {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
