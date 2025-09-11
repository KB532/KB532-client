<script setup>
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <div class="max-w-[375px] mx-auto bg-white">
      <nav class="relative h-14 flex items-center">
        <RouterLink to="/" class="absolute left-4 flex items-center">
          <Icon
            icon="material-symbols:arrow-back-ios-new-rounded"
            class="size-6 text-black"
          />
        </RouterLink>

        <div class="subtitle1 text-black mx-auto">
          <slot />
        </div>
      </nav>
    </div>
  </header>
</template>
