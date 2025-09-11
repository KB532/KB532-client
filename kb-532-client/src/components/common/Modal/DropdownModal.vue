<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: 'list',
  },
});

const emits = defineEmits(['select']);

const handleClick = (item) => {
  emits('select', item);
}
</script>

<template>
  <div>
    <div
      v-if="props.type === 'input'"
      class="relative">
      <input
        type="text"
        maxlength='50'
        class="bg-gray-100 border border-blue-200 p-2 h-12 w-72 rounded-lg"
      >
      <button
        class="absolute right-2 top-2.5 px-2 py-1 text-blue-200 rounded-lg button2 hover:bg-gray-300 active:bg-gray-300"
      >
        확인
      </button>
    </div>

    <ul v-else class="bg-gray-100 body1 text-blue-200 w-fit rounded-xl max-h-44 overflow-auto text-center">
      <li
        v-for="(item, index) in props.data"
        :class="[
        'px-4 py-2 hover:bg-gray-300 active:bg-gray-300',
        index !== props.data.length - 1 ? 'border-b border-gray-300' : ''
      ]"
        @click="handleClick(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
