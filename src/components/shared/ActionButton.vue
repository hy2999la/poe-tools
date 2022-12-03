<script setup lang="ts">
defineProps<{
  name: string;
  label?: string;
  type: string;
  action?: Function;
  href?: string;
}>();
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="btnWrapper type_button">
    <input :id="name" :name="name" type="url" href="www.google.com" />
    <label :for="name">
      <slot id="icon" class="icon"></slot>
      <span v-if="label && label.length > 0" class="labelText">{{
        label
      }}</span>
    </label>
  </div>
</template>

<style scoped>
@import '@/css/button.css';
.labelText {
  user-select: none;
}

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
