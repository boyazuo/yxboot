<template>
  <div ref="wrapRef">
    <a-tree ref="treeElRef" v-bind="getBindValues" />
  </div>
</template>
<script lang="ts" setup>
  import type { CheckKeys, KeyType, TreeProps } from './tree'

  import { omit } from 'lodash-es'
  import { treeEmits, treeProps } from './tree'

  const treeElRef = ref(null)

  const attrs = useAttrs()
  const props = defineProps(treeProps)
  const emit = defineEmits(treeEmits)

  const getBindValues = computed(() => {
    let propsData = {
      blockNode: true,
      ...attrs,
      ...props,
      'onUpdate:expandedKeys': (v: KeyType[]) => {
        emit('update:expandedKeys', v)
      },
      'onUpdate:selectedKeys': (v: KeyType[]) => {
        emit('update:selectedKeys', v)
      },
      onCheck: (v: CheckKeys, e) => {
        let checkedKeys
        if (!props.checkStrictly) {
          checkedKeys = { checked: v, halfChecked: e.halfCheckedKeys }
        } else {
          checkedKeys = v
        }
        emit('update:checkedKeys', checkedKeys)
        emit('check', checkedKeys, e)
      }
    }
    return omit(propsData, 'class') as TreeProps
  })
</script>
./tree./tree
