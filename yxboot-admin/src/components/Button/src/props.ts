export const buttonProps = {
  color: { type: String, validator: (v: string) => ['error', 'warning', 'success', ''].includes(v) },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  preIcon: { type: String },
  postIcon: { type: String },
  iconSize: { type: Number, default: 14 },
  onClick: { type: [Function, Array] as PropType<(() => any) | (() => any)[]>, default: null }
}
