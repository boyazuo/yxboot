<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

interface Props {
  height?: number;
  show?: boolean;
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<Props>(), {
  height: 48,
  show: true,
  theme: 'light',
});

const style = computed((): CSSProperties => ({
  height: `${props.height}px`,
  minHeight: `${props.height}px`,
}));
</script>

<template>
  <header
    v-show="show"
    class="core-layout-header vben-layout-header"
    :class="[`core-layout-header--${theme}`]"
    :style="style"
  >
    <div class="core-layout-header__logo vben-layout-header__logo">
      <slot name="logo" />
    </div>
    <div class="core-layout-header__toggle">
      <slot name="toggle" />
    </div>
    <div class="core-layout-header__content vben-layout-header__content">
      <slot />
    </div>
  </header>
</template>

<style scoped>
.core-layout-header {
  gap: 8px;
  padding-right: 12px;
}
.core-layout-header--light {
  background-color: hsl(var(--header));
  color: hsl(var(--foreground));
}
.core-layout-header--dark {
  background-color: hsl(var(--header));
  color: hsl(var(--foreground));
}
.core-layout-header__logo {
  flex-shrink: 0;
}
.core-layout-header__toggle {
  flex-shrink: 0;
}
</style>
