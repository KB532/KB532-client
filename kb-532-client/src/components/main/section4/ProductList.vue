<script setup>
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import kbLogoUrl from '@/assets/bank/KBlogo.svg';
import { fetchProducts } from '@/api/products';

const props = defineProps({
  category: { type: String, required: true },
});

const loading = ref(false);
const items = ref([]);

const mapCategoryToApiType = (cat) => {
  switch (cat) {
    case 'savings':
      return 'SAVINGS';
    case 'time-deposit':
      return 'DEPOSIT';
    case 'subscription-bond':
      return 'HOUSING';
    case 'pension':
      return 'PENSION';
    case 'fund':
      return 'FUND';
    case 'isa':
      return 'ISA';
    default:
      return 'SAVINGS';
  }
};

const loadProducts = async () => {
  loading.value = true;
  try {
    const raw = await fetchProducts(mapCategoryToApiType(props.category));
    items.value = raw.map((it) => ({
      id: it.id,
      name: it.name,
      desc: it.eligibility || (it.features?.join(', ') ?? ''),
      term: it.term,
      rateText: `연 ${it.rate.base}% ~ ${it.rate.max}%`,
      link: it.link,
    }));
  } catch (e) {
    console.error('상품 조회 실패:', e);
    items.value = [];
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.category,
  () => {
    loadProducts();
  },
  { immediate: true },
);

// TODO: 추후 모달 열기 또는 페이지 이동(router.push) 로직 추가

const onItemClick = () => {
  alert('😍');
};
</script>

<template>
  <div v-if="loading" class="space-y-3">
    <div class="h-10 rounded-xl bg-gray-200 animate-pulse" />
    <div class="h-10 rounded-xl bg-gray-200 animate-pulse" />
  </div>

  <ul v-else class="divide-y divide-[#F4F4F4]">
    <!-- TODO: 추후 모달이나 페이지 이동 추가 -->
    <li
      v-for="(it, i) in items"
      :key="it.id || i"
      class="py-3 cursor-pointer select-none"
      @click="onItemClick(it)"
    >
      <div class="flex items-center justify-between">
        <!-- 로고 + 텍스트 -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-[#FFBC00] flex items-center justify-center">
            <img :src="kbLogoUrl" alt="KB" class="w-5 h-5 object-contain" />
          </div>
          <div>
            <p class="caption3 text-black m-0">{{ it.name }}</p>
            <p class="caption3 text-gray-600 m-0 mt-0.5">{{ it.desc }}</p>
          </div>
        </div>

        <!-- '>' 아이콘 -->
        <Icon
          icon="material-symbols:arrow-back-ios-new-rounded"
          class="w-4 h-4 text-kb-gray-dark scale-x-[-1]"
          aria-hidden="true"
        />
      </div>

      <!-- 하단 텍스트 -->
      <p class="caption3 text-gray-600 mt-2 text-right">
        {{ it.term }},&nbsp;
        <span class="text-kb-yellow-positive font-bold">{{ it.rateText }}</span>
      </p>
    </li>

    <li v-if="items.length === 0" class="py-6 text-center caption3 text-kb-gray-dark">
      표시할 상품이 없어요.
    </li>
  </ul>
</template>
