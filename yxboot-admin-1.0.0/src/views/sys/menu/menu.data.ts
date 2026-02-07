import type { FormSchema } from '@/components/Form'
import type { BasicColumn } from '@/components/Table'
import { statusOptions } from '@/enums'

export const listMenuType = [
  { label: '模块', value: 1, isCreateChild: true },
  { label: '菜单', value: 2, isCreateChild: true, ifShowComponent: true, ifShowPath: true },
  { label: '按钮', value: 3, ifShowCode: true },
]
const displayOptions = [
  { label: '显示', value: 1 },
  { label: '隐藏', value: 0 },
]
const allMenuOption = {
  isCreateChild: false, // 是否能创建子项
  ifShowComponent: false, // 是否保存【component-组件】字段
  ifShowPath: false, // 是否保存【path-菜单路径】字段
  ifShowCode: false, // 是否保存【code-按钮编码】字段
}
export const findMenuType = (type) => ({ ...allMenuOption, ...listMenuType.find((item) => item.value === type) })

export const tableColumns: BasicColumn[] = [
  { title: '菜单名称', dataIndex: 'name', align: 'left' },
  { title: '菜单类型', dataIndex: 'typeDesc' },
  { title: '图标', dataIndex: 'icon' },
  { title: '组件', dataIndex: 'component' },
  { title: '菜单路径/按钮编码', dataIndex: 'path' },
  { title: '排序', dataIndex: 'sort' },
  { title: '是否显示', dataIndex: 'display', customRender: ({ text }) => (text === 1 ? '显示' : '隐藏') },
  { title: '状态', dataIndex: 'statusDesc' },
]

export const editFormSchema: FormSchema[] = [
  { field: 'menuId', label: '编号', component: 'InputNumber', show: false },
  { field: 'parentId', label: '父级编号', component: 'InputNumber', show: false },
  { field: 'parentName', label: '上级菜单', component: 'Input', componentProps: { disabled: true } },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'Select',
    rules: [{ required: true, message: '请选择菜单类型' }],
    componentProps: { options: listMenuType },
  },
  { field: 'icon', label: '图标', component: 'IconPicker' },
  {
    field: 'component',
    label: '组件',
    component: 'Input',
    ifShow: ({ type }) => findMenuType(type).ifShowComponent,
  },
  {
    field: 'path',
    label: '菜单路径',
    component: 'Input',
    ifShow: ({ type }) => findMenuType(type).ifShowPath,
  },
  {
    field: 'code',
    label: '权限编码',
    component: 'Input',
    ifShow: ({ type }) => findMenuType(type).ifShowCode,
  },
  { field: 'descn', label: '菜单说明', component: 'Input' },
  { field: 'sort', label: '排序', component: 'Input' },
  {
    field: 'display',
    label: '是否显示',
    component: 'Select',
    defaultValue: 1,
    componentProps: { options: displayOptions },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    rules: [{ required: true, message: '请选择状态' }],
    defaultValue: 1,
    componentProps: { options: statusOptions },
  },
]
