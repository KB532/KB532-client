<script setup>
const props = defineProps({
  modelValue: Boolean,
});
</script>

<template>
  <v-bottom-sheet v-model="props.modelValue">
    <div class="rounded-t-xl bg-white">
      <slot />
    </div>
  </v-bottom-sheet>
</template>
