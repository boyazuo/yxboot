// UI 组件类型定义

export interface FormSchema {
  field: string;
  label: string;
  component: string;
  [key: string]: any;
}

export interface TableColumn {
  prop: string;
  label: string;
  width?: number | string;
  [key: string]: any;
}
