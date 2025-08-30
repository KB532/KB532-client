<script setup>
import { RouterView } from 'vue-router';
import BottomNavigationBar from './components/layouts/BottomNavigationBar.vue';
import TopAppBar from './components/layouts/TopAppBar.vue';
</script>

<template>
  <div class="relative bg-gray-100">
    <TopAppBar/>
    <div class="pt-[72px] p-4">
      <RouterView />
    </div>
    <BottomNavigationBar />
  </div>
</template>
