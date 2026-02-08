<script setup lang="ts">
import type { RendererElement } from 'vue';

defineOptions({ name: 'CollapseTransition' });

function reset(el: RendererElement) {
  const d = el as HTMLElement & { dataset?: Record<string, string> };
  d.style.maxHeight = '';
  d.style.overflow = d.dataset?.oldOverflow ?? '';
  d.style.paddingTop = d.dataset?.oldPaddingTop ?? '';
  d.style.paddingBottom = d.dataset?.oldPaddingBottom ?? '';
}

const on = {
  afterEnter(el: RendererElement) {
    const d = el as HTMLElement & { dataset?: Record<string, string> };
    d.style.maxHeight = '';
    d.style.overflow = d.dataset?.oldOverflow ?? '';
  },
  afterLeave(el: RendererElement) {
    reset(el);
  },
  beforeEnter(el: RendererElement) {
    const d = el as HTMLElement & { dataset?: Record<string, string> };
    if (!d.dataset) d.dataset = {};
    d.dataset.oldPaddingTop = d.style.paddingTop;
    d.dataset.oldPaddingBottom = d.style.paddingBottom;
    d.style.maxHeight = '0';
    d.style.paddingTop = '0';
    d.style.paddingBottom = '0';
  },
  beforeLeave(el: RendererElement) {
    const d = el as HTMLElement & { dataset?: Record<string, string> };
    if (!d.dataset) d.dataset = {};
    d.dataset.oldOverflow = d.style.overflow;
    d.style.maxHeight = `${d.scrollHeight}px`;
    d.style.overflow = 'hidden';
  },
  enter(el: RendererElement) {
    const d = el as HTMLElement & { dataset?: Record<string, string> };
    requestAnimationFrame(() => {
      d.dataset!.oldOverflow = d.style.overflow;
      d.style.maxHeight = `${d.scrollHeight}px`;
      d.style.paddingTop = d.dataset?.oldPaddingTop ?? '';
      d.style.paddingBottom = d.dataset?.oldPaddingBottom ?? '';
      d.style.overflow = 'hidden';
    });
  },
  leave(el: RendererElement) {
    const d = el as HTMLElement;
    d.style.maxHeight = '0';
    d.style.paddingTop = '0';
    d.style.paddingBottom = '0';
  },
};
</script>

<template>
  <transition name="collapse-transition" v-on="on">
    <slot />
  </transition>
</template>

<style scoped>
.collapse-transition-enter-active,
.collapse-transition-leave-active {
  transition: max-height 0.2s ease-in-out, padding 0.2s ease-in-out;
}
</style>
