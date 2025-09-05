<script setup>
import { RouterView, useRoute } from 'vue-router';
import BottomNavigationBar from './components/layouts/BottomNavigationBar.vue';
import TopAppBar from './components/layouts/TopAppBar.vue';
import { computed } from 'vue';

const route = useRoute();
const pageBgClass = computed(() => route.meta.pageBg ?? 'bg-gray-100');
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TopAppBar class="fixed inset-x-0 top-0 bg-white z-10" />
    <main :class="['flex-1 pt-14 pb-[80px]', pageBgClass]">
      <div class="p-4">
        <RouterView />
      </div>
    </main>
    <BottomNavigationBar class="fixed inset-x-0 bottom-0 h-[80px] bg-white z-10" />
  </div>
</template>
