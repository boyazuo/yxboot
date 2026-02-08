/**
 * 表格 Hook 类型与占位
 * 应用层可基于 useTable 封装与具体 UI 库结合的列表逻辑
 */
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { TableColumn, TablePagination } from '../table/types';

export interface UseTableOptions<T = any> {
  /** 列配置 */
  columns: TableColumn[];
  /** 请求数据方法 */
  api?: (params: { page: number; pageSize: number }) => Promise<{ list: T[]; total: number }>;
  /** 是否立即请求 */
  immediate?: boolean;
  /** 默认分页 */
  pageSize?: number;
}

export interface UseTableReturn<T = any> {
  data: Ref<T[]>;
  loading: Ref<boolean>;
  pagination: Ref<TablePagination>;
  columns: Ref<TableColumn[]>;
  load: () => Promise<void>;
  reload: () => Promise<void>;
  getSelection: () => T[];
}

/**
 * 占位实现：仅管理分页与 loading，不请求数据
 */
export function useTable<T = any>(options: UseTableOptions<T>): UseTableReturn<T> {
  const data = ref<T[]>([]) as Ref<T[]>;
  const loading = ref(false);
  const pagination = ref<TablePagination>({
    current: 1,
    pageSize: options.pageSize ?? 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
  });
  const columns = ref<TableColumn[]>(options.columns);

  async function load() {
    if (!options.api) return;
    loading.value = true;
    try {
      const res = await options.api({
        page: pagination.value.current,
        pageSize: pagination.value.pageSize,
      });
      data.value = res.list;
      pagination.value = { ...pagination.value, total: res.total };
    } finally {
      loading.value = false;
    }
  }

  if (options.immediate !== false && options.api) {
    load();
  }

  return {
    data,
    loading,
    pagination,
    columns,
    load,
    reload: load,
    getSelection: () => [],
  };
}
