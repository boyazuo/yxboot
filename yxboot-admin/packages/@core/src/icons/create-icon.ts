import { defineComponent, h } from 'vue';
import { Icon } from '@iconify/vue';

/**
 * 创建 Iconify 图标组件（与 vben-admin @vben-core/icons 对齐）
 */
export function createIconifyIcon(icon: string) {
  return defineComponent({
    name: `Icon-${icon}`,
    setup(_props, { attrs }) {
      return () => h(Icon, { icon, ...attrs });
    },
  });
}
