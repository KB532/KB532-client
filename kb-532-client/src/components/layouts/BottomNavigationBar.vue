<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();

// TODO: 하단바 숨길 경로 추가
const HIDDEN_ROUTES = ['/login'];

const isHidden = computed(() => HIDDEN_ROUTES.some((prefix) => route.path.startsWith(prefix)));

const isActive = (to) => route.path === to || route.path.startsWith(to + '/');

const items = [
  { to: '/', label: '홈', icon: 'bxs:home' },
  { to: '/reports', label: '리포트', icon: 'bxs:bar-chart-alt-2' },
  { to: '/ai-coaching', label: 'AI 코칭', icon: 'ic:baseline-lightbulb' },
  { to: '/menu', label: '메뉴', icon: 'ic:round-menu' },
];

const iconClass = (to) => ['w-[28px] h-[28px]', isActive(to) ? 'text-black' : 'text-gray-600'];
const textClass = (to) => [
  'caption3 whitespace-nowrap',
  isActive(to) ? 'text-black' : 'text-gray-600',
];
</script>

<template>
  <nav
    v-if="!isHidden"
    class="flex rounded-t-[16px] border-gray-100 bg-white shadow-bottom-navbar justify-around items-center fixed bottom-0 left-0 right-0 max-w-md mx-auto"
  >
    <ul class="h-[90px] flex items-start pt-2 gap-12">
      <li v-for="item in items" :key="item.to" class="flex-1 flex justify-center">
        <RouterLink
          :to="item.to"
          class="flex flex-col items-center gap-1"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          <Icon :icon="item.icon" :class="iconClass(item.to)" aria-hidden="true" />
          <span :class="textClass(item.to)">{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
