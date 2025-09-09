<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { goals } from '@/stores/goals';

import GreetingBlock from '@/components/menu/GreetingBlock.vue';
import GoalsCard from '@/components/menu/GoalsCard.vue';
import SettingsGroup from '@/components/menu/SettingsGroup.vue';
import SettingItemToggle from '@/components/menu/SettingItemToggle.vue';

const router = useRouter();

const username = '오삼이';
// const goals = reactive([
//   { label: '필수', value: 50, color: '#4C80F1' },
//   { label: '선택', value: 30, color: '#F16E5B' },
//   { label: '저축', value: 20, color: '#FF9F43' },
// ])

const alarmMain = ref(true);
const alarm1 = ref(true);
const alarm2 = ref(true);
const alarm3 = ref(true);

// const onEditGoals = () => console.log('목표 수정하기')
const onEditGoals = () => router.push({ name: 'goal-edit' });
</script>

<template>
  <main class="content">
    <GreetingBlock :username="username" @profile="() => console.log('프로필 설정')" />

    <GoalsCard :goals="goals" @edit="onEditGoals" />
    <div class="my-3 h-[8px] w-full bg-gray-200"></div>

    <SettingsGroup title="알람 설정">
      <SettingItemToggle label="알림 여부" v-model="alarmMain" class="mt-2" />
    </SettingsGroup>

    <div class="my-4 h-[8px] w-full bg-gray-200"></div>

    <SettingsGroup title="환경 설정">
      <div class="space-y-3 mt-2">
        <SettingItemToggle label="간편 로그인" v-model="alarm1" />
        <SettingItemToggle label="간편 모드" v-model="alarm2" />
        <SettingItemToggle label="다크모드" v-model="alarm3" />
      </div>
    </SettingsGroup>

    <div style="height: 80px" />
  </main>
</template>
