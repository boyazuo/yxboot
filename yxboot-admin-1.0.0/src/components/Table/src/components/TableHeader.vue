<template>
  <div style="width: 100%">
    <div v-if="$slots.headerTop" style="margin: 5px">
      <slot name="headerTop"></slot>
    </div>
    <div class="flex items-center">
      <slot name="tableTitle" v-if="$slots.tableTitle"></slot>
      <TableTitle :title="title" :helpMessage="titleHelpMessage" v-if="!$slots.tableTitle && title" />
      <div :class="`${prefixCls}__toolbar`">
        <slot name="toolbar"></slot>
        <a-divider type="vertical" v-if="$slots.toolbar && showTableSetting" />
        <TableSettingComponent :setting="tableSetting" v-if="showTableSetting" @columns-change="handleColumnChange" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { ColumnChangeParam, TableSetting } from '../types/table'
import TableSettingComponent from './settings/index.vue'
import TableTitle from './TableTitle.vue'

defineProps({
  title: {
    type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
  },
  tableSetting: {
    type: Object as PropType<TableSetting>,
  },
  showTableSetting: {
    type: Boolean,
  },
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
})
const emit = defineEmits(['columns-change'])
const prefixCls = 'table-header'
function handleColumnChange(data: ColumnChangeParam[]) {
  emit('columns-change', data)
}
</script>
<style lang="less">
  @prefix-cls: ~'table-header';

  .@{prefix-cls} {
    &__toolbar {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>
