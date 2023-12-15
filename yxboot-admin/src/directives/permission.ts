/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.TEST"
 */
import { usePermission } from '@/hooks/web/usePermission'
import type { App, Directive, DirectiveBinding } from 'vue'

function isAuth(el: Element, binding: any) {
  const { hasPermission } = usePermission()
  // console.log('value123====》', binding.value)
  // console.log('!menuss(value)====》', menuCode.code)
  // console.log('判断==>', menuCode.code.indexOf(binding.value[0]) !== -1)
  const value: null = binding.value
  if (!value) return
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el)
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding)
}

const authDirective: Directive = {
  mounted
}

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective)
}

export default authDirective
