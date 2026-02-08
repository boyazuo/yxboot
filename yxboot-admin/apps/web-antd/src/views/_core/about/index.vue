<script setup lang="ts">
import { Card, Descriptions } from 'ant-design-vue';
import { appName } from '@/preferences';
</script>

<template>
  <div class="p-4">
    <Card title="关于">
      <Descriptions :column="1" bordered>
        <Descriptions.Item label="项目名称">{{ appName }}</Descriptions.Item>
        <Descriptions.Item label="描述">基于 Vue 3 + Ant Design Vue + Vite 的后台管理模板</Descriptions.Item>
        <Descriptions.Item label="技术栈">Vue 3, TypeScript, Vite, Ant Design Vue, Pinia, Vue Router</Descriptions.Item>
      </Descriptions>
    </Card>
  </div>
</template>
