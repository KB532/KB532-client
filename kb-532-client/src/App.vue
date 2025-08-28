<script setup>
import { RouterView } from 'vue-router';
import BottomNavigationBar from './components/layouts/BottomNavigationBar.vue';
</script>

<template>
  <div class="relative">
    <div class="max-w-[375px] mx-auto bg-white">
      <RouterView />
    </div>
    <BottomNavigationBar />
  </div>
</template>
