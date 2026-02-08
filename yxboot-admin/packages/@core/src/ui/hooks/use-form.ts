/**
 * 表单 Hook 类型与占位实现
 * 应用层通过适配器注入真实实现（如 vben-form）
 */
import type { Ref } from 'vue';
import type { FormInstance, FormSchema } from '../form/types';

export interface UseFormOptions {
  schema: FormSchema[];
  defaultValue?: Record<string, unknown>;
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
}

export interface UseFormReturn {
  formRef: Ref<FormInstance | undefined>;
  formData: Ref<Record<string, unknown>>;
  validate: () => Promise<boolean>;
  reset: () => void;
  setFieldValue: (field: string, value: unknown) => void;
  getFieldValue: (field: string) => unknown;
}

/**
 * 占位：返回符合接口的 stub，实际表单由应用层通过适配器提供
 */
export function useForm(_options: UseFormOptions): UseFormReturn {
  const formRef = { value: undefined } as Ref<FormInstance | undefined>;
  const formData = { value: {} } as Ref<Record<string, unknown>>;

  return {
    formRef,
    formData,
    validate: async () => true,
    reset: () => {
      formData.value = {};
    },
    setFieldValue: (field: string, value: unknown) => {
      formData.value = { ...formData.value, [field]: value };
    },
    getFieldValue: (field: string) => formData.value[field],
  };
}
