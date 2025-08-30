<template>
  <div class="flex bg-gray-100 rounded h-[36px] p-1 space-x-1">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      :class="[
        'flex-1 flex items-center justify-center caption1 focus:outline-none transition-all duration-200 ease-in-out whitespace-nowrap',
        tab.value === modelValue
          ? 'bg-white text-black rounded'
          : 'bg-transparent text-kb-gray-dark rounded'
      ]"
      @click="selectTab(tab.value)"
    >
      <p class="caption2">{{ tab.label }}</p>
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) =>
      value.every(
        (tab) => typeof tab.label === 'string' && typeof tab.value === 'string'
      ),
  },
  modelValue: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectTab = (value) => {
  emit('update:modelValue', value)
}
</script>
