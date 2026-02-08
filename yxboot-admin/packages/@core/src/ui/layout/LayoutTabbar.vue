<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

interface Props {
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 40,
});

const style = computed((): CSSProperties => ({
  height: `${props.height}px`,
  minHeight: `${props.height}px`,
}));
</script>

<template>
  <section class="core-layout-tabbar vben-layout-tabbar" :style="style">
    <slot />
  </section>
</template>

<style scoped>
.core-layout-tabbar {
  padding: 0 8px;
  gap: 4px;
}
</style>
