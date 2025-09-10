<script setup>
const props = defineProps({
  modelValue: Boolean,
});
</script>

<template>
  <v-bottom-sheet v-model="props.modelValue">
    <div class="rounded-t-xl bg-white p-4 pb-8 min-h-20">
      <slot />
    </div>
  </v-bottom-sheet>
</template>
