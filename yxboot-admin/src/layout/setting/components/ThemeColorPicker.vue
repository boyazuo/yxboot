<template>
  <div :class="prefixCls">
    <template v-for="color in colorList || []" :key="color">
      <span
        @click="handleClick(color)"
        :class="[
          `${prefixCls}__item`,
          {
            [`${prefixCls}__item--active`]: def === color,
            [`${prefixCls}__item--white`]: color === '#ffffff'
          }
        ]"
        :style="{ background: color }"
      >
        <CheckOutlined />
      </span>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { useAppTheme } from '@/hooks/web/useTheme'
  import { CheckOutlined } from '@ant-design/icons-vue'
  import { HandlerEnum } from '../enum'
  import { baseHandler } from '../handler'

  const { setThemeColor } = useAppTheme()

  const props = defineProps({
    colorList: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    event: {
      type: Number as PropType<HandlerEnum>
    },
    def: {
      type: String
    }
  })

  const prefixCls = 'setting-theme-picker'

  function handleClick(color: string) {
    switch (props.event) {
      case HandlerEnum.CHANGE_THEME_COLOR:
        setThemeColor({ colorPrimary: color })
        break
    }
    props.event && baseHandler(props.event, color)
  }
</script>
<style lang="less">
  @prefix-cls: ~'setting-theme-picker';

  .@{prefix-cls} {
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0;
    justify-content: space-around;

    &__item {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 2px;

      svg {
        display: none;
      }

      &--active {
        border: 1px solid lighten(@primary-color, 10%);

        svg {
          display: inline-block;
          margin: 0 0 3px 3px;
          font-size: 12px;
          fill: @white !important;
        }
      }

      &--white {
        svg {
          fill: #000 !important;
        }
      }
    }
  }
</style>
