/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const MONTH_FORMAT = 'YYYY-MM'

export function formatDateTime(date: dayjs.ConfigType | undefined = undefined, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatDate(date: dayjs.ConfigType | undefined = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatMonth(date: dayjs.ConfigType | undefined = undefined, format = MONTH_FORMAT): string {
  return dayjs(date).format(format)
}

export const dateUtil = dayjs
