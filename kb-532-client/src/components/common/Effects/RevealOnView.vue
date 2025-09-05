<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = defineProps({
  as: { type: String, default: 'div' },
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 700 },
  threshold: { type: Number, default: 0.1 },
  rootMargin: { type: String, default: '0px 0px -10% 0px' },
  once: { type: Boolean, default: true },
  distance: { type: Number, default: 16 },
  scaleFrom: { type: Number, default: 0.98 },
  easing: { type: String, default: 'cubic-bezier(0.22,1,0.36,1)' },
});

const visible = ref(false);
const host = ref(null);
let observer;

const prefersReducedMotion = ref(false);
const effDuration = computed(() =>
  prefersReducedMotion.value ? Math.min(props.duration, 250) : props.duration,
);
const effDistance = computed(() => (prefersReducedMotion.value ? 0 : props.distance));
const effScaleFrom = computed(() => (prefersReducedMotion.value ? 1 : props.scaleFrom));

onMounted(() => {
  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mq.matches;
    mq.addEventListener?.('change', (e) => {
      prefersReducedMotion.value = e.matches;
    });
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value = true;
          if (props.once && host.value) observer.unobserve(host.value);
        } else if (!props.once) {
          visible.value = false;
        }
      });
    },
    { threshold: props.threshold, rootMargin: props.rootMargin },
  );

  if (host.value) observer.observe(host.value);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <component
    :is="as"
    ref="host"
    class="will-change-transform will-change-opacity transform-gpu"
    :style="{
      transitionProperty: 'opacity, transform',
      transitionDelay: `${delay}ms`,
      transitionDuration: `${effDuration}ms`,
      transitionTimingFunction: easing,
      opacity: visible ? 1 : 0,
      transform: visible
        ? 'translate3d(0,0,0) scale(1)'
        : `translate3d(0, ${effDistance}px, 0) scale(${effScaleFrom})`,
    }"
  >
    <slot />
  </component>
</template>
