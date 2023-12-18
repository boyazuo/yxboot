<template>
  <BasicDrawer title="批量新增字典数据" @register="register" @ok="handleSubmit" width="800">
    <div class="top-box">
      <a-button v-auth="'sysDict:createData'" type="primary" @click="handleAddRow">增加</a-button>
    </div>
    <BasicForm @register="registerForm">
      <template #operation="{ schema }">
        <div class="operation">
          <Icon class="operation-item" icon="ant-design:close-circle-outlined" @click="handleDelRow(schema.rowKey)" />
        </div>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { saveDictData } from '@/api/sys/dictData'
  import { useDrawerInner } from '@/components/Drawer'
  import { useForm } from '@/components/Form'
  import { message } from 'ant-design-vue'
  import { editFormSchema_dictDataBatch as editFormSchema, inspectDictData } from './dict.data'

  const emit = defineEmits(['success', 'register'])

  const dictCode = ref('')
  let allDictData: any = null
  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields()
    setDrawerProps({ confirmLoading: false })
    dictCode.value = data.dictCode
    allDictData = data?.allDictData
    rowKeys.value = []
    handleAddRow()
  })

  const rowKeys: any = ref([])
  const handleAddRow = () => {
    rowKeys.value.push(new Date().getTime())
  }
  const handleDelRow = (rowKey) => {
    rowKeys.value.splice(rowKeys.value.indexOf(rowKey), 1)
  }

  const schemas = computed(() =>
    rowKeys.value.reduce(
      (arr, item, index) => [
        ...arr,
        ...editFormSchema.map((item2) => ({
          ...item2,
          rowKey: item,
          field: `${item2.field}@${item}`,
          label: `${item2.label}${index + 1}`
        }))
      ],
      []
    )
  )

  const [registerForm, { resetFields, validate }] = useForm({
    schemas,
    labelWidth: 100,
    showActionButtonGroup: false
  })

  const handleSubmit = async () => {
    try {
      const values = await validate()
      const valuesKeys = Object.keys(values)
      for (const rowKey of [...rowKeys.value]) {
        const paramsKeys = valuesKeys.filter((valuesKey) => valuesKey.includes(rowKey))
        const params = paramsKeys.reduce(
          (obj, paramsKey) => {
            const [_key] = paramsKey.split('@')
            obj[_key] = values[paramsKey]
            return obj
          },
          { dictCode: dictCode.value, status: 1 }
        )
        const inspectRes = inspectDictData(allDictData, params)
        if (inspectRes) message.warning(inspectRes)
        else {
          const flag: any = await handleSubmitSaveDictData(params)
          if (flag) {
            allDictData.push(params)
            handleDelRow(rowKey)
          }
        }
      }
      if (rowKeys.value.length === 0) {
        emit('success')
        closeDrawer()
      }
    } catch (error) {
      console.error('validate failed!', error)
    }
  }

  const handleSubmitSaveDictData = async (params) => {
    return await saveDictData(params).then((res) => {
      if (res.code === 0) {
        message.success(res.msg)
        return true
      } else {
        message.error(res.msg)
        return false
      }
    })
  }
</script>
<style lang="less" scoped>
  .top-box,
  .operation {
    display: flex;
    justify-content: flex-end;
  }

  .operation-item {
    cursor: pointer;
  }
</style>
