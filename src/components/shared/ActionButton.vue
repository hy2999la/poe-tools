<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    label?: string;
    type?: string;
    href?: string;
  }>(),
  {
    type: 'button',
  }
);
defineEmits(['click']);
</script>

<template>
  <a
    v-if="href && href.length > 0"
    :id="name"
    :class="['btnWrapper', `type_${type}`]"
    :href="href"
    :name="name"
  >
    <label :for="name">
      <slot id="icon" class="icon"></slot>
      <div v-if="label && label.length > 0" class="labelText">
        {{ label }}
      </div>
    </label>
  </a>
  <div v-else :class="['btnWrapper', `type_${type}`]">
    <input :id="name" :name="name" type="url" @click="$emit('click')" />
    <label :for="name">
      <slot id="icon" class="icon"></slot>
      <div v-if="label && label.length > 0" class="labelText">
        {{ label }}
      </div>
    </label>
  </div>
</template>

<style scoped>
@import '@/css/button.css';

.type_button input:hover ~ label {
  background-color: rgb(95, 119, 89);
}

.type_button input:active ~ label {
  background-color: rgb(36, 63, 30);
}

:slotted(svg) {
  width: 5em;
  height: 5em;
}
</style>
