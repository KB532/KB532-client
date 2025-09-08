<script setup>
const props = defineProps({
  active: { type: String, default: 'home' } // 'home'|'report'|'ai'|'menu'
})
const emit = defineEmits(['select'])
</script>

<template>
  <nav class="tabbar">
    <button class="tab" :class="{ active: active==='home' }"  @click="$emit('select','home')">
      <svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"/></svg>
      <span>홈</span>
    </button>
    <button class="tab" :class="{ active: active==='report' }" @click="$emit('select','report')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h16"/><path d="M7 16V8"/><path d="M12 16V5"/><path d="M17 16v-6"/></svg>
      <span>리포트</span>
    </button>
    <button class="tab" :class="{ active: active==='ai' }" @click="$emit('select','ai')">
      <svg viewBox="0 0 24 24"><path d="M12 2l1.4 3.3L17 7l-3.6 1.7L12 12l-1.4-3.3L7 7l3.6-1.7L12 2Z"/><circle cx="12" cy="17.5" r="2.5"/></svg>
      <span>AI 코칭</span>
    </button>
    <button class="tab" :class="{ active: active==='menu' }" @click="$emit('select','menu')">
      <svg viewBox="0 0 24 24"><path d="M4 7h16v2H4zM4 11h16v2H4zM4 15h16v2H4z"/></svg>
      <span>메뉴</span>
    </button>
  </nav>
</template>

<style scoped>
.tabbar { position: sticky; bottom: 0; left: 0; right: 0; height: 68px; display: grid; grid-template-columns: repeat(4, 1fr); background: var(--card); border-top: 1px solid var(--border); }
.tab { appearance: none; border: 0; background: transparent; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #9aa4b2; font-size: 11.5px; }
.tab svg { width: 22px; height: 22px; fill: currentColor; }
.tab.active { color: var(--accent); }
</style>
