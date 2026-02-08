<script setup lang="ts">
import { computed } from 'vue';
import { appName } from '@/preferences';

const pageTitle = computed(() => '欢迎使用');
const pageDesc = computed(() => '请登录或注册以继续使用系统');
</script>

<template>
  <div class="flex min-h-screen flex-1 select-none overflow-x-hidden bg-background">
    <!-- 左侧品牌区：大屏显示 -->
    <div
      class="relative hidden w-0 flex-1 lg:block"
      style="min-height: 100vh;"
    >
      <div class="absolute inset-0 h-full w-full bg-background-deep dark:bg-[#070709]">
        <div class="login-background absolute left-0 top-0 size-full" />
        <div class="flex flex-col items-center justify-center mr-20 h-full">
          <div class="text-foreground mt-6 font-sans text-xl lg:text-2xl">
            {{ pageTitle }}
          </div>
          <div class="text-muted-foreground mt-2 text-center text-sm">
            {{ pageDesc }}
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧表单区 -->
    <div class="flex w-full flex-col items-center justify-center lg:w-2/5">
      <div class="absolute left-0 top-0 z-10 flex items-center p-4 lg:left-6 lg:top-6">
        <p class="m-0 text-xl font-medium text-foreground">{{ appName }}</p>
      </div>
      <div
        class="w-full max-w-md rounded-2xl border border-border bg-card px-8 py-10 shadow-sm"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-background {
  background: linear-gradient(
    154deg,
    hsl(var(--primary) / 0.08) 30%,
    hsl(var(--primary) / 0.25) 48%,
    hsl(var(--primary) / 0.08) 64%
  );
  filter: blur(100px);
}
.dark .login-background {
  background: linear-gradient(
    154deg,
    #07070915 30%,
    hsl(var(--primary) / 0.2) 48%,
    #07070915 64%
  );
  filter: blur(100px);
}
</style>
