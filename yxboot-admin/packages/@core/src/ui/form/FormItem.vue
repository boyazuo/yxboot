<script setup lang="ts">
import type { FormSchema } from './types';

interface Props {
  schema: FormSchema;
  value?: unknown;
  error?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:value': [unknown] }>();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  let v: unknown = target.value;
  if (target.type === 'number') v = Number((target as HTMLInputElement).value);
  if ((target as HTMLInputElement).type === 'checkbox') {
    v = (e.target as HTMLInputElement).checked;
  }
  emit('update:value', v);
}
</script>

<template>
  <div class="core-form-item" :class="{ 'core-form-item--error': error }">
    <label v-if="schema.label && !schema.hide" class="core-form-item__label">
      <span v-if="schema.required" class="core-form-item__required">*</span>
      {{ schema.label }}
    </label>
    <div class="core-form-item__control">
      <slot :value="value" :schema="schema" :on-input="onInput">
        <input
          :value="value"
          :disabled="disabled"
          :placeholder="(schema.componentProps?.placeholder as string) ?? ''"
          class="core-form-item__input"
          @input="onInput"
        />
      </slot>
      <span v-if="error" class="core-form-item__error">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped>
.core-form-item {
  margin-bottom: 16px;
}
.core-form-item__label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: hsl(var(--foreground));
}
.core-form-item__required {
  color: hsl(var(--destructive));
  margin-right: 2px;
}
.core-form-item__control {
  min-height: 32px;
}
.core-form-item__input {
  width: 100%;
  height: 32px;
  padding: 4px 12px;
  font-size: 14px;
  color: hsl(var(--foreground));
  background: hsl(var(--input-background));
  border: 1px solid hsl(var(--input));
  border-radius: var(--radius);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.core-form-item__input::placeholder {
  color: hsl(var(--input-placeholder));
}
.core-form-item__input:focus {
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
.core-form-item__input:hover:not(:disabled):not(:focus) {
  border-color: hsl(var(--primary));
}
.core-form-item__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.core-form-item__error {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: hsl(var(--destructive));
}
.core-form-item--error .core-form-item__input {
  border-color: hsl(var(--destructive));
}
</style>
