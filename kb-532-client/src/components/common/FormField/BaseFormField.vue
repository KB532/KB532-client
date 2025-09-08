<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block mb-2 subtitle2 text-kb-gray-dark">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :id="id"
        :type="type"
        class="w-full h-12 px-4 py-0 leading-[49px] rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 placeholder:text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 body2"
        :class="{ 'ring-red-400 focus:ring-red-400': !!error }"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :maxlength="inputMaxlength"
        :value="displayValue"
        @input="onInput"
        @focus="focused = true"
        @blur="
          focused = false;
          $emit('blur');
        "
        :disabled="disabled"
      />
    </div>
    <p v-if="error" class="caption3 text-kb-yellow-positive mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  id: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  hint: String,
  error: String,
  required: Boolean,
  disabled: Boolean,
  autocomplete: { type: String, default: 'off' },
  inputmode: String,
  maxlength: Number,
  numericOnly: Boolean,
  mask: String, // 'rrn' | 'tel'
  displayMask: String, // 'rrn' (표시용 마스킹)
});

const emit = defineEmits(['update:modelValue', 'blur']);
const focused = ref(false);

const inputMaxlength = computed(() => {
  if (props.mask === 'rrn') return 14;
  if (props.mask === 'tel') return 13;
  return props.maxlength;
});

const onlyDigits = (v) => String(v ?? '').replace(/\D/g, '');

function formatByMask(digits, mask) {
  const d = onlyDigits(digits);

  if (mask === 'rrn') {
    const capped = d.slice(0, 13);
    const front = capped.slice(0, 6);
    const back = capped.slice(6);
    return back ? `${front}-${back}` : front;
  }

  if (mask === 'tel') {
    const capped = d.slice(0, 11);
    if (capped.startsWith('02')) {
      const rest = capped.slice(2);
      if (rest.length <= 3) return `02-${rest}`;
      if (rest.length <= 7) return `02-${rest.slice(0, 3)}-${rest.slice(3)}`;
      return `02-${rest.slice(0, 4)}-${rest.slice(4, 8)}`;
    }
    const a = capped.slice(0, 3);
    const b = capped.slice(3, 7);
    const c = capped.slice(7, 11);
    if (!b) return a;
    if (!c) return `${a}-${b}`;
    return `${a}-${b}-${c}`;
  }

  return d;
}

// 주민번호 표시용
function maskRrnDisplay(formatted) {
  const [front, back] = String(formatted).split('-');
  if (!back) return formatted;
  const first = back[0] ?? '';
  const maskedTail = '•'.repeat(Math.max(0, back.length - 1));
  return `${front}-${first}${maskedTail}`;
}

const displayValue = computed(() => {
  if (props.mask) {
    const rawDigits = onlyDigits(props.modelValue);
    let v = formatByMask(rawDigits, props.mask);
    if (props.displayMask === 'rrn' && !focused.value) v = maskRrnDisplay(v);
    return v;
  }
  return props.modelValue;
});

function onInput(e) {
  let valueToEmit = e.target.value ?? '';

  if (props.mask) {
    let digits = onlyDigits(valueToEmit);
    if (props.mask === 'rrn') {
      digits = digits.slice(0, 13);
    } else if (props.mask === 'tel') {
      digits = digits.slice(0, 11);
    }
    valueToEmit = digits;
  } else if (props.maxlength) {
    valueToEmit = valueToEmit.slice(0, props.maxlength);
  }

  emit('update:modelValue', valueToEmit);
}
</script>
