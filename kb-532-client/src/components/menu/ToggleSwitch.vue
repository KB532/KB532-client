<script setup>
defineProps({
  modelValue: { type: Boolean, default: true }, // ← 기본 ON
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);
const onChange = (e) => emit('update:modelValue', e.target.checked);
</script>

<template>
  <label class="toggle" :class="{ disabled }">
    <!-- ↓ peer + sr-only 로 숨기되 상태는 유지 -->
    <input
      class="peer sr-only"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <!-- ↓ 기본 bg-gray-200, 체크되면 kb-yellow-positive -->
    <span class="slider bg-gray-200 peer-checked:bg-kb-yellow-positive" />
  </label>
</template>

<style scoped>
.toggle {
  position: relative;
  width: 48px;
  height: 24px;
  display: inline-block;
}
.toggle input {
  display: none;
} /* sr-only로 숨기지만 접근성 OK */

/* 배경색은 Tailwind 클래스가 처리하므로 background 삭제 */
.slider {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  transition: background 0.2s;
}

/* 노브(동그라미) */
.slider::before {
  content: '';
  position: absolute;
  left: 4px; /* ← 3px → 4px */
  top: 4px; /* ← 3px → 4px */
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
}

/* ON = 오른쪽으로 이동 */
.toggle input:checked + .slider::before {
  transform: translateX(24px); /* ← 20px → 24px */
}

.toggle.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
