<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import IconDelete from '../icons/IconDelete.vue';
</script>

<template>
  <main class="listItem">
    <slot></slot>
    <button v-bind="$attrs">
      <IconDelete />
    </button>
  </main>
</template>

<style scoped>
.listItem {
  display: flex;
  flex-direction: row;
  justify-content: center;

  border: 1px solid transparent;
  border-radius: 3px;
  background-color: rgb(100, 100, 100);
  padding-left: 5px;

  overflow: hidden;
}

button {
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  fill: rgb(53, 53, 53);
}
</style>
