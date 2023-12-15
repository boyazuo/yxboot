<template>
  <BasicDrawer :title="getTitle" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { saveDictData } from '@/api/sys/dictData'
  import { useDrawerInner } from '@/components/Drawer'
  import { useForm } from '@/components/Form'
  import { message } from 'ant-design-vue'
  import { editFormSchema_dictData as editFormSchema, inspectDictData } from './dict.data'

  const emit = defineEmits(['success'])

  const isUpdate = ref(true)
  const getTitle = computed(() => (!unref(isUpdate) ? '新增字典数据' : '编辑字典数据'))

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: editFormSchema,
    labelWidth: 120,
    showActionButtonGroup: false
  })

  let allDictData: any = null
  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    allDictData = data?.allDictData
    setFieldsValue({ ...data.record })
  })

  const handleSubmit = async () => {
    try {
      const values = await validate()
      const inspectRes = inspectDictData(allDictData, values)
      if (inspectRes) return message.warning(inspectRes)
      saveDictData(values).then((res) => {
        if (res.code === 0) {
          emit('success')
          message.success(res.msg)
          closeDrawer()
        } else {
          message.error(res.msg)
        }
      })
    } catch (error) {
      console.error('validate failed!', error)
    }
  }
</script>
