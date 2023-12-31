import type { UnwrapRef } from 'vue'
import { computed, getCurrentInstance, reactive, readonly, watchEffect } from 'vue'

import { SelectValue } from 'ant-design-vue/es/select'
import { isEqual } from 'lodash-es'

export function useRuleFormItem<T extends Recordable>(props: T, key: keyof T = 'value', changeEvent = 'change') {
  const instance = getCurrentInstance()
  const emit = instance?.emit

  const innerState = reactive({
    value: props[key]
  })

  const defaultState = readonly(innerState)

  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T]
  }

  watchEffect(() => {
    innerState.value = props[key]
  })

  const state: WritableComputedRef<SelectValue> = computed({
    get() {
      return innerState.value
    },
    set(value) {
      if (isEqual(value, defaultState.value)) return
      innerState.value = value as T[keyof T]
      emit?.(changeEvent, value)
    }
  })

  return [state, setState, defaultState]
}
