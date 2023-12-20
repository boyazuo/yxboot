<template>
  <a-select @dropdown-visible-change="handleFetch" v-bind="attrs" :options="getOptions" :value="state">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </a-select>
</template>
<script setup lang="ts">
  import { isFunction } from '@/utils/is'
  import { propTypes } from '@/utils/propTypes'
  import { get } from 'lodash-es'
  import { PropType, computed, ref, unref, useAttrs, watchEffect } from 'vue'
  import { useDict } from '../hooks/useDict'
  import { useRuleFormItem } from '../hooks/useFormItem'

  type OptionsItem = { label: string; value: string; disabled?: boolean }

  defineOptions({
    inheritAttrs: false
  })
  const props = defineProps({
    value: propTypes.oneOfType([propTypes.object, propTypes.number, propTypes.string, propTypes.array]),
    numberToString: propTypes.bool,
    code: propTypes.string.def(''),
    // api params
    params: {
      type: Object as PropType<Recordable>,
      default: () => {}
    },
    // support xxx.xxx.xx
    resultField: propTypes.string.def('data'),
    apiResultFormat: propTypes.func,
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    immediate: propTypes.bool.def(true)
  })
  const emit = defineEmits(['options-change', 'change'])
  const options = ref<OptionsItem[]>([])
  const loading = ref(false)
  const isFirstLoad = ref(true)
  const attrs = useAttrs()

  const [state] = useRuleFormItem(props)

  const getOptions = computed(() => {
    const { code, labelField, valueField } = props

    return unref(options).reduce((prev, next: Recordable) => {
      if (next) {
        const value = next[valueField as string]
        prev.push({
          label: next[labelField as string],
          value: code + '@' + value
        })
      }
      return prev
    }, [] as OptionsItem[])
  })

  watchEffect(() => {
    props.immediate && fetch()
  })

  async function fetch() {
    const { api } = useDict()
    if (!api || !isFunction(api)) return

    try {
      loading.value = true
      const res = await api({ dictCode: props.code })
      if (Array.isArray(res)) {
        options.value = res
        emitChange()
        return
      }
      if (props.resultField) {
        options.value = get(res, props.resultField as string) || []
      } else if (props.apiResultFormat) {
        options.value = (props.apiResultFormat as Function).bind(null, res) || []
      }
      emitChange()
    } catch (error) {
      console.warn(error)
    } finally {
      loading.value = false
    }
  }

  async function handleFetch() {
    if (!props.immediate && unref(isFirstLoad)) {
      await fetch()
      isFirstLoad.value = false
    }
  }

  function emitChange() {
    emit('options-change', unref(options))
  }
</script>
