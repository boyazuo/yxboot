import { treeDept } from '@/api/sys/dept'
import { allRole } from '@/api/sys/role'
import { FormSchema } from '@/components/Form'
import { BasicColumn } from '@/components/Table'
import { statusEnum } from '@/utils/formEnums'

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
    required: true,
    rules: [
      {
        pattern: /^[A-Za-z0-9_]+$/,
        message: '只能包含数字、字母、下划线',
        trigger: 'change'
      },
      {
        min: 4,
        max: 20,
        message: `长度应在4 ~ 20位之间`,
        trigger: 'blur'
      }
    ]
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    ifShow: ({ userId }) => !userId,
    required: true,
    rules: [
      {
        min: 6,
        max: 20,
        message: `长度应在6 ~ 20位之间`,
        trigger: 'blur'
      }
    ]
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    required: true
  },
  {
    field: 'sex',
    label: '性别',
    component: 'Dict',
    rules: [{ required: true, message: '请选择性别' }],
    componentProps: { code: 'UserSex' }
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    required: true,
    rules: [
      {
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入正确的的11位手机号码',
        trigger: 'blur'
      }
    ]
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    rules: [
      {
        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: '请输入正确的邮箱',
        trigger: 'blur'
      }
    ]
  },
  {
    field: 'roleId',
    label: '角色',
    component: 'ApiSelect',
    required: true,
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
    rules: [{ required: true, message: '请选择部门' }],
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
    rules: [{ required: true, message: '请选择状态' }],
    defaultValue: 1,
    componentProps: { options: statusEnum }
  }
]
