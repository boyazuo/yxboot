<template>
  <div ref="wrapRef" :class="getWrapperClass">
    <BasicForm
      ref="formRef"
      submitOnReset
      v-bind="getFormProps"
      v-if="getBindValues.useSearchForm"
      :tableAction="tableAction"
      @register="registerForm"
      @submit="handleSearchInfoChange"
      @advanced-change="redoHeight"
    >
      <template #[replaceFormSlotKey(item)]="data" v-for="item in getFormSlotKeys">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </BasicForm>

    <a-table
      ref="tableElRef"
      v-bind="getBindValues"
      :rowClassName="getRowClassName"
      @change="handleTableChange"
      @resize-column="setColumnWidth"
    >
      <!-- <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template> -->
      <template #bodyCell="{ column, record }">
        <slot :name="column.dataIndex" :record="record"></slot>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form'
  import { isFunction } from '@/utils/is'
  import { omit } from 'lodash-es'
  import { computed, ref, toRaw, unref } from 'vue'
  import { useColumns } from './hooks/useColumns'
  import { useDataSource } from './hooks/useDataSource'
  import { useLoading } from './hooks/useLoading'
  import { usePagination } from './hooks/usePagination'
  import { useRowSelection } from './hooks/useRowSelection'
  import { createTableContext } from './hooks/useTableContext'
  import { useTableForm } from './hooks/useTableForm'
  import { useTableHeader } from './hooks/useTableHeader'
  import { useTableScroll } from './hooks/useTableScroll'
  import { useTableStyle } from './hooks/useTableStyle'
  import { basicProps } from './props'
  import type { BasicTableProps, ColumnChangeParam, SizeType, TableActionType } from './types/table'
  import { InnerHandlers } from './types/table'

  const props = defineProps(basicProps)
  const emit = defineEmits([
    'fetch-success',
    'fetch-error',
    'selection-change',
    'register',
    'row-click',
    'row-dbClick',
    'row-contextmenu',
    'row-mouseenter',
    'row-mouseleave',
    'edit-end',
    'edit-cancel',
    'edit-row-end',
    'edit-change',
    'expanded-rows-change',
    'change',
    'columns-change'
  ])
  const attrs = useAttrs()
  const slots = useSlots()

  const wrapRef = ref(null)
  const tableElRef = ref(null)
  const tableData = ref<Recordable[]>([])
  const innerPropsRef = ref<Partial<BasicTableProps>>()

  const formRef = ref(null)

  const prefixCls = 'basic-table'

  const [registerForm, formActions] = useForm({
    baseColProps: { span: 6 }
  })

  const getProps = computed(() => {
    return {
      ...props,
      ...unref(innerPropsRef)
    } as BasicTableProps
  })

  const { getLoading, setLoading } = useLoading(getProps)

  const { getPaginationInfo, getPagination, setPagination, setShowPagination, getShowPagination } =
    usePagination(getProps)

  const {
    getRowSelection,
    getRowSelectionRef,
    getSelectRows,
    clearSelectedRowKeys,
    getSelectRowKeys,
    deleteSelectRowByKey,
    setSelectedRowKeys
  } = useRowSelection(getProps, tableData, emit)

  const {
    handleTableChange: onTableChange,
    getDataSourceRef,
    getDataSource,
    getRawDataSource,
    setTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    findTableDataRecord,
    fetch,
    getRowKey,
    reload,
    updateTableData
  } = useDataSource(
    getProps,
    {
      tableData,
      getPaginationInfo,
      setLoading,
      setPagination,
      getFieldsValue: formActions.getFieldsValue,
      clearSelectedRowKeys
    },
    emit
  )

  const {
    getViewColumns,
    getColumns,
    getColumnsRef,
    setCacheColumnsByField,
    setCacheColumns,
    setColumnWidth,
    setColumns,
    getCacheColumns
  } = useColumns(getProps, getPaginationInfo)

  const { getScrollRef, redoHeight } = useTableScroll(
    getProps,
    tableElRef,
    getColumnsRef,
    getRowSelectionRef,
    getDataSourceRef,
    wrapRef,
    formRef
  )
  const { getRowClassName } = useTableStyle(getProps, prefixCls)

  const handlers: InnerHandlers = {
    onColumnsChange: (data: ColumnChangeParam[]) => {
      emit('columns-change', data)
      // support useTable
      unref(getProps).onColumnsChange?.(data)
    }
  }

  const { getHeaderProps } = useTableHeader(getProps, slots, handlers)

  const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange } = useTableForm(
    getProps,
    slots,
    fetch,
    getLoading
  )

  const getBindValues = computed(() => {
    const dataSource = unref(getDataSourceRef)
    let propsData: Recordable = {
      ...attrs,
      ...unref(getProps),
      ...unref(getHeaderProps),
      scroll: unref(getScrollRef),
      loading: unref(getLoading),
      rowSelection: unref(getRowSelectionRef),
      rowKey: unref(getRowKey),
      columns: toRaw(unref(getViewColumns)),
      pagination: toRaw(unref(getPaginationInfo)),
      dataSource
    }

    propsData = omit(propsData, ['class', 'onChange'])
    return propsData
  })

  const getWrapperClass = computed(() => {
    const values = unref(getBindValues)
    return [
      prefixCls,
      attrs.class,
      {
        [`${prefixCls}-form-container`]: values.useSearchForm,
        [`${prefixCls}--inset`]: values.inset
      }
    ]
  })

  function handleTableChange(...args) {
    onTableChange.call(undefined, ...args)
    emit('change', ...args)
    // 解决通过useTable注册onChange时不起作用的问题
    const { onChange } = unref(getProps)
    onChange && isFunction(onChange) && onChange.call(undefined, ...args)
  }

  function setProps(props: Partial<BasicTableProps>) {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props }
  }

  const tableAction: Partial<TableActionType> = {
    reload,
    redoHeight,
    getSelectRows,
    clearSelectedRowKeys,
    getSelectRowKeys,
    deleteSelectRowByKey,
    setPagination,
    setTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    findTableDataRecord,
    setSelectedRowKeys,
    setLoading,
    getDataSource,
    getRawDataSource,
    setProps,
    getRowSelection,
    getPaginationRef: getPagination,
    getColumns,
    getCacheColumns,
    setColumns,
    setCacheColumnsByField,
    setCacheColumns,
    emit,
    updateTableData,
    setShowPagination,
    getShowPagination,
    getSize: () => {
      return unref(getBindValues).size as SizeType
    }
  }

  createTableContext({ ...tableAction, wrapRef, getBindValues })

  emit('register', tableAction, formActions)
</script>
<style lang="less">
  @prefix-cls: ~'basic-table';

  [data-theme='dark'] {
    .ant-table-tbody > tr:hover.ant-table-row-selected > td,
    .ant-table-tbody > tr.ant-table-row-selected td {
      background-color: #262626;
    }

    .basic-table {
      background-color: #1d1d1d;
    }
  }

  .@{prefix-cls} {
    background-color: @content-bg;

    :deep(.ant-pagination) {
      margin: 16px 6px;
    }

    &-row__striped {
      td {
        background-color: @app-content-background;
      }
    }

    .ant-table-wrapper {
      padding: 6px;
      padding-top: 0;
      background-color: @component-background;
      border-radius: 2px;

      .ant-table.ant-table-bordered .ant-table-title {
        border: none !important;
      }

      .ant-table.ant-table-bordered .ant-table-container {
        border: none !important;
      }

      .ant-table.ant-table-bordered table {
        border-left: 1px solid #f0f0f0;
      }
    }

    &-form-container {
      .ant-form {
        padding: 12px 10px 6px;
        margin-bottom: 16px;
        background-color: @component-background;
        border-radius: 2px;
      }
    }
  }

  .table-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
  }
</style>
