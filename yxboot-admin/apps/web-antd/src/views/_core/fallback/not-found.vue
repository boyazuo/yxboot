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
      status="404"
      title="404"
      sub-title="抱歉，您访问的页面不存在。"
    >
      <template #extra>
        <Button type="primary" size="large" @click="goHome">返回首页</Button>
      </template>
    </Result>
  </div>
</template>
