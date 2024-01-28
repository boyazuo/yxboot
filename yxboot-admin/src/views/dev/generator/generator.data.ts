import { FormSchema } from '@/components/Form'

export const tableColumns = [
  { title: '表名', dataIndex: 'tableName' },
  { title: '表描述', dataIndex: 'tableComment' },
  { title: '引擎', dataIndex: 'engine' },
  { title: '创建时间', dataIndex: 'createTime' }
]

export const searchFormSchema: FormSchema[] = [{ field: 'tableName', label: '表名', component: 'Input' }]

export const editFormSchema: FormSchema[] = [
  {
    field: 'author',
    label: '作者',
    component: 'Input',
    required: true
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    required: true,
    rules: [
      {
        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: '请输入正确的邮箱',
        trigger: 'blur'
      }
    ]
  },
  { field: 'frontChecked', label: '', defaultValue: true, component: 'Switch', slot: 'frontChecked' },
  { field: 'backChecked', label: '', defaultValue: true, component: 'Switch', slot: 'backChecked' },
  {
    field: 'pkg',
    label: '后端包名',
    component: 'Input',
    required: true,
    ifShow: ({ backChecked }) => backChecked
  }
]
