<template>
  <a-card title="快捷导航">
    <a-card-grid v-for="item in navItems" :key="item.title">
      <span class="flex flex-col items-center">
        <Icon :icon="item.icon" :color="item.color" size="20" />
        <span class="text-md mt-2 truncate">{{ item.title }}</span>
      </span>
    </a-card-grid>
  </a-card>
</template>
<script lang="ts" setup>
import Icon from '@/components/Icon'
import { navItems } from './data'
</script>
