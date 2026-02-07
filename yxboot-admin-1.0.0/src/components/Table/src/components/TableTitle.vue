<template>
  <BasicTitle :class="prefixCls" v-if="getTitle" :helpMessage="helpMessage">
    {{ getTitle }}
  </BasicTitle>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import { BasicTitle } from '@/components/Basic/index'
import { isFunction } from '@/utils/is'

const props = defineProps({
  title: {
    type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
  },
  getSelectRows: {
    type: Function as PropType<() => Recordable[]>,
  },
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },
})
const prefixCls = 'table-title'

const getTitle = computed(() => {
  const { title, getSelectRows = () => {} } = props
  let tit = title

  if (isFunction(title)) {
    tit = title({
      selectRows: getSelectRows(),
    })
  }
  return tit
})
</script>
<style lang="less">
  @prefix-cls: ~'table-title';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
</style>
