<template>
  <div class="table-body__action">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <a-tooltip v-if="action.tooltip" v-bind="getTooltip(action.tooltip)">
        <PopConfirmButton v-bind="action">
          <Icon :icon="action.icon" :class="{ 'mr-1': !!action.label }" v-if="action.icon" />
          <template v-if="action.label">{{ action.label }}</template>
        </PopConfirmButton>
      </a-tooltip>
      <PopConfirmButton v-else v-bind="action">
        <Icon :icon="action.icon" :class="{ 'mr-1': !!action.label }" v-if="action.icon" />
        <template v-if="action.label">{{ action.label }}</template>
      </PopConfirmButton>
      <Divider type="vertical" class="action-divider" v-if="divider && index < getActions.length - 1" />
    </template>

    <Divider type="vertical" class="action-divider" v-if="divider && dropDownActions && getDropdownList.length > 0" />
    <a-dropdown :trigger="['hover']" v-if="dropDownActions && getDropdownList.length > 0">
      <a-button type="link" size="small"> <MoreOutlined class="icon-more" /> </a-button>
      <template #overlay>
        <a-menu>
          <template v-for="item in getDropdownList">
            <a-menu-item @click="item.onClick" :disabled="item.disabled">
              <a-popconfirm v-if="item.popConfirm" v-bind="getPopConfirmAttrs(item.popConfirm)">
                <template #icon v-if="item.popConfirm.icon">
                  <Icon :icon="item.popConfirm.icon" />
                </template>
                <div>
                  <Icon :icon="item.icon" v-if="item.icon" />
                  <span class="ml-1">{{ item.label }}</span>
                </div>
              </a-popconfirm>
              <template v-else>
                <Icon :icon="item.icon" v-if="item.icon" />
                <span class="ml-1">{{ item.label }}</span>
              </template>
            </a-menu-item>
            <a-menu-divider v-if="item.divider" />
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts" setup>
  import { PopConfirmButton } from '@/components/Button'
  import Icon from '@/components/Icon/index'
  import { ActionItem } from '@/components/Table'
  import { usePermission } from '@/hooks/web/usePermission'
  import { isBoolean, isFunction, isString } from '@/utils/is'
  import { propTypes } from '@/utils/propTypes'
  import { MoreOutlined } from '@ant-design/icons-vue'
  import { Divider, TooltipProps } from 'ant-design-vue'
  import { omit } from 'lodash-es'
  import { computed, toRaw, unref } from 'vue'

  const { hasPermission } = usePermission()

  const props = defineProps({
    actions: {
      type: Array as PropType<ActionItem[]>,
      default: null
    },
    dropDownActions: {
      type: Array as PropType<ActionItem[]>,
      default: null
    },
    divider: propTypes.bool.def(true),
    outside: propTypes.bool,
    stopButtonPropagation: propTypes.bool.def(false)
  })

  let table: Partial<any> = {}

  const isIfShow = (action: ActionItem): boolean => {
    const ifShow = action.ifShow

    let isIfShow = true

    if (isBoolean(ifShow)) {
      isIfShow = ifShow
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(action)
    }
    return isIfShow
  }

  const getActions = computed(() => {
    return (toRaw(props.actions) || [])
      .filter((action) => {
        return hasPermission(action.auth) && isIfShow(action)
      })
      .map((action) => {
        const { popConfirm } = action
        return {
          getPopupContainer: () => unref((table as any)?.wrapRef?.value) ?? document.body,
          type: 'link',
          size: 'small',
          ...action,
          ...(popConfirm || {}),
          onConfirm: popConfirm?.confirm,
          onCancel: popConfirm?.cancel,
          enable: !!popConfirm
        }
      })
  })

  const getDropdownList = computed((): any[] => {
    const list = (toRaw(props.dropDownActions) || []).filter((action) => {
      return hasPermission(action.auth) && isIfShow(action)
    })
    return list.map((action, index) => {
      const { popConfirm } = action
      return {
        ...action,
        ...popConfirm,
        onConfirm: popConfirm?.confirm,
        onCancel: popConfirm?.cancel,
        divider: index < list.length - 1 ? props.divider : false
      }
    })
  })

  const getPopConfirmAttrs = computed(() => {
    return (attrs) => {
      const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon'])
      if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm)) originAttrs['onConfirm'] = attrs.confirm
      if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel)) originAttrs['onCancel'] = attrs.cancel
      return originAttrs
    }
  })

  function getTooltip(data?: string | TooltipProps): TooltipProps {
    return {
      // getPopupContainer: () => unref((table as any)?.wrapRef.value) ?? document.body,
      placement: 'bottom',
      ...(isString(data) ? { title: data } : data)
    }
  }
</script>
<style lang="less" scope>
  .table-body__action {
    text-align: center;
  }
</style>
