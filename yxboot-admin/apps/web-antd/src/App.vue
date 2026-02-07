<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@yxboot/core/runtime/store';

const appStore = useAppStore();

onMounted(() => {
  // 检测移动端
  const checkMobile = () => {
    appStore.setMobile(window.innerWidth < 768);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
</script>
