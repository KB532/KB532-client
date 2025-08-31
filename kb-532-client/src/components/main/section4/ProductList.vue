<script setup>
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import kbLogoUrl from '@/assets/bank/KBlogo.svg';

const props = defineProps({
  category: { type: String, required: true },
});

const loading = ref(false);

// TODO: 목데이터, 추후 API 응답으로 교체
const MOCK = {
  savings: [
    {
      id: 'kb-star-saving',
      name: 'KB스타적금',
      desc: '한 달만 유지해도 확정이자율을 드리는',
      term: '12개월 기준',
      rateText: '연 3% ~ 6%',
    },
    {
      id: 'kb-health-saving',
      name: 'KB스타 건강적금',
      desc: '저축과 건강관리 한번에',
      term: '6개월 기준',
      rateText: '연 1% ~ 6%',
    },
    {
      id: 'kb-youth',
      name: 'KB 청년 도약계좌',
      desc: '힘찬 미래 높은 도약',
      term: '60개월 기준',
      rateText: '연 4.5% ~ 6%',
    },
    {
      id: 'kb-special',
      name: 'KB 특★한 적금',
      desc: '우리 모두의 소중한 날을 위한 특별한 준비',
      term: '1개월 기준',
      rateText: '연 2% ~ 6%',
    },
  ],
  'time-deposit': [
    {
      id: 'kb-td-12',
      name: 'KB 정기예금',
      desc: '기본에 충실한 예금',
      term: '12개월 기준',
      rateText: '연 3.2% ~ 4.0%',
    },
    {
      id: 'kb-td-6',
      name: 'KB 정기예금(6개월)',
      desc: '6개월 만기 정기예금',
      term: '6개월 기준',
      rateText: '연 2.5% ~ 3.0%',
    },
  ],
  pension: [],
  fund: [],
  'subscription-bond': [],
  isa: [],
};

const items = computed(() => MOCK[props.category] ?? []);

// TODO: 추후 모달 열기 또는 페이지 이동(router.push) 로직 추가
const onItemClick = () => {
  alert('😍');
};
</script>

<template>
  <div>
    <div v-if="loading" class="space-y-3">
      <div class="h-10 rounded-xl bg-gray-100 animate-pulse" />
      <div class="h-10 rounded-xl bg-gray-100 animate-pulse" />
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
  </div>
</template>
