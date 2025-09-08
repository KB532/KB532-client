<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Icon } from '@iconify/vue';

defineProps({
  modelValue: String,
  banks: {
    type: Array,
    default: () => ['KB국민', '신한', '하나', '우리', 'NH농협'],
  },
  error: String,
});

const emit = defineEmits(['update:modelValue']);

const bankOpen = ref(false);

function chooseBank(b) {
  emit('update:modelValue', b);
  bankOpen.value = false;
}
function toggleBankOpen() {
  bankOpen.value = !bankOpen.value;
}
function onKeyToggle(e) {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleBankOpen();
  }
}

function onDocClick(e) {
  const container = document.getElementById('bank-select');
  if (container && !container.contains(e.target)) {
    bankOpen.value = false;
  }
}
onMounted(() => document.addEventListener('click', onDocClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocClick));
</script>

<template>
  <div id="bank-select">
    <label class="block mb-2 subtitle2 text-kb-gray-dark">은행 선택</label>

    <button
      type="button"
      class="w-full h-12 px-4 rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 flex items-center justify-between body2 focus:ring-2 focus:ring-kb-yellow-positive"
      :class="{ 'ring-red-400 focus:ring-red-400': !!error }"
      @click="toggleBankOpen"
      @keydown="onKeyToggle"
      :aria-expanded="bankOpen"
      aria-haspopup="listbox"
    >
      <span :class="modelValue ? 'truncate' : 'truncate text-gray-600'">
        {{ modelValue ? modelValue : '은행 선택하기' }}
      </span>

      <Icon
        icon="material-symbols:arrow-forward-ios-rounded"
        class="w-4 h-auto text-gray-600 transition-transform"
        :class="{ '-rotate-90': bankOpen, 'rotate-90': !bankOpen }"
      />
    </button>

    <p v-if="error" class="mt-1 caption3 text-kb-yellow-positive">
      {{ error }}
    </p>

    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="bankOpen"
        class="mt-2 rounded-xl bg-white shadow-drop-shadow ring-1 ring-gray-200 p-2"
        role="listbox"
        :aria-activedescendant="modelValue ? `bank-${modelValue}` : undefined"
      >
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="b in banks"
            :key="b"
            type="button"
            :id="`bank-${b}`"
            role="option"
            :aria-selected="modelValue === b"
            @click="chooseBank(b)"
            class="h-10 rounded-lg text-center body2 transition active:bg-gray-200"
            :class="modelValue === b ? 'bg-gray-200 text-kb-gray-dark ' : 'border'"
          >
            {{ b }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
