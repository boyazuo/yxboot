import type { Component } from 'vue'
import type { ComponentType } from './types/index'

/**
 * Component list, register here to setting it in the form
 */
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect
} from 'ant-design-vue'
import { IconPicker } from '../../Icon'
import ApiSelect from './components/ApiSelect.vue'
import ApiTreeSelect from './components/ApiTreeSelect.vue'
import Dict from './components/Dict.vue'
import UploadImg from './components/UploadImg.vue'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', Input)
componentMap.set('InputGroup', Input.Group)
componentMap.set('InputPassword', Input.Password)
componentMap.set('InputSearch', Input.Search)
componentMap.set('InputTextArea', Input.TextArea)
componentMap.set('InputNumber', InputNumber)
componentMap.set('AutoComplete', AutoComplete)

componentMap.set('Select', Select)
componentMap.set('ApiSelect', ApiSelect)
componentMap.set('Dict', Dict)
componentMap.set('TreeSelect', TreeSelect)
componentMap.set('ApiTreeSelect', ApiTreeSelect)
componentMap.set('Switch', Switch)
componentMap.set('RadioGroup', Radio.Group)
componentMap.set('Checkbox', Checkbox)
componentMap.set('CheckboxGroup', Checkbox.Group)
componentMap.set('Cascader', Cascader)
componentMap.set('Slider', Slider)
componentMap.set('Rate', Rate)

componentMap.set('DatePicker', DatePicker)
componentMap.set('MonthPicker', DatePicker.MonthPicker)
componentMap.set('RangePicker', DatePicker.RangePicker)
componentMap.set('WeekPicker', DatePicker.WeekPicker)
componentMap.set('TimePicker', TimePicker)
componentMap.set('Divider', Divider)
componentMap.set('IconPicker', IconPicker)

componentMap.set('UploadImg', UploadImg)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
