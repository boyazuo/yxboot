<script setup lang="ts">
import { computed } from 'vue';
import { Icon as IconifyIcon } from '@iconify/vue';

/**
 * 图标组件：与 vben-admin 对齐，统一使用 @iconify/vue
 * - icon 为 "prefix:name" 格式时使用 Iconify（如 ep:fold、lucide:user）
 * - 兼容内置语义名：fold、expand、arrow-left、arrow-right（映射为 ep:fold/ep:expand/ep:arrow-left/ep:arrow-right）
 * - 支持默认插槽自定义内容
 */
const BUILTIN_TO_ICONIFY: Record<string, string> = {
  fold: 'ep:fold',
  expand: 'ep:expand',
  'arrow-left': 'ep:arrow-left',
  'arrow-right': 'ep:arrow-right',
};

interface Props {
  /** Iconify 图标名（如 ep:fold、lucide:user）或内置名 fold/expand/arrow-left/arrow-right */
  icon?: string;
  /** 尺寸 */
  size?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  size: 16,
});

const sizeStyle = computed(() => {
  const s = props.size;
  return typeof s === 'number' ? `${s}px` : s;
});

const iconifyName = computed(() => {
  if (!props.icon) return undefined;
  return BUILTIN_TO_ICONIFY[props.icon] ?? props.icon;
});
</script>

<template>
  <span
    v-if="iconifyName"
    class="core-icon inline-flex shrink-0 items-center justify-center [&_svg]:block"
    :class="$attrs.class"
    :style="{ width: sizeStyle, height: sizeStyle }"
  >
    <IconifyIcon :icon="iconifyName" :width="sizeStyle" :height="sizeStyle" />
  </span>
  <span
    v-else-if="$slots.default"
    class="core-icon inline-flex shrink-0 items-center justify-center"
    :class="$attrs.class"
    :style="{ width: sizeStyle, height: sizeStyle }"
  >
    <slot />
  </span>
</template>
