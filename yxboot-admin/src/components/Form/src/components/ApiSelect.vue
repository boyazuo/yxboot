<template>
  <Select @dropdown-visible-change="handleFetch" v-bind="attrs" :options="getOptions" v-model:value="state">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </Select>
</template>
<script lang="ts">
  import { isFunction } from '@/utils/is'
  import { propTypes } from '@/utils/propTypes'
  import { Select } from 'ant-design-vue'
  import _, { get } from 'lodash-es'
  import { PropType, computed, defineComponent, ref, unref, useAttrs, watchEffect } from 'vue'
  import { useRuleFormItem } from '../hooks/useFormItem'

  type OptionsItem = { label: string; value: string; disabled?: boolean }

  export default defineComponent({
    name: 'ApiSelect',
    components: {
      Select
    },
    inheritAttrs: false,
    props: {
      value: propTypes.oneOfType([propTypes.object, propTypes.number, propTypes.string, propTypes.array]),
      numberToString: propTypes.bool,
      api: {
        type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
        default: null
      },
      // api params
      params: {
        type: Object as PropType<Recordable>,
        default: () => {}
      },
      // support xxx.xxx.xx
      resultField: propTypes.string.def(''),
      apiResultFormat: propTypes.func,
      labelField: propTypes.string.def('label'),
      valueField: propTypes.string.def('value'),
      immediate: propTypes.bool.def(true)
    },
    emits: ['options-change', 'change'],
    setup(props, { emit }) {
      const options = ref<OptionsItem[]>([])
      const loading = ref(false)
      const isFirstLoad = ref(true)
      const attrs = useAttrs()

      const [state] = useRuleFormItem(props)

      const getOptions = computed(() => {
        const { labelField, valueField, numberToString } = props

        return unref(options).reduce((prev, next: Recordable) => {
          if (next) {
            const value = next[valueField]
            prev.push({
              label: _.isFunction(labelField) ? labelField(next) : next[labelField],
              value: numberToString ? `${value}` : value
            })
          }
          return prev
        }, [] as OptionsItem[])
      })

      watchEffect(() => {
        props.immediate && fetch()
      })

      async function fetch() {
        const api = props.api
        if (!api || !isFunction(api)) return

        try {
          loading.value = true
          const res = await api(props.params)
          if (Array.isArray(res)) {
            options.value = res
            emitChange()
            return
          }
          if (props.resultField) {
            options.value = get(res, props.resultField) || []
          } else if (props.apiResultFormat) {
            options.value = props.apiResultFormat(res) || []
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

      return { state, attrs, getOptions, loading, handleFetch }
    }
  })
</script>
