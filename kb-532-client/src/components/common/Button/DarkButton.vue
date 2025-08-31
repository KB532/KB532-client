<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    @click="onClick"
    :class="[
      'button2',
      'rounded-lg bg-kb-gray text-white',
      'px-4 py-1.5 inline-flex items-center justify-center',
      'transition-colors duration-150 focus:outline-none',
      'focus:ring-2 focus:ring-kb-gray/30 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed','whitespace-nowrap',
      props.block ? 'w-full' : ''
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'button' }, // 'button' | 'submit' | 'reset'
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },   // true면 가로 100%
})
const emit = defineEmits(['click'])
const onClick = (e) => { if (!props.disabled) emit('click', e) }
</script>
