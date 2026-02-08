<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

interface Props {
  height?: number;
  fixed?: boolean;
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  height: 32,
  fixed: true,
  show: true,
});

const style = computed((): CSSProperties => ({
  height: `${props.height}px`,
  minHeight: `${props.height}px`,
  position: props.fixed ? 'fixed' : 'static',
  bottom: 0,
  left: 0,
  right: 0,
}));
</script>

<template>
  <footer v-show="show" class="core-layout-footer" :style="style">
    <slot />
  </footer>
</template>

<style scoped>
.core-layout-footer {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  background: hsl(var(--background-deep));
  border-top: 1px solid hsl(var(--border));
  flex-shrink: 0;
  transition: margin-bottom 0.2s, height 0.2s;
}
</style>
