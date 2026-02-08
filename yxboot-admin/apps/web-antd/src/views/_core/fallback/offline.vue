<script setup lang="ts">
import { Result, Button } from 'ant-design-vue';

function refresh() {
  location.reload();
}
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center">
    <Result
      status="warning"
      title="网络异常"
      sub-title="请检查您的网络连接后重试。"
    >
      <template #extra>
        <Button type="primary" size="large" @click="refresh">刷新页面</Button>
      </template>
    </Result>
  </div>
</template>
