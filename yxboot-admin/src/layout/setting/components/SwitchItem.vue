<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <a-switch
      v-bind="getBindValue"
      @change="handleChange"
      :disabled="disabled"
      checkedChildren="开"
      unCheckedChildren="关"
    />
  </div>
</template>
<script setup lang="ts">
  import { HandlerEnum } from '../enum'
  import { baseHandler } from '../handler'

  const props = defineProps({
    event: {
      type: Number as PropType<HandlerEnum>
    },
    disabled: {
      type: Boolean
    },
    title: {
      type: String
    },
    def: {
      type: Boolean
    }
  })
  const prefixCls = 'setting-switch-item'

  const getBindValue = computed(() => {
    return props.def ? { checked: props.def } : {}
  })

  function handleChange(e: ChangeEvent) {
    props.event && baseHandler(props.event, e)
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'setting-switch-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>
