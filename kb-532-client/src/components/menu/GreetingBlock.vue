<script setup>
defineProps({
  username: { type: String, required: true },
});
</script>

<template>
  <div class="flex bg-white justify-between">
    <h1 class="body2 text-black">
      <span class="title2">{{ username }}</span>님, 반갑습니다.
    </h1>
    <button class="caption2 underline" @click="$emit('profile')">프로필 설정</button>
  </div>
</template>
