<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

interface Props {
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  compactWidth?: number;
  compact?: 'wide' | 'compact';
}

const props = withDefaults(defineProps<Props>(), {
  padding: 16,
  paddingTop: undefined,
  paddingRight: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
  compactWidth: 1200,
  compact: 'wide',
});

const style = computed((): CSSProperties => {
  const p = props.padding;
  const pt = props.paddingTop ?? p;
  const pr = props.paddingRight ?? p;
  const pb = props.paddingBottom ?? p;
  const pl = props.paddingLeft ?? p;
  const base: CSSProperties = {
    flex: 1,
    padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
    overflow: 'auto',
    minHeight: 0,
  };
  if (props.compact === 'compact') {
    base.maxWidth = `${props.compactWidth}px`;
    base.margin = '0 auto';
    base.width = '100%';
  }
  return base;
});
</script>

<template>
  <main class="core-layout-content vben-layout-content" :style="style">
    <slot />
    <div v-if="$slots.overlay" class="core-layout-content__overlay">
      <slot name="overlay" />
    </div>
  </main>
</template>

<style scoped>
.core-layout-content {
  position: relative;
  background: hsl(var(--background-deep));
  transition: margin-top 0.2s;
}
.core-layout-content__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.core-layout-content__overlay > * {
  pointer-events: auto;
}
</style>
