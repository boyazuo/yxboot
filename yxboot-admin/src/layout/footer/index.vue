<template>
  <a-layout-footer class="layout-footer" v-if="getShowLayoutFooter" ref="footerRef">
    <div>Copyright &copy;2022 YXBoot Admin</div>
  </a-layout-footer>
</template>

<script lang="ts">
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { openWindow } from '@/utils'

  export default defineComponent({
    name: 'LayoutFooter',
    setup() {
      const { getShowFooter } = useRootSetting()
      const { currentRoute } = useRouter()

      const footerRef = ref<ComponentRef>(null)

      const getShowLayoutFooter = computed(() => {
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
      })

      return {
        getShowLayoutFooter,
        openWindow,
        footerRef
      }
    }
  })
</script>
<style lang="less" scoped>
  @prefix-cls: ~'layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  @hover-color: rgba(0, 0, 0, 0.85);

  .@{prefix-cls} {
    color: @normal-color;
    text-align: center;

    &__links {
      margin-bottom: 8px;

      a {
        color: @normal-color;

        &:hover {
          color: @hover-color;
        }
      }
    }

    &__github {
      margin: 0 30px;

      &:hover {
        color: @hover-color;
      }
    }
  }
</style>
