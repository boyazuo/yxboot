import { usePermissionStoreWithOut } from '@/store/modules/permission'

export function usePermission() {
  const permissionStore = usePermissionStoreWithOut()

  function hasPermission(code) {
    if (!code) return true
    const menuCode = permissionStore.getMenusCode
    return menuCode.includes(code)
  }

  return {
    hasPermission,
  }
}
