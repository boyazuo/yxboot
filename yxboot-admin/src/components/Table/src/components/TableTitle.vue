<template>
  <BasicTitle :class="prefixCls" v-if="getTitle" :helpMessage="helpMessage">
    {{ getTitle }}
  </BasicTitle>
</template>
<script lang="ts">
  import { BasicTitle } from '@/components/Basic/index'
  import { isFunction } from '@/utils/is'
  import { computed, defineComponent, PropType } from 'vue'

  export default defineComponent({
    name: 'BasicTableTitle',
    components: { BasicTitle },
    props: {
      title: {
        type: [Function, String] as PropType<string | ((data: Recordable) => string)>
      },
      getSelectRows: {
        type: Function as PropType<() => Recordable[]>
      },
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>
      }
    },
    setup(props) {
      const prefixCls = 'table-title'

      const getTitle = computed(() => {
        const { title, getSelectRows = () => {} } = props
        let tit = title

        if (isFunction(title)) {
          tit = title({
            selectRows: getSelectRows()
          })
        }
        return tit
      })

      return { getTitle, prefixCls }
    }
  })
</script>
<style lang="less">
  @prefix-cls: ~'table-title';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
</style>
