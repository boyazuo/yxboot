import { isBoolean } from '@/utils/is'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { ComputedRef, computed, ref, unref, watch } from 'vue'
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const'
import type { PaginationProps } from '../types/pagination'
import type { BasicTableProps } from '../types/table'

interface ItemRender {
  page: number
  type: 'page' | 'prev' | 'next'
  originalElement: any
}

function itemRender({ page, type, originalElement }: ItemRender) {
  if (type === 'prev') {
    return page === 0 ? null : <LeftOutlined />
  } else if (type === 'next') {
    return page === 1 ? null : <RightOutlined />
  }
  return originalElement
}

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({})
  const show = ref(true)

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {})
        }
      }
    }
  )

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps)

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false
    }

    return {
      current: 1,
      pageSize: PAGE_SIZE,
      size: 'small',
      defaultPageSize: PAGE_SIZE,
      showTotal: (total) => `共 ${total} 条数据`,
      showSizeChanger: true,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      itemRender: itemRender,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef)
    }
  })

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo)
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info
    }
  }

  function getPagination() {
    return unref(getPaginationInfo)
  }

  function getShowPagination() {
    return unref(show)
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag
  }

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination }
}
