<script setup>
import RevealOnView from '@/components/common/Effects/RevealOnView.vue';

import DarkCard from '@/components/common/Card/DarkCard.vue';
import EssentialAccordion from './accordion/EssentialAccordion.vue';
import DiscretionaryAccordion from './accordion/DiscretionaryAccordion.vue';
import SavingsAccordion from './accordion/SavingsAccordion.vue';

import CalendarIcon from '@/assets/ai/CALENDAR.svg';
import InformIcon from '@/assets/ai/INFORM.svg';

const username = '오삼이';
</script>

<template>
  <div class="max-w-md mx-auto">
    <section class="px-4 pt-12 pb-4 text-center">
      <p class="subtitle2 tracking-tight">
        532가 <span class="subtitle2 text-yellow-400">{{ username }}</span
        >님의
      </p>
      <h1 class="mt-1 title2 leading-snug">
        이번주 소비패턴에 대한<br />
        AI 코칭 결과를 알려드려요
      </h1>

      <RevealOnView :delay="0" :duration="700" :distance="12">
        <div class="mt-4 flex justify-center relative w-48 h-40 mx-auto">
          <img
            :src="CalendarIcon"
            alt="calendar"
            class="absolute bottom-0 left-0 w-20 h-20 object-contain"
            loading="lazy"
            decoding="async"
          />
          <img
            :src="InformIcon"
            alt="inform"
            class="absolute top-0 right-0 w-40 h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </RevealOnView>
    </section>

    <section class="px-4 space-y-4">
      <RevealOnView :delay="0" :duration="700" :distance="16">
        <DarkCard><EssentialAccordion /></DarkCard>
      </RevealOnView>

      <RevealOnView :delay="100" :duration="700" :distance="16">
        <DarkCard><DiscretionaryAccordion /></DarkCard>
      </RevealOnView>

      <RevealOnView :delay="200" :duration="700" :distance="16">
        <DarkCard><SavingsAccordion /></DarkCard>
      </RevealOnView>
    </section>
  </div>
</template>
