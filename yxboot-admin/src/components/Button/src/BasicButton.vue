<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <Icon :icon="preIcon" v-if="preIcon" :size="iconSize" />
      <slot v-bind="data || {}"></slot>
      <Icon :icon="postIcon" v-if="postIcon" :size="iconSize" />
    </template>
  </Button>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'AButton',
    inheritAttrs: false
  })
</script>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue'
  import { buttonProps } from './props'

  const attrs = useAttrs()
  const props = defineProps(buttonProps)

  const getButtonClass = computed(() => {
    const { color, disabled } = props
    return [
      {
        [`ant-btn-${color}`]: !!color,
        [`is-disabled`]: disabled,
        center: true
      }
    ]
  })

  const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
</script>
<style lang="less" scoped>
  .center {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
