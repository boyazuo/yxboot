<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <RouterView />
  </ConfigProvider>
</template>
