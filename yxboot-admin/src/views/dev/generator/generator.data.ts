import { FormSchema } from '@/components/Form'
import { commonRules, required } from '@/utils/formRules'

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
    rules: [required('请输入作者')]
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    rules: [required('请输入邮箱'), ...commonRules.email]
  },
  { field: 'frontChecked', label: '', defaultValue: true, component: 'Switch', slot: 'frontChecked' },
  { field: 'backChecked', label: '', defaultValue: true, component: 'Switch', slot: 'backChecked' },
  {
    field: 'pkg',
    label: '后端包名',
    component: 'Input',
    rules: [required('请输入后端包名')],
    ifShow: ({ backChecked }) => backChecked
  }
]
