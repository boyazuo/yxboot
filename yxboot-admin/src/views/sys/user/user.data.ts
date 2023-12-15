import { treeDept } from '@/api/sys/dept'
import { allRole } from '@/api/sys/role'
import { FormSchema } from '@/components/Form'
import { BasicColumn } from '@/components/Table'
import { statusEnum } from '@/utils/formEnums'
import { commonRules, required } from '@/utils/formRules'

export const tableColumns: BasicColumn[] = [
  { title: '登录账号', dataIndex: 'username' },
  { title: '用户名称', dataIndex: 'name' },
  { title: '用户角色', dataIndex: 'role.name' },
  { title: '所属部门', dataIndex: 'deptName' },
  { title: '性别', dataIndex: 'sex.label' },
  { title: '手机号', dataIndex: 'phone' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '状态', dataIndex: 'statusDesc' }
]

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '用户名称', component: 'Input' },
  {
    field: 'deptId',
    label: '部门名称',
    component: 'ApiTreeSelect',
    componentProps: {
      api: treeDept,
      resultField: 'data',
      fieldNames: { children: 'children', label: 'name', value: 'deptId' }
    }
  },
  { field: 'phone', label: '手机号', component: 'Input' },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    defaultValue: 1,
    componentProps: { allowClear: true, options: statusEnum }
  }
]

export const editFormSchema: FormSchema[] = [
  { field: 'userId', label: '编号', component: 'InputNumber', show: false },
  {
    field: 'username',
    label: '登录账号',
    component: 'Input',
    rules: [required('请输入登录账号'), ...commonRules.code4]
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    ifShow: ({ userId }) => !userId,
    rules: [required('请输入初始密码'), ...commonRules.code6]
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    rules: [required('请输入姓名')]
  },
  {
    field: 'sex',
    label: '性别',
    component: 'Dict',
    rules: [required('请选择性别')],
    componentProps: { code: 'UserSex' }
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    rules: [required('请输入手机号'), ...commonRules.phone]
  },
  { field: 'email', label: '邮箱', component: 'Input', rules: [...commonRules.email] },
  {
    field: 'roleId',
    label: '角色',
    component: 'ApiSelect',
    rules: [required('请选择角色')],
    componentProps: {
      api: allRole,
      resultField: 'data',
      labelField: 'name',
      valueField: 'roleId'
    }
  },
  {
    field: 'deptId',
    label: '部门',
    component: 'ApiTreeSelect',
    rules: [required('请选择部门')],
    componentProps: {
      api: treeDept,
      allowClear: true,
      resultField: 'data',
      fieldNames: { children: 'children', label: 'name', value: 'deptId' }
    }
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    rules: [required('请选择状态')],
    defaultValue: 1,
    componentProps: { options: statusEnum }
  }
]
