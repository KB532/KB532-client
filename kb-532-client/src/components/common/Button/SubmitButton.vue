<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
});
const emit = defineEmits(['click']);
const onClick = (e) => {
  if (!props.disabled) emit('click', e);
};
</script>
<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    @click="onClick"
    :class="[
      'rounded-lg text-white bg-kb-gray-dark button1',
      'hover:bg-kb-gray-dark/90 active:bg-kb-gray-dark/80',
      'px-4 h-[43px] leading-none',
      props.block ? 'w-full flex' : 'inline-flex',
      'items-center justify-center whitespace-nowrap',
      'transition-colors duration-150',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ]"
  >
    <slot />
  </button>
</template>
