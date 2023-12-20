<template>
  <a-form v-bind="getBindValue" :class="getFormClass" ref="formElRef" :model="formModel">
    <a-row>
      <template v-for="schema in getSchema" :key="schema.field">
        <a-col v-bind="getColProps(schema)" v-if="getShow(schema).isIfShow" v-show="getShow(schema).isShow">
          <a-form-item :label="schema.label" :name="schema.field" :rules="schema.rules" v-bind="getItemProps(schema)">
            <template v-if="!getSchemaSlot(schema)">
              <!--动态渲染表单组件-->
              <component
                class="componentStyle"
                v-bind="getComponentProps(schema)"
                :is="getComponent(schema)"
                v-model:value="formModel[schema.field]"
              />
            </template>
            <template v-else>
              <slot :name="getSchemaSlot(schema)" v-bind="getSlotScope(schema)"></slot>
            </template>
          </a-form-item>
        </a-col>
      </template>
      <a-col v-bind="actionColOpt" v-if="getProps.showActionButtonGroup">
        <a-form-item>
          <slot name="resetBefore"></slot>
          <a-button
            type="default"
            class="mr-2"
            v-bind="getProps.resetButtonOptions"
            @click="resetFields"
            v-if="showResetButton"
          >
            {{ getProps.resetButtonOptions?.text ?? '重置' }}
          </a-button>
          <slot name="submitBefore"></slot>

          <a-button type="primary" v-bind="getProps.submitButtonOptions" @click="handleSubmit" v-if="showSubmitButton">
            {{ getProps.submitButtonOptions?.text ?? '查询' }}
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
  import { deepMerge } from '@/utils'
  import { dateUtil } from '@/utils/dateUtil'
  import { isBoolean, isFunction } from '@/utils/is'
  import { Ref, computed, onMounted, reactive, ref, unref, watch } from 'vue'
  import { dateItemType } from './helper'
  import { basicProps } from './props'
  import type { FormActionType, FormProps, FormSchema } from './types/form'
  import type { ColEx } from './types/index'

  import { useDebounceFn } from '@vueuse/core'
  import { cloneDeep } from 'lodash-es'
  import { componentMap } from './componentMap'
  import { createPlaceholderMessage } from './helper'
  import { useFormEvents } from './hooks/useFormEvents'
  import { useFormValues } from './hooks/useFormValues'
  import { useItemLabelWidth } from './hooks/useLabelWidth'

  const props = defineProps(basicProps)
  const emit = defineEmits(['advanced-change', 'reset', 'submit', 'register', 'field-value-change'])
  const attrs = useAttrs()
  const formModel = reactive<Recordable>({})

  const defaultValueRef = ref<Recordable>({})
  const isInitedDefaultRef = ref(false)
  const propsRef = ref<Partial<FormProps>>({})
  const schemaRef = ref<Nullable<FormSchema[]>>(null)
  const formElRef = ref<Nullable<FormActionType>>(null)

  // Get the basic configuration of the form
  const getProps = computed((): FormProps => {
    return { ...props, ...unref(propsRef) } as FormProps
  })

  // ['from', { from--compact: true }]
  const getFormClass = computed(() => {
    return [
      'form',
      {
        ['form--compact']: unref(getProps).compact
      }
    ]
  })

  // get attrs props
  const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) }) as Recordable)

  // get isShow state
  const getShow = (schema) => {
    const { show, ifShow } = schema
    let isShow = true
    let isIfShow = true

    if (isBoolean(show)) {
      isShow = show
    }
    if (isBoolean(ifShow)) {
      isIfShow = ifShow
    }
    if (isFunction(show)) {
      isShow = show(unref(formModel))
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(unref(formModel))
    }
    return { isShow, isIfShow }
  }

  const getComponent = (schema) => {
    return componentMap.get(schema.component)
  }
  const getSchemaSlot = (schema) => {
    return schema.slot
  }
  const getSlotScope = (schema) => {
    return {
      schema: schema,
      model: unref(formModel)
    }
  }

  const getComponentProps = (schema) => {
    const compProps = schema.componentProps ?? {}
    const component = schema.component
    return {
      clearable: true,
      placeholder: createPlaceholderMessage(unref(component)) + schema.label,
      ...compProps
    }
  }

  const getSchema = computed((): FormSchema[] => {
    const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any)
    for (const schema of schemas) {
      const { defaultValue, component } = schema
      // handle date type
      if (defaultValue && dateItemType.includes(component)) {
        // if no Array
        if (!Array.isArray(defaultValue)) {
          schema.defaultValue = dateUtil(defaultValue)
        } else {
          const def: any[] = []
          defaultValue.forEach((item) => {
            def.push(dateUtil(item))
          })
          schema.defaultValue = def
        }
      }
    }
    // handle advaced button
    // if showAdvancedButton remove Divider
    if (unref(getProps).showAdvancedButton) {
      return cloneDeep(schemas.filter((schema) => schema.component !== 'Divider') as FormSchema[])
    } else {
      return cloneDeep(schemas as FormSchema[])
    }
  })

  const { handleFormValues, initDefault } = useFormValues({
    getProps,
    defaultValueRef,
    getSchema,
    formModel
  })

  const {
    handleSubmit,
    setFieldsValue,
    clearValidate,
    validate,
    validateFields,
    getFieldsValue,
    resetFields,
    updateSchema,
    resetSchema,
    removeSchemaByFiled,
    appendSchemaByField
  } = useFormEvents({
    emit,
    getProps,
    formModel,
    getSchema,
    defaultValueRef,
    formElRef: formElRef as Ref<FormActionType>,
    schemaRef: schemaRef as Ref<FormSchema[]>,
    handleFormValues
  })

  watch(
    () => unref(getProps).model,
    () => {
      const { model } = unref(getProps)
      if (!model) return
      setFieldsValue(model)
    },
    {
      immediate: true
    }
  )

  watch(
    () => unref(getProps).schemas,
    (schemas) => {
      resetSchema(schemas ?? [])
    }
  )

  watch(
    () => getSchema.value,
    (schema) => {
      if (unref(isInitedDefaultRef)) {
        return
      }
      if (schema?.length) {
        initDefault()
        isInitedDefaultRef.value = true
      }
    }
  )

  watch(
    () => formModel,
    useDebounceFn(() => {
      unref(getProps).submitOnChange && handleSubmit()
    }, 300),
    { deep: true }
  )

  async function setProps(formProps: Partial<FormProps>): Promise<void> {
    propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
  }

  const getColProps = (schema) => {
    const { colProps = {} } = schema
    const { baseColProps = { span: 24 } } = unref(getProps)
    return { ...baseColProps, ...colProps }
  }

  const actionColOpt = computed(() => {
    const { showAdvancedButton, actionSpan, actionColOptions } = unref(getProps)
    const advancedSpanObj = showAdvancedButton ? { span: actionSpan < 6 ? 24 : actionSpan } : {}
    const actionColOpt: Partial<ColEx> = {
      style: { textAlign: 'right', flex: '1 0 auto' },
      span: showAdvancedButton ? 6 : 4,
      ...advancedSpanObj,
      ...actionColOptions
    }
    return actionColOpt
  })

  const getItemProps = (schema) => {
    const itemLabelWidthProp = useItemLabelWidth(schema, getProps)
    const { labelCol, wrapperCol } = unref(itemLabelWidthProp)
    return {
      labelCol,
      wrapperCol,
      required: schema.required ?? false
    }
  }

  const formActionType: Partial<FormActionType> = {
    getFieldsValue,
    setFieldsValue,
    resetFields,
    setProps,
    updateSchema,
    resetSchema,
    removeSchemaByFiled,
    appendSchemaByField,
    clearValidate,
    validateFields,
    validate,
    submit: handleSubmit
  }

  onMounted(() => {
    initDefault()
    emit('register', formActionType)
  })
</script>
<style lang="less" scoped>
  .form {
    padding: 12px 10px 6px;
    margin-bottom: 16px;
    //background-color: #fff;
    border-radius: 2px;

    .ant-form-item {
      // margin-bottom: 8px;
      .componentStyle {
        &.ant-input-number,
        &.ant-input-number-group-wrapper,
        &.ant-picker {
          width: 100%;
        }

        &.ant-checkbox-group {
          display: flex;
          flex-flow: column;
        }
      }
    }

    &--compact {
      .ant-form-item {
        margin-bottom: 8px;
      }
    }
  }
</style>
