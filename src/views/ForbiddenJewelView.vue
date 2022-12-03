<script setup lang="ts">
import AscendancyRadioTiles from '@/components/forbiddenJewel/AscendancyRadioTiles.vue';
import ClassRadioTiles from '@/components/forbiddenJewel/ClassRadioTiles.vue';
import PassiveRadioTiles from '@/components/forbiddenJewel/PassiveRadioTiles.vue';
import IconForbiddenFleshJewel from '@/components/icons/forbiddenjewel/IconForbiddenFleshJewel.vue';
import IconForbiddenFlameJewel from '@/components/icons/forbiddenjewel/IconForbiddenFlameJewel.vue';
import ActionButton from '@/components/shared/ActionButton.vue';
import { useForbiddenJewelStore } from '@/store/forbiddenJewel';

const forbiddenJewelStore = useForbiddenJewelStore();

const generateLink = function () {};
</script>

<template>
  <main class="wrapper">
    <h1>Forbidden Flame / Flesh Jewel Link</h1>
    <div class="timeless">
      <h3 class="form-header">Class</h3>
      <ClassRadioTiles />

      <hr class="divider" />

      <h3 class="form-header">Ascendancy</h3>
      <AscendancyRadioTiles />

      <hr class="divider" />

      <h3 class="form-header">Passive</h3>
      <PassiveRadioTiles />
    </div>
    <hr style="margin-bottom: 2em" />
    <span class="forbiddenJewelLinkButtons">
      <ActionButton name="forbiddenFlameLink">
        <IconForbiddenFlameJewel />
      </ActionButton>
      <ActionButton name="forbiddenFleshLink">
        <IconForbiddenFleshJewel />
      </ActionButton>
    </span>
    <!-- <span id="tradeLink"
      ><a v-if="true" :href="timelessStore.state.timelessLink">{{
        timelessStore.state.timelessLinkText
      }}</a>
      <p v-else :class="timelessStore.state.timelessLinkClass">
        {{ timelessStore.state.timelessLinkText }}
      </p>
    </span> -->
    <div>
      <!-- <TimelessLinksList /> -->
    </div>
  </main>
</template>

<style scoped>
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
}
.form-header {
  text-align: end;
}
.forbiddenJewelLinkButtons {
  display: flex;
  flex-direction: row;
  gap: 1em;
}
</style>
