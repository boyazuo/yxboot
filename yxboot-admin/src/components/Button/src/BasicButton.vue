<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <Icon :icon="preIcon" v-if="preIcon" :size="iconSize" />
      <slot v-bind="data || {}"></slot>
      <Icon :icon="postIcon" v-if="postIcon" :size="iconSize" />
    </template>
  </Button>
</template>
<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { ComponentOptionsMixin, computed, unref } from 'vue'
import { buttonProps } from './props'

defineOptions({
  name: 'AButton',
  extends: Button as ComponentOptionsMixin,
  inheritAttrs: false,
})

const attrs = useAttrs()
const props = defineProps(buttonProps)

const getButtonClass = computed(() => {
  const { color, disabled } = props
  return [
    {
      [`ant-btn-${color}`]: !!color,
      'is-disabled': disabled,
      center: true,
    },
  ]
})

const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
</script>
<style lang="less" scoped>
  .center {
    display: inline-block;
    justify-content: flex-start;
    align-items: center;
  }
</style>
