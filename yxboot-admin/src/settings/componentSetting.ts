// Used to configure the general configuration of some components without modifying the components

import type { SorterResult } from '../components/Table'

export default {
  // basic-table setting
  table: {
    // Form interface request general configuration
    // support xxx.xxx.xxx
    fetchSetting: {
      // The field name of the current page passed to the background
      pageField: 'current',
      // The number field name of each page displayed in the background
      sizeField: 'size',
      // Field name of the form data returned by the interface
      listField: 'records',
      // Total number of tables returned by the interface field name
      totalField: 'total'
    },
    // 可选择的每页数量集合
    pageSizeOptions: ['10', '20', '50', '100'],
    // 默认每页数量
    defaultPageSize: 10,
    // Default Size
    defaultSize: 'small',
    // Custom general sort function
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo
      if (field && order) {
        return {
          // The sort field passed to the backend you
          field,
          // Sorting method passed to the background asc/desc
          order
        }
      } else {
        return {}
      }
    },
    // Custom general filter function
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data
    }
  },
  // scrollbar setting
  scrollbar: {
    // Whether to use native scroll bar
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    native: false
  }
}
