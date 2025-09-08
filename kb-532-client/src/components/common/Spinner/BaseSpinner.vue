<template>
  <!-- size: px, color: HEX/CSS color -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 44 44"
    class="spinner"
    role="status"
    aria-label="loading"
  >
    <circle
      cx="22"
      cy="22"
      r="18"
      :stroke="trackColor"
      stroke-width="5"
      fill="none"
      opacity="0.25"
    />
    <circle
      cx="22"
      cy="22"
      r="18"
      :stroke="color"
      stroke-width="5"
      stroke-linecap="round"
      fill="none"
      class="spinner__stroke"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: { type: [Number, String], default: 36 },
  color: { type: String, default: '#FFBC00' },
  trackColor: { type: String, default: '#EDEDED' },
});
</script>

<style scoped>
@keyframes spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}
.spinner {
  display: inline-block;
  animation: spinner-rotate 1s linear infinite;
}

@keyframes spinner-dash {
  0% {
    stroke-dasharray: 1, 140;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 140;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 1, 140;
    stroke-dashoffset: -125;
  }
}
.spinner__stroke {
  stroke-dasharray: 1, 140;
  stroke-dashoffset: 0;
  animation: spinner-dash 1.5s ease-in-out infinite;
  transform-origin: center;
}
</style>
