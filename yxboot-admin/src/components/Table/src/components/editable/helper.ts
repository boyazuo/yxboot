import { ComponentType } from '../../types/componentType'

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('AutoComplete')) {
    return '请选择'
  }
  if (component.includes('Picker')) {
    return '请选择'
  }

  if (
    component.includes('Select') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch') ||
    component.includes('DatePicker') ||
    component.includes('TimePicker')
  ) {
    return '请选择'
  }
  return ''
}
