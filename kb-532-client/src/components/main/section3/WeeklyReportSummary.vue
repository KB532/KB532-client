<script setup>
import { ref, onMounted } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import Chip from '@/components/common/Chip/BaseChip.vue';
import SummaryChipGroup from './SummaryChipGroup.vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { getWeeklyNudges, defaultWeekStart } from '@/api/dashboard';

const router = useRouter();
const goReports = () => router.push('/reports');

const loading = ref(false);
const error = ref('');
const successMsg = ref('');
const warningMsg = ref('');
const actionMsg = ref('');

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const weekStart = defaultWeekStart();
    const res = await getWeeklyNudges(weekStart);

    const payload = res?.data ?? res ?? {};
    successMsg.value = payload.success ?? '';
    warningMsg.value = payload.warning ?? '';
    actionMsg.value = payload.action ?? '';
  } catch (e) {
    error.value = e.message || '불러오기에 실패했어요.';
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<template>
  <BaseCard>
    <div class="w-full">
      <div class="flex items-center justify-between mb-3">
        <p class="subtitle2">주간 리포트 요약</p>
        <Chip
          size="small"
          variant="outline"
          class="shrink-0 whitespace-nowrap cursor-pointer"
          @click="goReports"
        >
          전체 리포트 보기
          <Icon icon="material-symbols:chevron-right" class="w-4 h-auto text-kb-gray-dark" />
        </Chip>
      </div>

      <SummaryChipGroup>
        <template #success>
          {{ successMsg }}
        </template>

        <template #warning>
          {{ warningMsg }}
        </template>

        <template #recommend>
          {{ actionMsg }}
        </template>
      </SummaryChipGroup>
    </div>
  </BaseCard>
</template>
