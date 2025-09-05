<script setup>
import AiCoachingResultHeader from '@/components/ai/section1/AiCoachingResultHeader.vue';
import AiListMock from '@/components/ai/section2/AiListMock.vue';
import AiAskContainer from '@/components/ai/section3/AiAskContainer.vue';
import RevealOnView from '@/components/common/Effects/RevealOnView.vue';
</script>

<template>
  <div class="space-y-4">
    <RevealOnView :delay="0">
      <AiCoachingResultHeader />
    </RevealOnView>

    <RevealOnView :delay="100">
      <AiListMock />
    </RevealOnView>

    <RevealOnView :delay="200">
      <AiAskContainer />
    </RevealOnView>
  </div>
</template>
