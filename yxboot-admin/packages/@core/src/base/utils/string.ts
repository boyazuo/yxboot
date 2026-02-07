/**
 * 字符串工具函数
 */

/**
 * 判断字符串是否为空
 * @param str 字符串
 * @returns 是否为空
 */
export function isEmpty(str: string | null | undefined): boolean {
  return str === null || str === undefined || str.trim() === '';
}

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (isEmpty(str)) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 驼峰转下划线
 * @param str 字符串
 * @returns 下划线格式的字符串
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

/**
 * 下划线转驼峰
 * @param str 字符串
 * @returns 驼峰格式的字符串
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

/**
 * 生成随机字符串
 * @param length 长度
 * @returns 随机字符串
 */
export function randomString(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 截取字符串
 * @param str 字符串
 * @param length 长度
 * @param suffix 后缀
 * @returns 截取后的字符串
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}
