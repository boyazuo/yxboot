<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormSchema } from './types';
import FormItem from './FormItem.vue';

interface Props {
  schema?: FormSchema[];
  model?: Record<string, unknown>;
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelWidth?: number | string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  schema: () => [],
  model: () => ({}),
  layout: 'vertical',
  labelWidth: 100,
  disabled: false,
});

const emit = defineEmits<{ submit: [values: Record<string, unknown>]; reset: [] }>();

const formData = ref<Record<string, unknown>>({ ...props.model });
const errors = ref<Record<string, string>>({});

watch(
  () => props.model,
  (v) => {
    formData.value = { ...v };
  },
  { deep: true },
);

function setFieldValue(field: string, value: unknown) {
  formData.value[field] = value;
}

function getFieldValue(field: string) {
  return formData.value[field];
}

function validate(): Promise<boolean> {
  const err: Record<string, string> = {};
  for (const item of props.schema) {
    if (item.required && (formData.value[item.field] === undefined || formData.value[item.field] === '')) {
      err[item.field] = `${item.label ?? item.field}不能为空`;
    }
  }
  errors.value = err;
  return Promise.resolve(Object.keys(err).length === 0);
}

function reset() {
  formData.value = { ...props.model };
  errors.value = {};
  emit('reset');
}

async function handleSubmit(e: Event) {
  e.preventDefault();
  const ok = await validate();
  if (ok) {
    emit('submit', { ...formData.value });
  }
}

defineExpose({
  formData,
  setFieldValue,
  getFieldValue,
  validate,
  reset,
});
</script>

<template>
  <form
    class="core-form"
    :class="`core-form--${layout}`"
    :style="{ '--label-width': typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth } as any"
    @submit="handleSubmit"
  >
    <template v-for="item in schema" :key="item.field">
      <FormItem
        v-if="!item.hide"
        :schema="item"
        :value="formData[item.field]"
        :error="errors[item.field]"
        :disabled="disabled || !!(item.componentProps?.disabled as boolean)"
        @update:value="(v) => setFieldValue(item.field, v)"
      >
        <template #default="slotProps">
          <slot :name="item.field" v-bind="slotProps">
            <input
              :value="slotProps.value"
              :disabled="!!(slotProps.schema.componentProps?.disabled as boolean)"
              :placeholder="(slotProps.schema.componentProps?.placeholder as string) ?? ''"
              class="core-form-item__input"
              @input="(e) => slotProps.onInput(e)"
            />
          </slot>
        </template>
      </FormItem>
    </template>
    <div v-if="$slots.actions" class="core-form__actions">
      <slot name="actions" />
    </div>
  </form>
</template>

<style scoped>
.core-form {
  width: 100%;
}
.core-form--vertical .core-form-item__label {
  display: block;
}
.core-form--horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.core-form--horizontal .core-form-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.core-form--horizontal .core-form-item__label {
  flex-shrink: 0;
  width: var(--label-width, 100px);
  padding-top: 6px;
}
.core-form__actions {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid hsl(var(--border));
}
</style>
