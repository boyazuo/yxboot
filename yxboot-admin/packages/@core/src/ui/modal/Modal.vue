<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, watch } from 'vue';
import type { ModalState } from './ModalApi';

interface Props {
  state: ModalState | Ref<ModalState>;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  onClose: () => void;
  width?: number | string;
  centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: 520,
  centered: false,
});

const stateRef = computed(() =>
  typeof props.state === 'object' && props.state !== null && 'value' in props.state
    ? (props.state as Ref<ModalState>).value
    : (props.state as ModalState),
);
const visible = computed(() => stateRef.value.isOpen);

function handleOverlayClick() {
  if (stateRef.value.closeOnClickModal) {
    props.onCancel();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && stateRef.value.isOpen) {
    props.onCancel();
  }
}

watch(visible, (v) => {
  if (v) {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
  } else {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="core-modal-fade-scale">
      <div
        v-show="visible"
        class="core-modal-mask"
        role="dialog"
        aria-modal="true"
        @click.self="handleOverlayClick"
      >
        <div
          class="core-modal"
          :class="{ 'core-modal--centered': centered }"
          :style="{ width: typeof width === 'number' ? `${width}px` : width }"
          @click.stop
        >
          <div v-if="stateRef.title || $slots.title" class="core-modal__header">
            <slot name="title">
              <span class="core-modal__title">{{ stateRef.title }}</span>
            </slot>
            <button
              type="button"
              class="core-modal__close"
              aria-label="关闭"
              @click="onCancel"
            >
              ×
            </button>
          </div>
          <div class="core-modal__body">
            <slot />
          </div>
          <div v-if="stateRef.showConfirmButton || stateRef.showCancelButton" class="core-modal__footer">
            <slot name="footer">
              <button
                v-if="stateRef.showCancelButton"
                type="button"
                class="core-modal__btn core-modal__btn--cancel"
                :disabled="stateRef.confirmLoading"
                @click="onCancel"
              >
                {{ stateRef.cancelText }}
              </button>
              <button
                v-if="stateRef.showConfirmButton"
                type="button"
                class="core-modal__btn core-modal__btn--primary"
                :disabled="stateRef.confirmDisabled || stateRef.confirmLoading"
                @click="onConfirm"
              >
                {{ stateRef.confirmLoading ? '...' : stateRef.confirmText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.core-modal-fade-scale-enter-active,
.core-modal-fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.core-modal-fade-scale-enter-from,
.core-modal-fade-scale-leave-to {
  opacity: 0;
}
.core-modal-fade-scale-enter-from .core-modal,
.core-modal-fade-scale-leave-to .core-modal {
  transform: scale(0.96);
}
.core-modal-fade-scale-enter-active .core-modal,
.core-modal-fade-scale-leave-active .core-modal {
  transition: transform 0.3s ease;
}
.core-modal-mask {
  position: fixed;
  inset: 0;
  z-index: var(--popup-z-index);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10vh 24px 24px;
  background: hsl(var(--overlay));
  overflow-y: auto;
}
.core-modal {
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  background: hsl(var(--background));
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: auto;
}
.core-modal--centered {
  margin: auto;
}
.core-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid hsl(var(--border));
  flex-shrink: 0;
  background: hsl(var(--background));
}
.core-modal__title {
  font-size: 16px;
  font-weight: 600;
  color: hsl(var(--foreground));
  text-align: left;
}
.core-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  font-size: 20px;
  line-height: 1;
  color: hsl(var(--foreground));
  background: transparent;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
}
.core-modal__close:hover {
  background: hsl(var(--accent));
}
.core-modal__body {
  flex: 1;
  min-height: 40px;
  overflow-y: auto;
  padding: 16px 20px;
  position: relative;
}
.core-modal__footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 20px 12px;
  border-top: 1px solid hsl(var(--border));
  flex-shrink: 0;
}
.core-modal__btn {
  padding: 6px 16px;
  font-size: 14px;
  border-radius: var(--radius);
  cursor: pointer;
  border: none;
  transition: background 0.15s, color 0.15s;
}
.core-modal__btn--cancel {
  background: hsl(var(--accent));
  color: hsl(var(--foreground));
}
.core-modal__btn--cancel:hover {
  background: hsl(var(--accent-hover));
}
.core-modal__btn--primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
.core-modal__btn--primary:hover:not(:disabled) {
  opacity: 0.9;
}
.core-modal__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
