import type { ButtonProps } from '@/components/Button'
import { propTypes } from '@/utils/propTypes'
import type { PropType } from 'vue'
import { FormSchema } from './types/form'
export const basicProps = {
  model: {
    type: Object as PropType<Recordable>,
    default: {}
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80
  },
  compact: propTypes.bool,
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => []
  },
  //布局方式
  layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),

  //是否展示为行内表单
  inline: {
    type: Boolean,
    default: false
  },
  //大小
  size: {
    type: String,
    default: 'medium'
  },
  //标签位置
  labelPlacement: {
    type: String,
    default: 'left'
  },

  //是否显示操作按钮（查询/重置）
  showActionButtonGroup: propTypes.bool.def(true),
  // 显示重置按钮
  showResetButton: propTypes.bool.def(true),
  //重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 显示确认按钮
  showSubmitButton: propTypes.bool.def(true),
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  //展开收起按钮
  showAdvancedButton: propTypes.bool.def(true),
  // 确认按钮文字
  submitButtonText: {
    type: String,
    default: '查询'
  },
  //重置按钮文字
  resetButtonText: {
    type: String,
    default: '重置'
  },
  actionSpan: {
    type: Number,
    default: 0
  },
  // 在INPUT组件上单击回车时，是否自动提交
  autoSubmitOnEnter: propTypes.bool.def(false),
  submitOnReset: propTypes.bool,
  submitOnChange: propTypes.bool
}
