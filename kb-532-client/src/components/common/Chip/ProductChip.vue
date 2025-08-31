<script setup>
import { computed } from 'vue';

const props = defineProps({
  active: { type: Boolean, default: false },
  color: { type: String, default: 'kb-gray' },
});

const containerClass = computed(() => {
  if (props.color === 'kb-gray') {
    return props.active
      ? 'bg-kb-gray ring-1 ring-inset ring-kb-gray'
      : 'bg-white  ring-1 ring-inset ring-kb-gray';
  }
  return props.active
    ? 'bg-kb-gray ring-1 ring-inset ring-kb-gray'
    : 'bg-white ring-1 ring-inset ring-kb-gray';
});

const labelClass = computed(() => (props.active ? 'text-white' : 'text-kb-gray'));
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-full caption3 leading-none h-[23px] px-2 whitespace-nowrap select-none transition-colors focus:outline-none"
    :class="containerClass"
    :aria-pressed="active"
  >
    <span :class="labelClass">
      <slot />
    </span>
  </button>
</template>
