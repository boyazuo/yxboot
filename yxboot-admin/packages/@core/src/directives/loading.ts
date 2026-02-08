import type { Directive } from 'vue';

/**
 * v-loading 指令：绑定布尔值，为 true 时在元素上添加 data-loading 属性，便于样式或子组件展示加载状态
 * 具体 UI（如遮罩、spinner）由应用层通过 CSS 或适配器实现
 */
export const loading: Directive = {
  mounted(el, binding) {
    const value = !!binding.value;
    el.setAttribute('data-loading', value ? 'true' : 'false');
  },
  updated(el, binding) {
    const value = !!binding.value;
    el.setAttribute('data-loading', value ? 'true' : 'false');
  },
};
