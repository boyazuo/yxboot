import type { ButtonProps as AntdButtonProps } from '@/components/Button'
import type { NamePath, RuleObject } from 'ant-design-vue/lib/form/interface'
import type { RowProps } from 'ant-design-vue/lib/grid/Row'
import type { CSSProperties } from 'vue'
import { FormItem } from './formItem'
import { ColEx, ComponentType } from './index'

export type FieldMapToTime = [string, [string, string], string?][]

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur']
}

export interface ButtonProps extends AntdButtonProps {
  text?: string
}

export type RegisterFn = (formInstance: FormActionType) => void

export type UseFormReturnType = [RegisterFn, FormActionType]

export interface FormSchema {
  field: string
  label: string
  labelWidth?: string | number
  disabledLabelWidth?: boolean
  helpMessage?: string
  defaultValue?: any
  suffix?: string
  rules?: Rule[]
  component: ComponentType
  componentProps?: object
  required?: boolean
  message?: string
  itemProps?: Partial<FormItem>
  colProps?: Partial<ColEx>

  ifShow?: boolean | ((renderCallbackParams) => boolean)
  show?: boolean | ((renderCallbackParams) => boolean)
  readonly?: boolean | ((renderCallbackParams) => boolean)
  disabled?: boolean | ((renderCallbackParams) => boolean)

  slot?: string
}

export interface FormProps {
  model?: Recordable
  labelWidth?: number | string
  schemas?: FormSchema[]
  // Compact mode for search forms
  compact?: boolean
  inline: boolean
  layout?: string
  size: string
  labelPlacement: string
  isFull: boolean
  // Row configuration for the entire form
  rowProps?: RowProps
  // Col configuration for the entire form
  labelCol?: Partial<ColEx>
  // Col configuration for the entire form
  wrapperCol?: Partial<ColEx>
  // General row style
  baseRowStyle?: CSSProperties
  // General col configuration
  baseColProps?: Partial<ColEx>
  // Time interval fields are mapped into multiple
  fieldMapToTime?: FieldMapToTime
  showActionButtonGroup?: boolean
  showResetButton?: boolean
  resetButtonOptions?: Partial<ButtonProps>
  showSubmitButton?: boolean
  showAdvancedButton?: boolean
  submitButtonOptions?: Partial<ButtonProps>
  resetButtonText?: string
  submitButtonText?: string
  // Operation column configuration
  actionColOptions?: Partial<ColEx>
  actionSpan: number
  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  transformDateFunc?: (date: any) => string
  submitOnReset?: boolean
  submitOnChange?: boolean
}

export interface FormActionType {
  submit: () => Promise<void | any>
  setFieldsValue: (<T>(values: T) => Promise<void>) | ((values: Recordable<any>) => Promise<void>)
  resetFields: () => Promise<void | any>
  getFieldsValue: () => Recordable
  clearValidate: (name?: string | string[]) => Promise<void | any>
  setProps: (formProps: Partial<FormProps>) => Promise<void | any>
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void | any>
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void | any>
  validateFields: (nameList?: NamePath[]) => Promise<void | any>
  validate: (nameList?: NamePath[]) => Promise<void | any>
  removeSchemaByFiled: (field: string | string[]) => Promise<void | any>
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void | any>
}
