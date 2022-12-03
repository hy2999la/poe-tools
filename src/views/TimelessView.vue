<script setup lang="ts">
import RollNumberInput from '@/components/timelessJewel/RollNumberInput.vue';
import TimelessRadioTiles from '@/components/timelessJewel/TimelessRadioTiles.vue';
import VariantRadioTiles from '@/components/timelessJewel/VariantRadioTiles.vue';
import CheckboxButton from '@/components/shared/CheckboxButton.vue';
import TimelessLinksList from '@/components/timelessJewel/TimelessLinksList.vue';
import { useTimelessJewelStore } from '@/store/timelessJewel';

const linkPrefix = 'https://www.pathofexile.com/trade/search/Kalandra/';
const modifierPrefix = 'explicit.pseudo_timeless_jewel_';

const timelessStore = useTimelessJewelStore();

const generateLink = async function (): Promise<void> {
  await timelessStore.generateLink();
};
</script>

<template>
  <main class="wrapper">
    <h1>Timeless Jewel Link</h1>
    <div class="timeless">
      <h3 class="form-header">Timeless Jewel</h3>
      <TimelessRadioTiles />

      <hr class="divider" />

      <h3 class="form-header">Variants</h3>
      <VariantRadioTiles />

      <hr class="divider" />

      <span style="grid-column: 2 / 3; margin-inline: 2em">
        If you would like to
        <CheckboxButton
          v-model="timelessStore.formData.allRolls"
          style="display: inline-block; padding: 0px"
          name="allRolls"
          label="Ignore Rolls?"
          type="text"
        />
        &lt;- Click or leave the Roll number... field below blank
      </span>

      <h3 class="form-header">Rolls</h3>
      <RollNumberInput
        @delete-roll="timelessStore.deleteRoll"
        @delete-all-rolls="timelessStore.deleteAllRolls"
      />
    </div>
    <hr />
    <button @click="generateLink">Generate Link</button>
    <span id="tradeLink"
      ><a v-if="true" :href="timelessStore.state.timelessLink">{{
        timelessStore.state.timelessLinkText
      }}</a>
      <p v-else :class="timelessStore.state.timelessLinkClass">
        {{ timelessStore.state.timelessLinkText }}
      </p>
    </span>
    <div>
      <TimelessLinksList />
    </div>
  </main>
</template>

<style scoped>
/* @media (min-width: 1024px) {
  .timeless {
    min-height: 100vh;
  }
} */
.wrapper {
  display: flex;
  flex-direction: column;
  flex: 2;
}
.timeless {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: center;
  row-gap: 2em;
  padding: 20px;
}
.divider {
  grid-column: 1 / 3;
}
.error {
  color: rgb(236, 76, 76);
}
hr {
  width: 100%;
  margin-bottom: 1em;
}
.form-header {
  text-align: end;
}
</style>
