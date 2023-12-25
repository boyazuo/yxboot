<template>
  <a-dropdown :trigger="getTrigger" placement="bottom" overlayClassName="tabs__dropdown" @menu-event="handleMenuEvent">
    <div :class="`${prefixCls}__info`" @contextmenu="handleContext" v-if="getIsTabs">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span :class="`${prefixCls}__extra-quick`" v-else @click="handleContext">
      <Icon icon="ion:chevron-down" />
    </span>
    <template #overlay>
      <a-menu>
        <template v-for="item in getDropMenuList" :key="`${item.event}`">
          <a-menu-item @click="handleClickMenu(item)" :disabled="item.disabled">
            <Icon :icon="item.icon" v-if="item.icon" />
            <span class="ml-1">{{ item.text }}</span>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${item.event}`" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
  import { Icon } from '@/components/Icon'
  import type { PropType } from 'vue'
  import { computed, unref } from 'vue'
  import type { RouteLocationNormalized } from 'vue-router'
  import { DropMenu, TabContentProps } from '../types'
  import { useTabDropdown } from '../useTabDropdown'

  const props = defineProps({
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null
    },
    isExtra: Boolean
  })
  const prefixCls = 'tabs-content'

  const getTitle = computed(() => {
    const { tabItem: { meta } = {} } = props
    return meta && meta.title
  })

  const getIsTabs = computed(() => !props.isExtra)

  const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] =>
    unref(getIsTabs) ? ['contextmenu'] : ['click']
  )

  const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(props as TabContentProps, getIsTabs)

  function handleContext(e) {
    props.tabItem && handleContextMenu(props.tabItem)(e)
  }

  function handleClickMenu(item: DropMenu) {
    const { event } = item
    const menu = unref(getDropMenuList).find((item) => `${item.event}` === `${event}`)
    handleMenuEvent(menu)
    item.onClick?.()
  }
</script>
