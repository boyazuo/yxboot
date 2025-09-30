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
import { computed, PropType } from 'vue'
import { HandlerEnum } from '@/enums/handlerEnum'
import { useAppConfig } from '@/hooks/config'

const { baseHandler } = useAppConfig()

defineOptions({ name: 'SwitchItem' })

const props = defineProps({
  event: {
    type: Number as PropType<HandlerEnum>,
  },
  disabled: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  def: {
    type: Boolean,
  },
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
