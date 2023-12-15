/**
 * 一些常用的表单验证规则
 * required 验证是否为必填项
 * pattern 自定义正则验证
 * min & max 验证最小和最大长度
 * validator 自定义验证方法 参数 (rule, value, callback), 需返回 callback() 或 callback(new Error('提示信息'))
 * message 提示信息
 * trigger 验证方式 blur为失去焦点时验证 change为改变时验证
 *
 * 更详细的规则看：https://blog.csdn.net/dreamingbaobei3/article/details/122727229
 */

export const required = (message: string, trigger: 'blur' | 'change' | ['change', 'blur'] = ['change', 'blur']) => ({
  required: true,
  message,
  trigger
})

export const commonRegExp = {
  code: {
    pattern: /^[A-Za-z0-9_]+$/,
    message: '只能包含数字、字母、下划线',
    trigger: 'change'
  },
  length: (min: number, max: number) => ({
    pattern: new RegExp(`^.{${min},${max}}$`),
    message: `长度应在${min}~${max}位之间`,
    trigger: 'blur'
  }),
  phone: {
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入正确的的11位手机号码',
    trigger: 'blur'
  },
  email: {
    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: '请输入正确的邮箱',
    trigger: 'blur'
  }
}

export const commonRules: any = {
  phone: [commonRegExp.phone],
  email: [commonRegExp.email],
  code1: [commonRegExp.code, commonRegExp.length(1, 20)],
  code4: [commonRegExp.code, commonRegExp.length(4, 20)],
  code6: [commonRegExp.code, commonRegExp.length(6, 20)]
}
