<template>
  <a-tooltip placement="top">
    <template #title>
      <span>密度</span>
    </template>

    <a-dropdown placement="bottom" :trigger="['click']" :getPopupContainer="getPopupContainer">
      <ColumnHeightOutlined />
      <template #overlay>
        <a-menu @click="handleTitleClick" selectable v-model:selectedKeys="selectedKeysRef">
          <a-menu-item key="default">
            <span>默认</span>
          </a-menu-item>
          <a-menu-item key="middle">
            <span>中等</span>
          </a-menu-item>
          <a-menu-item key="small">
            <span>紧凑</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-tooltip>
</template>
<script setup lang="ts">
import { ColumnHeightOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { getPopupContainer } from '@/utils'
import { useTableContext } from '../../hooks/useTableContext'
import type { SizeType } from '../../types/table'

const table = useTableContext()

const selectedKeysRef = ref<SizeType[]>([table.getSize()])

function handleTitleClick({ key }: { key: SizeType }) {
  selectedKeysRef.value = [key]
  table.setProps({
    size: key,
  })
}
</script>
