<script setup>
defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <section class="flex flex-col gap-4 bg-white">
    <h4 class="subtitle1 text-black">{{ title }}</h4>
    <slot />
  </section>
</template>
