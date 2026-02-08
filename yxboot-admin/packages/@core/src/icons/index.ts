/**
 * 图标模块：与 vben-admin @vben-core/icons 对齐
 * 使用 @iconify/vue，支持 Iconify 图标集（如 ep:、lucide:、mdi: 等）
 */
export { createIconifyIcon } from './create-icon';

export type { IconifyIcon as IconifyIconStructure } from '@iconify/vue';
export {
  addCollection,
  addIcon,
  Icon as IconifyIcon,
  listIcons,
} from '@iconify/vue';
