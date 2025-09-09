<script setup>
defineProps({
  username: { type: String, required: true },
});
</script>

<template>
  <section class="p-4">
    <h1 class="body2">
      <span class="title2">{{ username }}</span
      >님, 반갑습니다.
    </h1>
    <button class="caption3 underline mt-1 ml-1" @click="$emit('profile')">프로필 설정</button>
  </section>
</template>
