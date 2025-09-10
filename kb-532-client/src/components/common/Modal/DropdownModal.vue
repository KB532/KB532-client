<script setup>
const props = defineProps({
  data: Array,
});
</script>

<template>
  <ul class="bg-gray-100 body1 text-blue-200 w-fit max-h-44 overflow-auto rounded-xl text-center">
    <li
      v-for="(item, index) in props.data"
      :class="[
        'px-4 py-2 hover:bg-gray-300 active:bg-gray-300',
        index !== props.data.length - 1 ? 'border-b border-gray-300' : ''
      ]"
    >
      {{ item }}
    </li>
  </ul>
</template>
