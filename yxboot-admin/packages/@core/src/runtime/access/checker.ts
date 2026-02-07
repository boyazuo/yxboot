/**
 * 权限检查器
 */
import { useUserStore } from '../store/user';

/**
 * 检查权限
 * @param permission 权限标识
 * @returns 是否有权限
 */
export function hasPermission(permission: string | string[]): boolean {
  const userStore = useUserStore();

  if (Array.isArray(permission)) {
    return permission.some((p) => userStore.hasPermission(p));
  }

  return userStore.hasPermission(permission);
}

/**
 * 检查角色
 * @param role 角色标识
 * @returns 是否有角色
 */
export function hasRole(role: string | string[]): boolean {
  const userStore = useUserStore();

  if (Array.isArray(role)) {
    return role.some((r) => userStore.hasRole(r));
  }

  return userStore.hasRole(role);
}

/**
 * 检查是否有所有权限
 * @param permissions 权限列表
 * @returns 是否有所有权限
 */
export function hasAllPermissions(permissions: string[]): boolean {
  const userStore = useUserStore();
  return permissions.every((p) => userStore.hasPermission(p));
}

/**
 * 检查是否有任一权限
 * @param permissions 权限列表
 * @returns 是否有任一权限
 */
export function hasAnyPermission(permissions: string[]): boolean {
  const userStore = useUserStore();
  return permissions.some((p) => userStore.hasPermission(p));
}
