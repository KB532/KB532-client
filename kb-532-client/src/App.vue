<script setup>
import { RouterView, useRoute } from 'vue-router';
import BottomNavigationBar from './components/layouts/BottomNavigationBar.vue';
import TopAppBar from './components/layouts/TopAppBar.vue';
import ToastNotification from './components/common/Toast/ToastNotification.vue';
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAskStore } from '@/stores/ai/askStore';
import { useUiStore } from '@/stores/uiStore';

const route = useRoute();
const pageBgClass = computed(() => route.meta.pageBg ?? 'bg-gray-100');

const askStore = useAskStore();
const { answered } = storeToRefs(askStore);
const uiStore = useUiStore();

watch(answered, (newVal) => {
  if (newVal) {
    uiStore.showToast('AI 코치의 답변이 도착했습니다!');
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TopAppBar class="fixed inset-x-0 top-0 bg-white z-10" />
    <main :class="['flex-1 pt-14 pb-[80px]', pageBgClass]">
      <div class="p-0">
        <RouterView />
        <ToastNotification />
      </div>
    </main>
    <BottomNavigationBar class="fixed inset-x-0 bottom-0 h-[80px] bg-white z-10" />
  </div>
</template>
