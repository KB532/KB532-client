<script setup>
const props = defineProps({
  title: { type: String, required: true }
})
</script>

<template>
  <section class="section">
    <h4 class="font-bold">{{ title }}</h4>
    <slot />
  </section>
</template>

<style scoped>
.section { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 10px 12px; margin: 14px 0; }
h4 { margin: 4px 2px 10px; font-size: 14px; }
</style>
