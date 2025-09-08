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
        @blur="focused = false; $emit('blur')"
        :disabled="disabled"
      />
      <!-- rrn은 길이 제한을 attribute로 걸지 않고 onInput에서 제어 -->
    </div>
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
  // UX 보조
  autocomplete: { type: String, default: 'off' },
  inputmode: String,
  maxlength: Number,
  // 간단 필터/마스킹
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

// 숫자만 남기기
const onlyDigits = (v) => String(v ?? '').replace(/\D/g, '');

// 표시용 포맷
function formatByMask(digits, mask) {
  const d = onlyDigits(digits);

  if (mask === 'rrn') {
    const capped = d.slice(0, 13); // 최대 13자리
    const front = capped.slice(0, 6);
    const back = capped.slice(6);
    return back ? `${front}-${back}` : front;
  }

  if (mask === 'tel') {
    const capped = d.slice(0, 11); // 국내 기준 11자리
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

// 주민번호 표시용(뒷자리 • 처리)
function maskRrnDisplay(formatted) {
  const [front, back] = String(formatted).split('-');
  if (!back) return formatted;
  const first = back[0] ?? '';
  const maskedTail = '•'.repeat(Math.max(0, back.length - 1));
  return `${front}-${first}${maskedTail}`;
}

// 화면 표시값: modelValue(숫자만)를 포맷/마스킹
const displayValue = computed(() => {
  // 마스킹 필드는 포맷팅된 값을 표시
  if (props.mask) {
    const rawDigits = onlyDigits(props.modelValue);
    let v = formatByMask(rawDigits, props.mask);
    if (props.displayMask === 'rrn' && !focused.value) v = maskRrnDisplay(v);
    return v;
  }
  // 일반 필드는 modelValue 그대로 표시
  return props.modelValue;
});

// 입력 이벤트: 항상 숫자만을 모델로 emit (길이 제한도 여기서)
function onInput(e) {
  let valueToEmit = e.target.value ?? '';

  // 마스크가 지정된 경우, 숫자만 추출하고 길이를 제한합니다.
  if (props.mask) {
    let digits = onlyDigits(valueToEmit);
    if (props.mask === 'rrn') {
      digits = digits.slice(0, 13);
    } else if (props.mask === 'tel') {
      digits = digits.slice(0, 11);
    }
    valueToEmit = digits;
  } 
  // 마스크가 없는 일반 필드의 경우, maxlength만 적용합니다.
  else if (props.maxlength) {
    valueToEmit = valueToEmit.slice(0, props.maxlength);
  }

  emit('update:modelValue', valueToEmit);
}
</script>
