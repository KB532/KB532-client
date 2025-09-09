<script setup>
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
</script>

<template>
  <header v-if="!isHidden" class="fixed top-0 left-0 right-0 z-50">
    <div class="max-w-[375px] mx-auto bg-white">
      <nav class="relative h-14 flex items-center">
        <!-- 좌측 화살표 -->
        <RouterLink to="/" class="absolute left-4 flex items-center">
          <Icon
            icon="material-symbols:arrow-back-ios-new-rounded"
            class="w-5 h-auto text-gray-800"
          />
        </RouterLink>

        <!-- 가운데 제목 -->
        <div class="subtitle1 mx-auto">
          <slot />
        </div>
      </nav>
    </div>
  </header>
</template>
