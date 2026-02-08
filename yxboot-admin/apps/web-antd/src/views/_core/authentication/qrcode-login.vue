<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-8">
    <p class="text-muted-foreground mb-4 text-center text-sm">请使用扫码登录</p>
    <div
      class="flex h-48 w-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted/50"
    >
      <span class="text-muted-foreground text-sm">二维码占位</span>
    </div>
    <router-link
      to="/auth/login"
      class="text-primary mt-6 text-sm hover:underline"
    >
      使用账号密码登录
    </router-link>
  </div>
</template>
