import { FormSchema } from '@/components/Form'
import { BasicColumn } from '@/components/Table'
import { statusEnum } from '@/utils/formEnums'
import { commonRules, required } from '@/utils/formRules'

export const searchFormSchema: FormSchema[] = [
  { field: 'dictCode', label: '字典编码', component: 'Input' },
  { field: 'dictName', label: '字典名称', component: 'Input' },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: { allowClear: true, options: statusEnum }
  }
]

export const tableColumns: BasicColumn[] = [
  { title: '字典编码', dataIndex: 'dictCode', width: 150 },
  { title: '字典名称', dataIndex: 'dictName', width: 200 },
  { title: '字典说明', dataIndex: 'descn', minWidth: 150 },
  { title: '状态', dataIndex: 'statusDesc', width: 80 }
]

export const editFormSchema: FormSchema[] = [
  { field: 'dictId', label: '编号', component: 'InputNumber', show: false },
  {
    field: 'dictCode',
    label: '字典编码',
    component: 'Input',
    rules: [required('请输入字典编码'), ...commonRules.code4]
  },
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    rules: [required('请输入字典名称')]
  },
  { field: 'descn', label: '字典说明', component: 'InputTextArea' },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    rules: [required('请选择状态')],
    defaultValue: 1,
    componentProps: { options: statusEnum }
  }
]

export const tableColumns_dictData: BasicColumn[] = [
  { title: '字典编码', dataIndex: 'dictCode', width: 120 },
  { title: '字典标签名', dataIndex: 'label', minWidth: 200 },
  { title: '字典内容值', dataIndex: 'value', minWidth: 150 },
  { title: '排序', dataIndex: 'sort', width: 80 },
  { title: '状态', dataIndex: 'statusDesc', width: 80 }
]

export const editFormSchema_dictData: FormSchema[] = [
  { field: 'id', label: '编号', component: 'InputNumber', show: false },
  { field: 'dictCode', label: '字典编码', component: 'Input', componentProps: { disabled: true } },
  {
    field: 'label',
    label: '字典标签名',
    component: 'Input',
    rules: [required('请输入字典标签名')]
  },
  {
    field: 'value',
    label: '字典内容值',
    component: 'Input',
    rules: [required('请输入字典内容值'), ...commonRules.code1]
  },
  { field: 'sort', label: '排序', component: 'InputNumber', componentProps: { precision: 0 } },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    rules: [required('请选择状态')],
    defaultValue: 1,
    componentProps: { options: statusEnum }
  }
]

export const editFormSchema_dictDataBatch: FormSchema[] = [
  {
    field: 'label',
    label: '字典标签名',
    component: 'Input',
    rules: [required('请输入字典标签名')],
    colProps: { span: 11 }
  },
  {
    field: 'value',
    label: '字典内容值',
    component: 'Input',
    rules: [required('请输入字典内容值'), ...commonRules.code1],
    colProps: { span: 11 }
  },
  {
    field: 'operation',
    label: '操作列',
    component: 'Input',
    slot: 'operation',
    colProps: { span: 2 },
    labelWidth: '0px'
  }
]

export const inspectDictData = (allDictData, params) => {
  const { id: _id, dictCode: _dictCode, label: _label, value: _value } = params
  let msg: any = null
  const flag = allDictData.some((dictData) => {
    const { id, dictCode, label, value } = dictData
    if ((_id && id == _id) || dictCode != _dictCode) return false
    if (label == _label) {
      msg = `字典标签名“${_label}”重复`
      return true
    }
    if (value == _value) {
      msg = `字典内容值“${_value}”重复`
      return true
    }
    return false
  })
  if (flag) return msg
  else return false
}
