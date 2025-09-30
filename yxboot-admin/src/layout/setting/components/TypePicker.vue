<template>
  <div :class="prefixCls">
    <template v-for="item in typeList || []" :key="item.title">
      <Tooltip :title="item.title" placement="bottom">
        <div
          @click="handler(item)"
          :class="[
            `${prefixCls}__item`,
            `${prefixCls}__item--${item.type}`,
            {
              [`${prefixCls}__item--active`]: def === item.type
            }
          ]"
        >
          <div class="mix-sider"></div>
        </div>
      </Tooltip>
    </template>
  </div>
</template>
<script setup lang="ts">
import { Tooltip } from 'ant-design-vue'
import { PropType } from 'vue'
import type { SelectorType } from '#/config'

defineOptions({ name: 'TypePicker' })

defineProps({
  typeList: {
    type: Array as PropType<SelectorType[]>,
    default: () => [],
  },
  handler: {
    type: Function,
    default: () => ({}),
  },
  def: {
    type: String,
    default: '',
  },
})
const prefixCls = 'setting-menu-type-picker'
</script>
<style lang="less" scoped>
  @prefix-cls: ~'setting-menu-type-picker';

  .@{prefix-cls} {
    display: flex;

    &__item {
      position: relative;
      width: 56px;
      height: 48px;
      margin-right: 16px;
      overflow: hidden;
      cursor: pointer;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

      &::before,
      &::after {
        position: absolute;
        content: '';
      }

      &--light {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #fff;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      &--dark,
      &--sider {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      &--real-dark {
        background-color: #273352a9;

        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #273352a6;
        }
      }

      &--top-menu {
        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--mix-sider {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 15%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 35%;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }

        .mix-sider {
          position: absolute;
          top: 0;
          left: 15%;
          width: 20%;
          height: 100%;
          background-color: #273352a6;
        }
      }

      &:hover,
      &--active {
        padding: 12px;
        border: 2px solid var(--primary-color);

        &::before,
        &::after {
          border-radius: 0;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
</style>
