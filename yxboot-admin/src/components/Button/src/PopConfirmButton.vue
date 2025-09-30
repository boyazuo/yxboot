<script lang="ts">
import { Popconfirm } from 'ant-design-vue'
import { omit } from 'lodash-es'
import { computed, defineComponent, h, unref, useAttrs } from 'vue'
import { extendSlots } from '@/utils/helper/tsxHelper'
import BasicButton from './BasicButton.vue'

const props = {
  enable: {
    type: Boolean,
    default: true,
  },
}

export default defineComponent({
  name: 'PopButton',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const attrs = useAttrs()

    // get inherit binding value
    const getBindValues = computed(() => {
      return Object.assign(
        {
          placement: 'topRight',
          okText: '确认',
          cancelText: '取消',
        },
        { ...props, ...unref(attrs) },
      )
    })

    return () => {
      const bindValues = omit(unref(getBindValues), 'icon') as Recordable
      const btnBind = omit(bindValues, 'title') as Recordable
      if (btnBind.disabled) btnBind.color = ''
      const Button = h(BasicButton, btnBind, extendSlots(slots))

      // If it is not enabled, it is a normal button
      if (!props.enable) {
        return Button
      }
      return h(Popconfirm, bindValues, { default: () => Button })
    }
  },
})
</script>
