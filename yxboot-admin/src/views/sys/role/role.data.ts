import { FormSchema } from '@/components/Form'
import { BasicColumn } from '@/components/Table'
import { statusEnum } from '@/utils/formEnums'
import { required } from '@/utils/formRules'

export const tableColumns: BasicColumn[] = [
  { title: '角色名称', dataIndex: 'name' },
  { title: '描述', dataIndex: 'descn' },
  { title: '状态', dataIndex: 'statusDesc' }
]

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '角色名称', component: 'Input', componentProps: { allowClear: true } },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: { allowClear: true, options: statusEnum }
  }
]

export const editFormSchema: FormSchema[] = [
  { field: 'roleId', label: '编号', component: 'InputNumber', show: false },
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    rules: [required('请输入角色名称')]
  },
  { field: 'descn', label: '描述', component: 'Input' },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    rules: [required('请选择状态')],
    defaultValue: 1,
    componentProps: { options: statusEnum }
  }
]
