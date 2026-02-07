/**
 * 权限指令 v-permission
 */
import type { Directive } from 'vue';
import { hasPermission } from '../runtime/access';

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding;

    if (value) {
      const hasAuth = hasPermission(value);
      if (!hasAuth) {
        el.parentNode?.removeChild(el);
      }
    }
  },
};
