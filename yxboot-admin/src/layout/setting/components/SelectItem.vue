<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <a-select
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      @change="handleChange"
      :disabled="disabled"
      size="small"
      :options="options"
    />
  </div>
</template>
<script setup lang="ts">
  import { HandlerEnum } from '@/enums/handlerEnum'
  import { useAppConfig } from '@/hooks/config'
  import { PropType, computed } from 'vue'

  const { baseHandler } = useAppConfig()

  defineOptions({ name: 'SelectItem' })

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
      type: [String, Number] as PropType<string | number>
    },
    initValue: {
      type: [String, Number] as PropType<string | number>
    },
    options: {
      type: Array as PropType<LabelValueOptions>,
      default: () => []
    }
  })
  const prefixCls = 'setting-select-item'
  const getBindValue = computed(() => {
    return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {}
  })

  function handleChange(e: ChangeEvent) {
    props.event && baseHandler(props.event, e)
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'setting-select-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-select {
      width: 126px;
    }
  }
</style>
