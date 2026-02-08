<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Result, Button } from 'ant-design-vue';

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center">
    <Result
      status="403"
      title="403"
      sub-title="抱歉，您没有权限访问此页面。"
    >
      <template #extra>
        <Button type="primary" size="large" @click="goHome">返回首页</Button>
      </template>
    </Result>
  </div>
</template>
