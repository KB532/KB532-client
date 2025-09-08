<script setup>
import { ref, reactive } from 'vue'
import RevealOnView from '@/components/common/Effects/RevealOnView.vue'

import GreetingBlock from '@/components/menu/GreetingBlock.vue'
import GoalsCard from '@/components/menu/GoalsCard.vue'
import SettingsGroup from '@/components/menu/SettingsGroup.vue'
import SettingItemToggle from '@/components/menu/SettingItemToggle.vue'

const username = '오삼이'
const goals = reactive([
  { label: '필수', value: 50, color: '#4C80F1' },
  { label: '선택', value: 30, color: '#F16E5B' },
  { label: '저축', value: 20, color: '#FF9F43' },
])

const alarmMain = ref(true)
const alarm1 = ref(true)
const alarm2 = ref(true)
const alarm3 = ref(true)

const onEditGoals = () => console.log('목표 수정하기')
</script>

<template>
  <div class="mobile-frame">
    <div class="screen">
      <header class="topbar">
        <div class="brand">
          <span class="logo-dot" />
        </div>
      </header>

      <main class="content">
        <RevealOnView :delay="0">
          <GreetingBlock :username="username" @profile="() => console.log('프로필 설정')" />
        </RevealOnView>

        <RevealOnView :delay="60">
          <GoalsCard :goals="goals" @edit="onEditGoals" />
        </RevealOnView>

        <RevealOnView :delay="120">
          <SettingsGroup title="알람 설정">
            <SettingItemToggle label="알림 여부" v-model="alarmMain" />
          </SettingsGroup>
        </RevealOnView>

        <RevealOnView :delay="180">
          <SettingsGroup title="## 설정">
            <SettingItemToggle label="알람 여부" v-model="alarm1" />
            <SettingItemToggle label="알람 여부" v-model="alarm2" />
            <SettingItemToggle label="알람 여부" v-model="alarm3" />
          </SettingsGroup>
        </RevealOnView>

        <div style="height: 80px" />
      </main>
    </div>
  </div>
</template>

<style scoped>
:root {
  --accent: #ffc107;
  --bg: #f6f7f9;
  --text: #111;
  --muted: #6b7280;
  --card: #ffffff;
  --border: #e9eef5;
}
* { box-sizing: border-box; }
.mobile-frame { min-height: 100dvh; display: grid; place-items: center; background: var(--bg); padding: 12px; }
.screen { width: 100%; max-width: 390px; background: var(--bg); border-radius: 24px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,.08); position: relative; }
.topbar { height: 56px; display: flex; align-items: center; padding: 0 16px; background: var(--bg); }
.brand { display: flex; align-items: center; gap: 10px; font-weight: 800; color: var(--text); }
.logo-dot { width: 22px; height: 22px; border-radius: 50%; background: var(--accent); display: inline-block; }
.logo-text { letter-spacing: .2px; font-size: 16px; }
.content { padding: 0 16px 8px; }
</style>
