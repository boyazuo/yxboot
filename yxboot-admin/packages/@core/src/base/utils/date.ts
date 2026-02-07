/**
 * 日期时间工具函数
 */
import dayjs from 'dayjs';

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  return dayjs(date).format(format);
}

/**
 * 获取当前时间戳
 * @returns 时间戳（毫秒）
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * 判断日期是否过期
 * @param date 日期
 * @returns 是否过期
 */
export function isExpired(date: string | number | Date): boolean {
  return dayjs(date).isBefore(dayjs());
}

/**
 * 计算时间差
 * @param start 开始时间
 * @param end 结束时间
 * @param unit 单位
 * @returns 时间差
 */
export function diffTime(
  start: string | number | Date,
  end: string | number | Date,
  unit: 'day' | 'hour' | 'minute' | 'second' = 'second',
): number {
  return dayjs(end).diff(dayjs(start), unit);
}
