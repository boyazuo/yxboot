import type { FormProps } from '@/components/Form'
import { propTypes } from '@/utils/propTypes'
import { tableProps } from 'ant-design-vue/lib/table'
import type { PropType } from 'vue'
import { DEFAULT_FILTER_FN, DEFAULT_SIZE, DEFAULT_SORT_FN, FETCH_SETTING } from './const'
import type { PaginationProps } from './types/pagination'
import type {
  BasicColumn,
  FetchSetting,
  SizeType,
  SorterResult,
  TableCustomRecord,
  TableRowSelection,
  TableSetting
} from './types/table'

export const basicProps = {
  //继承Antd Vue Table组件的Props
  ...tableProps(),
  // 操作列配置
  actionColumn: {
    type: [Object, Boolean] as PropType<BasicColumn | boolean>,
    default: true
  },
  // 请求之后对返回值进行处理
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  // 表格数据接口方法
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null
  },
  // 是否自动生成 key
  autoCreateKey: { type: Boolean, default: true },
  // 请求之前对参数进行处理
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  // 是否带边框
  bordered: { type: Boolean, default: true },
  // 是否可以自适应高度
  canResize: { type: Boolean, default: true },
  // 切换页码是否重置勾选状态
  clearSelectOnPageChange: propTypes.bool,
  // 表格列的配置描述
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => []
  },
  // 数据数组
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null
  },
  // 默认的排序参数
  defSort: {
    type: Object as PropType<Recordable>,
    default: null
  },
  // 文本超过宽度显示...
  ellipsis: { type: Boolean, default: true },
  // 接口请求配置，可以配置请求的字段和响应的字段名
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {
      return FETCH_SETTING
    }
  },
  // 自定义过滤方法
  filterFn: {
    type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
    default: DEFAULT_FILTER_FN
  },
  // 表单的配置描述
  formConfig: {
    type: Object as PropType<Partial<FormProps>>,
    default: null
  },
  // 开启表单后，在请求之前处理搜索条件参数
  handleSearchInfoFn: {
    type: Function as PropType<Fn>,
    default: null
  },
  // 展示树形数据时，每层缩进的宽度
  indentSize: propTypes.number.def(24),
  // 序号列参数配置
  indexColumnProps: {
    type: Object as PropType<BasicColumn>,
    default: null
  },
  // 立即请求接口
  immediate: { type: Boolean, default: true },
  // 是否继承父父元素高度自适应
  isCanResizeParent: { type: Boolean, default: false },
  // 页面是否加载中
  loading: propTypes.bool,
  // 设置表格最大高度
  maxHeight: propTypes.number,
  // 分页信息配置，为false时不显示分页
  pagination: {
    type: [Object, Boolean] as PropType<PaginationProps | boolean>,
    default: null
  },
  // 定义表格行样式
  rowClassName: {
    type: Function as PropType<(record: TableCustomRecord<any>, index: number) => string>
  },
  // 表格记录的唯一key值
  rowKey: {
    type: [String, Function] as PropType<string | ((record: Recordable) => string)>,
    default: ''
  },
  // 列表项是否可选择
  rowSelection: {
    type: Object as PropType<TableRowSelection | null>,
    default: null
  },
  // 表格是否可滚动，也可以指定滚动区域的宽、高
  scroll: {
    type: Object as PropType<{ x: number | true; y: number }>,
    default: null
  },
  // 额外的请求参数
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null
  },
  // 显示序号列
  showIndexColumn: { type: Boolean, default: true },
  // 显示表格设置工具
  showTableSetting: { type: Boolean, default: true },
  // 表格大小
  size: {
    type: String as PropType<SizeType>,
    default: DEFAULT_SIZE
  },
  // 自定义排序方法
  sortFn: {
    type: Function as PropType<(sortInfo: SorterResult) => any>,
    default: DEFAULT_SORT_FN
  },
  // 斑马纹
  striped: { type: Boolean, default: false },
  // 表格设置工具配置
  tableSetting: propTypes.shape<TableSetting>({}),
  // 表格标题
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null
  },
  // 表格标题的提示信息
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>
  },
  // 使用搜索表单
  useSearchForm: propTypes.bool
}
