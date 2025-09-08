<script setup>
const props = defineProps({
  username: { type: String, required: true }
})
const emit = defineEmits(['profile'])
</script>

<template>
  <section class="greeting">
    <p class="hello"><strong>{{ username }}</strong>님 반갑습니다.</p>
    <button class="link" @click="$emit('profile')">프로필 설정</button>
  </section>
</template>

<style scoped>
.greeting { margin: 6px 0 14px; }
.hello { font-size: 20px; margin: 0 0 6px; }
.link { background: transparent; border: 0; padding: 0; color: var(--muted); text-decoration: underline; font-size: 13px; cursor: pointer; }
</style>
