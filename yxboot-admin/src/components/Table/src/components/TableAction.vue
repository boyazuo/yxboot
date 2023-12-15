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
  </div>
</template>
<script lang="ts" setup>
  import { PopConfirmButton } from '@/components/Button'
  import Icon from '@/components/Icon/index'
  import { ActionItem } from '@/components/Table'
  import { usePermission } from '@/hooks/web/usePermission'
  import { isBoolean, isFunction, isString } from '@/utils/is'
  import { propTypes } from '@/utils/propTypes'
  import { Divider, TooltipProps } from 'ant-design-vue'
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
