/**
 * 弹窗 / 抽屉类型（UI 无关）
 */
import type { Component } from 'vue';

export type ModalAnimationType = 'scale' | 'slide' | 'fade';

/** Modal 选项（供 API 调用） */
export interface ModalOptions {
  title?: string;
  content?: Component | string;
  /** 宽度 */
  width?: number | string;
  /** 是否显示确认按钮 */
  showConfirmButton?: boolean;
  /** 是否显示取消按钮 */
  showCancelButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  /** 点击遮罩是否关闭 */
  closeOnClickModal?: boolean;
  /** 按 ESC 是否关闭 */
  closeOnPressEscape?: boolean;
  /** 关闭后是否销毁子组件 */
  destroyOnClose?: boolean;
  /** 动画类型 */
  animationType?: ModalAnimationType;
  /** 确认回调 */
  onConfirm?: () => void | Promise<void>;
  /** 取消回调 */
  onCancel?: () => void;
  /** 关闭回调 */
  onClose?: () => void;
  [key: string]: unknown;
}

/** Drawer 选项 */
export interface DrawerOptions {
  title?: string;
  content?: Component | string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  size?: number | string;
  closeOnClickModal?: boolean;
  destroyOnClose?: boolean;
  onClose?: () => void;
  [key: string]: unknown;
}

/** Modal 实例（供 useModal 返回） */
export interface ModalApi {
  open: (options: ModalOptions) => void;
  close: () => void;
  confirm: (options: ModalOptions) => Promise<boolean>;
}

/** Drawer 实例 */
export interface DrawerApi {
  open: (options: DrawerOptions) => void;
  close: () => void;
}
