<script setup>
import { ref } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import ProductChip from '@/components/common/Chip/ProductChip.vue';
import ProductList from './ProductList.vue';

const selected = ref('savings');
</script>

<template>
  <BaseCard>
    <div class="w-full">
      <p class="subtitle2 mb-2">인기 금융 상품</p>

      <div class="flex flex-nowrap items-center gap-1">
        <ProductChip :active="selected === 'savings'" @click="selected = 'savings'"
          >적금</ProductChip
        >
        <ProductChip :active="selected === 'time-deposit'" @click="selected = 'time-deposit'"
          >정기 예금</ProductChip
        >
        <ProductChip :active="selected === 'pension'" @click="selected = 'pension'"
          >퇴직연금</ProductChip
        >
        <ProductChip :active="selected === 'fund'" @click="selected = 'fund'">펀드</ProductChip>
        <ProductChip
          :active="selected === 'subscription-bond'"
          @click="selected = 'subscription-bond'"
          >청약/채권</ProductChip
        >
        <ProductChip :active="selected === 'isa'" @click="selected = 'isa'">ISA</ProductChip>
      </div>

      <ProductList class="mt-3" :category="selected" />
    </div>
  </BaseCard>
</template>
