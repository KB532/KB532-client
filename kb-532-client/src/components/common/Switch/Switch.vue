<script setup>
import { ref } from "vue";

const isClicked = ref(false);
const emits = defineEmits(["click"]);

const toggle = () => {
  isClicked.value = !isClicked.value;
  emits("click");
};
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      @click="toggle"
      :class="[
        'relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300',
        isClicked ? 'bg-black' : 'bg-gray-600',
      ]"
    >
      <span
        :class="[
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300',
          isClicked ? 'translate-x-7' : 'translate-x-1',
        ]"
      />
    </button>
  </div>
</template>
