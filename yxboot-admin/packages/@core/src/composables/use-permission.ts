/**
 * 组合式函数 - usePermission
 */
import { hasPermission, hasRole, hasAllPermissions, hasAnyPermission } from '../runtime/access';

export function usePermission() {
  return {
    hasPermission,
    hasRole,
    hasAllPermissions,
    hasAnyPermission,
  };
}
