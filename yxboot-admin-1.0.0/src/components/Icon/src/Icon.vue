<template>
  <SvgIcon :size="size" :name="getSvgIcon" v-if="isSvgIcon" :class="[$attrs.class, 'anticon']" :spin="spin" />
  <span
    v-else
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  ></span>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { CSSProperties, computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { isString } from '@/utils/is'
import { propTypes } from '@/utils/propTypes'
import SvgIcon from './SvgIcon.vue'

const SVG_END_WITH_FLAG = '|svg'

const props = defineProps({
  // icon name
  icon: propTypes.string,
  // icon color
  color: propTypes.string,
  // icon size
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
  spin: propTypes.bool.def(false),
  prefix: propTypes.string.def(''),
})

const elRef = ref<HTMLElement | null>(null)

const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))
const getSvgIcon = computed(() => props.icon?.replace(SVG_END_WITH_FLAG, ''))
const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`)

const update = async () => {
  if (unref(isSvgIcon)) return

  const el = unref(elRef)
  if (!el) return

  await nextTick()
  const icon = unref(getIconRef)
  if (!icon) return

  // 使用 iconify-icon 元素
  const iconifyIcon = document.createElement('iconify-icon')
  iconifyIcon.setAttribute('icon', icon)

  // 清空容器并添加新的 iconify-icon 元素
  el.innerHTML = ''
  el.appendChild(iconifyIcon)
}

const getWrapStyle = computed((): CSSProperties => {
  const { size, color } = props
  let fs = size
  if (isString(size)) {
    fs = parseInt(size as string, 10)
  }

  return {
    fontSize: `${fs}px`,
    color: color,
    display: 'inline-flex',
  }
})

watch(() => props.icon, update, { flush: 'post' })

onMounted(update)
</script>
<style lang="less" scope>
  @import url('@/styles/color.less');

  .app-iconify {
    display: inline-flex;
    align-items: center;
    vertical-align: -0.125em;

    &-spin {
      animation: loadingCircle 1s infinite linear;
    }
  }
</style>
