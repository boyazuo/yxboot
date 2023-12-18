<template>
  <BasicDrawer :title="getTitle" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #frontChecked="{ model }">
        <span class="mr-5 text-base">前端配置</span>
        <a-switch v-model:checked="model.frontChecked" />
      </template>
      <template #backChecked="{ model }">
        <span class="mr-5 text-base">后端配置</span>
        <a-switch v-model:checked="model.backChecked" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { batchCodeGenerator, codeGenerator } from '@/api/dev/generator'
  import { useDrawerInner } from '@/components/Drawer'
  import { useForm } from '@/components/Form'
  import { message } from 'ant-design-vue'
  import { editFormSchema } from './generator.data'

  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const rowId = ref('')

  const getTitle = computed(() => (!unref(isUpdate) ? '批量生成' : '单独生成'))

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: editFormSchema,
    showActionButtonGroup: false
  })

  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    rowId.value = data.record?.tableName ?? null
    if (unref(isUpdate)) {
      setFieldsValue({ ...data.record })
    }
  })

  const handleSubmit = async () => {
    try {
      const values = await validate()
      const { frontChecked, backChecked } = values
      if (!frontChecked && !backChecked) return message.warning('至少选择一种模版')
      const type = frontChecked && backChecked ? null : frontChecked ? 1 : 2
      if (isUpdate.value) {
        const params = { table: rowId.value, ...values, type }
        codeGenerator(params).then(() => {
          emit('success')
          message.success('下载成功')
          closeDrawer()
        })
      } else {
        const params = { tables: rowId.value, ...values, type }
        batchCodeGenerator(params).then(() => {
          emit('success')
          message.success('下载成功')
          closeDrawer()
        })
      }
    } catch (error) {
      console.error('validate failed!', error)
    }
  }
</script>
