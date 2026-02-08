<script setup lang="ts">
import { Result, Button } from 'ant-design-vue';

function refresh() {
  location.reload();
}
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center">
    <Result
      status="500"
      title="500"
      sub-title="抱歉，服务器发生错误。"
    >
      <template #extra>
        <Button type="primary" size="large" @click="refresh">刷新页面</Button>
      </template>
    </Result>
  </div>
</template>
