import { FormSchema } from '@/components/Form'
import { BasicColumn } from '@/components/Table'
import { statusEnum } from '@/utils/formEnums'

export const tableColumns: BasicColumn[] = [
  { title: '部门名称', dataIndex: 'name', align: 'left' },
  { title: '部门说明', dataIndex: 'remark' },
  { title: '状态', dataIndex: 'statusDesc' }
]

export const editFormSchema: FormSchema[] = [
  { field: 'deptId', label: '编号', component: 'InputNumber', show: false },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'TreeSelect',
    slot: 'parentId'
  },
  {
    field: 'name',
    label: '部门名称',
    component: 'Input',
    required: true
  },
  { field: 'remark', label: '部门说明', component: 'InputTextArea' },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    rules: [{ required: true, message: '请选择状态' }],
    defaultValue: 1,
    componentProps: { options: statusEnum }
  }
]
