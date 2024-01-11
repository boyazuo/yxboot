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
  import { useAppConfig } from '@/hooks/config/useAppConfig'
  import { CheckOutlined } from '@ant-design/icons-vue'
  import { HandlerEnum } from '../enum'

  const { baseHandler } = useAppConfig()

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
