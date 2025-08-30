<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

// 숨길 경로들
const HIDDEN_ROUTES = ['/login']

const route = useRoute()
const isHidden = computed(() =>
  HIDDEN_ROUTES.some(prefix => route.path.startsWith(prefix))
)

import logoUrl from '@/assets/logo/532LOGO.svg'
</script>

<template>
  <header v-if="!isHidden" class="fixed top-0 left-0 right-0 z-50">
    <div class="max-w-[375px] mx-auto bg-white">
      <nav class="h-14 flex items-center justify-between px-4">
        <RouterLink to="/" class="inline-flex items-center">
          <img :src="logoUrl" alt="532 Logo" class="h-[36px] w-auto" />
        </RouterLink>

        <button type="button" class="p-2" aria-label="알림">
          <Icon
            icon="bxs:bell"
            class="w-[28px] h-auto text-gray-500"
            aria-hidden="true"
          />
        </button>
      </nav>
    </div>
  </header>
</template>
