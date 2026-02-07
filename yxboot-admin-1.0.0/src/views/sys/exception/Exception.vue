<script lang="tsx">
import { Result } from 'ant-design-vue'
import type { PropType } from 'vue'
import { computed, defineComponent, ref, unref } from 'vue'
import { useRoute } from 'vue-router'

interface MapValue {
  title: string
  status?: string
  subTitle: string
}

export default defineComponent({
  name: 'ErrorPage',
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },

    status: {
      type: Number as PropType<number>,
      default: 404,
    },

    subTitle: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const statusMapRef = ref(new Map<string | number, MapValue>())

    const { query } = useRoute()

    const getStatus = computed(() => {
      const { status: routeStatus } = query
      const { status } = props
      return Number(routeStatus) || status
    })

    const getMapValue = computed((): MapValue => {
      return unref(statusMapRef).get(unref(getStatus)) as MapValue
    })

    unref(statusMapRef).set(403, {
      title: '403',
      status: '403',
      subTitle: '对不起，您没有访问此页面的权限。',
    })

    unref(statusMapRef).set(404, {
      title: '404',
      status: '404',
      subTitle: '对不起，您访问的页面不存在。',
    })

    unref(statusMapRef).set(500, {
      title: '500',
      status: '500',
      subTitle: '对不起，服务器错误。',
    })

    return () => {
      const { title, status, subTitle } = unref(getMapValue) || {}
      return <Result status={status as any} title={props.title || title} sub-title={props.subTitle || subTitle} />
    }
  },
})
</script>
<style lang="less"></style>
