<script setup>
const props = defineProps({
  data: Array,
});
</script>

<template>
  <ul class="bg-gray-100 text-blue-200 w-fit max-h-36 overflow-auto rounded-xl text-center">
    <li
      v-for="item in props.data"
      class="border-b border-gray-300 px-4 py-2 hover:bg-gray-300 active:bg-gray-300">
      {{ item }}
    </li>
  </ul>
</template>
