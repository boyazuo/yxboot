import _ from 'lodash-es'
import type { App, Plugin } from 'vue'
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

import { isObject } from '@/utils/is'
import { unref } from 'vue'

export const noop = () => {}

export {
  assign as _assign,
  merge as _merge,
  omit as _omit,
  clone,
  cloneDeep,
  isArray,
  isBoolean,
  isEqual,
  isFunction,
  isNumber,
  isString,
  isUndefined,
  omit,
  toString
} from 'lodash-es'

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 * 合并对象属性，将源对象中的key值，使用目标对象对应的key值覆盖
 * @param src 源对象
 * @param target 目标对象
 * @param newObject 是否返回一个新对象
 * @returns T
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}, newObject: boolean = false): T {
  let key: string
  const obj = newObject ? _.cloneDeep(src) : null
  for (key in target) {
    if (newObject) {
      obj[key] = isObject(src[key]) ? deepMerge(src[key], target[key], newObject) : (obj[key] = target[key])
    } else {
      src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
    }
  }
  return newObject ? obj : src
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

// dynamic use hook props
export function getDynamicProps<T extends Object, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path
        }))
      : undefined) as RouteRecordNormalized[]
  }
}

// 类型必须导出否则生成不了.d.ts文件

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, comp)
    if (alias) {
      app.config.globalProperties[alias] = comp
    }
  }
  return comp as T & Plugin
}

export const str2Json = (str: string) => {
  if (str) {
    const keyValuePairs = str.split(';')
    const obj = {}
    keyValuePairs.forEach((keyValue) => {
      const [key, value] = keyValue.split(':')
      obj[key.trim()] = value.trim()
    })
    return obj
  }
  return {}
}
