/**
 * 表单相关类型（UI 无关，供适配器实现）
 */
import type { Component } from 'vue';

export type FormLayout = 'horizontal' | 'inline' | 'vertical';

/** 表单项 schema */
export interface FormSchema {
  /** 字段名 */
  field: string;
  /** 标签 */
  label?: string;
  /** 组件类型或组件 */
  component: string | Component;
  /** 默认值 */
  defaultValue?: unknown;
  /** 是否必填 */
  required?: boolean;
  /** 校验规则（可对接 zod 等） */
  rules?: unknown;
  /** 是否隐藏 */
  hide?: boolean;
  /** 组件 props */
  componentProps?: Record<string, unknown>;
  /** 依赖显隐/禁用等（根据其他字段值） */
  dependencies?: {
    /** 监听字段 */
    triggerFields: string[];
    /** 是否显示 */
    if?: (values: Record<string, unknown>) => boolean;
    /** 是否禁用 */
    disabled?: (values: Record<string, unknown>) => boolean;
  };
  [key: string]: unknown;
}

/** 表单 Props（供包装组件使用） */
export interface FormProps {
  schema?: FormSchema[];
  model?: Record<string, unknown>;
  layout?: FormLayout;
  labelWidth?: number | string;
  disabled?: boolean;
  /** 提交回调 */
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
  /** 重置回调 */
  onReset?: (values: Record<string, unknown>) => void | Promise<void>;
}

/** 表单实例（供 useForm 返回） */
export interface FormInstance {
  /** 校验 */
  validate: () => Promise<boolean>;
  /** 重置 */
  reset: () => void;
  /** 设置字段值 */
  setFieldValue: (field: string, value: unknown) => void;
  /** 获取字段值 */
  getFieldValue: (field: string) => unknown;
  /** 获取全部值 */
  getValues: () => Record<string, unknown>;
}
