<template>
  <a-drawer v-bind="getBindValues" @close="handlClose" @ok="handleOk">
    <slot></slot>
    <template #footer v-if="showFooter">
      <div :style="{ textAlign: 'right' }">
        <slot name="drawerBtnBefore"></slot>
        <a-button v-bind="cancelButtonProps" class="mr-2" @click="handlClose" v-if="showCancelBtn">
          {{ cancelText }}
        </a-button>
        <a-button v-bind="okButtonProps" :type="okType" @click="handleOk" v-if="showOkBtn">
          {{ okText }}
        </a-button>
        <slot name="drawerBtnAfter"></slot>
      </div>
    </template>
  </a-drawer>
</template>

<script lang="ts">
  import { deepMerge } from '@/utils'
  import { isFunction } from '@/utils/is'
  import { computed, defineComponent, getCurrentInstance, nextTick, ref, unref, useAttrs, watch } from 'vue'
  import { basicProps } from './props'
  import type { DrawerInstance, DrawerProps } from './types/typing'

  export default defineComponent({
    inheritAttrs: false,
    props: basicProps,
    emits: ['visible-change', 'ok', 'close', 'register'],
    setup(props, { emit }) {
      const visibleRef = ref(false)
      const attrs = useAttrs()
      const propsRef = ref<Partial<Nullable<DrawerProps>>>(null)

      const drawerInstance: DrawerInstance = {
        setDrawerProps: setDrawerProps,
        emitVisible: undefined
      }

      const instance = getCurrentInstance()

      instance && emit('register', drawerInstance, instance.uid)

      const getMergeProps = computed((): DrawerProps => {
        return deepMerge(unref(props), unref(propsRef))
      })

      const getProps = computed((): DrawerProps => {
        const opt = {
          placement: 'right',
          width: '520',
          ...unref(attrs),
          ...unref(getMergeProps),
          visible: unref(visibleRef)
        }
        return opt as DrawerProps
      })

      const getBindValues = computed((): DrawerProps => {
        return {
          ...attrs,
          ...unref(getProps)
        }
      })

      const getLoading = computed(() => {
        return !!unref(getProps)?.loading
      })

      watch(
        () => props.visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = newVal
        },
        { deep: true }
      )

      watch(
        () => visibleRef.value,
        (visible) => {
          nextTick(() => {
            emit('visible-change', visible)
            instance && drawerInstance.emitVisible?.(visible, instance.uid)
          })
        }
      )

      // Cancel event
      async function handlClose(e: Recordable) {
        const { closeFunc } = unref(getProps)
        emit('close', e)
        if (closeFunc && isFunction(closeFunc)) {
          const res = await closeFunc()
          visibleRef.value = !res
          return
        }
        visibleRef.value = false
      }

      function setDrawerProps(props: Partial<DrawerProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)

        if (Reflect.has(props, 'visible')) {
          visibleRef.value = !!props.visible
        }
      }

      function handleOk() {
        emit('ok')
      }

      return {
        getMergeProps: getMergeProps as any,
        getProps: getProps as any,
        getLoading,
        getBindValues,
        handlClose,
        handleOk
      }
    }
  })
</script>
<style lang="less" scope></style>
