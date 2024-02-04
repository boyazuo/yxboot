<template>
  <a-card title="进行中的项目" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small">全部项目</a-button>
    </template>
    <a-card-grid v-for="item in groupItems" :key="item.title" class="!md:w-1/3 !w-full">
      <span class="flex">
        <Icon :icon="item.icon" :color="item.color" size="30" />
        <span class="text-lg ml-4">{{ item.title }}</span>
      </span>
      <div class="flex mt-2 h-10 text-secondary">{{ item.desc }}</div>
      <div class="flex justify-between text-secondary">
        <span>{{ item.group }}</span>
        <span>{{ item.date }}</span>
      </div>
    </a-card-grid>
  </a-card>
</template>
<script lang="ts" setup>
  import Icon from '@/components/Icon'
  import { groupItems } from './data'
</script>
<style scoped>
  html[data-theme='light'] .text-secondary {
    color: rgb(0 0 0 / 45%);
  }
</style>
