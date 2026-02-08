import type { Ref } from 'vue';
import { ref } from 'vue';
import type { ModalOptions } from './types';

export interface ModalState {
  isOpen: boolean;
  title: string;
  description?: string;
  showConfirmButton: boolean;
  showCancelButton: boolean;
  confirmText: string;
  cancelText: string;
  confirmLoading: boolean;
  confirmDisabled: boolean;
  closeOnClickModal: boolean;
  destroyOnClose: boolean;
  [key: string]: unknown;
}

const defaultState: ModalState = {
  isOpen: false,
  title: '',
  showConfirmButton: true,
  showCancelButton: true,
  confirmText: '确定',
  cancelText: '取消',
  confirmLoading: false,
  confirmDisabled: false,
  closeOnClickModal: true,
  destroyOnClose: true,
};

export function createModalApi() {
  const state = ref<ModalState>({ ...defaultState });
  let resolveConfirm: (value: boolean) => void;
  let onConfirmCb: (() => void | Promise<void>) | undefined;
  let onCancelCb: (() => void) | undefined;
  let onCloseCb: (() => void) | undefined;

  function open(options: ModalOptions = {}) {
    state.value = {
      ...defaultState,
      isOpen: true,
      title: (options.title ?? '') as string,
      description: options.description as string | undefined,
      showConfirmButton: options.showConfirmButton ?? true,
      showCancelButton: options.showCancelButton ?? true,
      confirmText: options.confirmText ?? defaultState.confirmText,
      cancelText: options.cancelText ?? defaultState.cancelText,
      closeOnClickModal: options.closeOnClickModal ?? true,
      destroyOnClose: options.destroyOnClose ?? true,
      ...options,
    };
    onConfirmCb = options.onConfirm;
    onCancelCb = options.onCancel;
    onCloseCb = options.onClose;
  }

  function close() {
    state.value = { ...state.value, isOpen: false };
    onCloseCb?.();
  }

  async function onConfirm() {
    if (state.value.confirmLoading) return;
    state.value.confirmLoading = true;
    try {
      await onConfirmCb?.();
      close();
      resolveConfirm?.(true);
    } catch (e) {
      resolveConfirm?.(false);
    } finally {
      state.value.confirmLoading = false;
    }
  }

  function onCancel() {
    onCancelCb?.();
    close();
    resolveConfirm?.(false);
  }

  function confirm(options: ModalOptions = {}): Promise<boolean> {
    return new Promise((resolve) => {
      resolveConfirm = resolve;
      open({
        ...options,
        onConfirm: async () => {
          await options.onConfirm?.();
          resolve(true);
        },
        onCancel: () => {
          options.onCancel?.();
          resolve(false);
        },
      });
    });
  }

  function setState(updater: (prev: ModalState) => Partial<ModalState>) {
    state.value = { ...state.value, ...updater(state.value) };
  }

  return {
    state: state as Ref<ModalState>,
    open,
    close,
    onConfirm,
    onCancel,
    confirm,
    setState,
  };
}
