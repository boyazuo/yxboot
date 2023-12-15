<template>
  <div class="page">
    <a-card title="基本信息">
      <a-form ref="formRef" :model="formData" :labelCol="{ span: 2 }" :wrapperCol="{ span: 6 }">
        <a-form-item label="登录账号">
          <a-input v-model:value="formData.username" disabled />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item label="性别">
          <a-select v-model:value="formData.sex">
            <a-select-option :value="1">男</a-select-option>
            <a-select-option :value="2">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="手机号">
          <a-input v-model:value="formData.phone" />
        </a-form-item>
        <a-form-item label="电子邮箱">
          <a-input v-model:value="formData.email" />
        </a-form-item>
        <a-form-item :wrapperCol="{ offset: 2 }">
          <a-button type="primary" @click="handleSubmit">更新基本信息</a-button>
        </a-form-item>
      </a-form>
      <div class="avatar-box">
        <h2 class="avatar-title">用户头像</h2>
        <div class="avatar-wrap">
          <a-upload
            list-type="picture-card"
            :show-upload-list="false"
            :before-upload="() => false"
            @change="handleChangeAvatar"
          >
            <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" class="avatar-img" />
            <div v-else>
              <plus-outlined />
              <div class="avatar-upload-text">上传头像</div>
            </div>
          </a-upload>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { profile } from '@/api/sys/auth'
  import { uploadFile } from '@/api/sys/file'
  import { saveUser } from '@/api/sys/user'
  import { useUserStoreWithOut } from '@/store/modules/user'
  import type { UploadChangeParam } from 'ant-design-vue'
  import { message } from 'ant-design-vue'

  type formDataType = {
    username: ''
    name: ''
    sex: ''
    phone: ''
    email: ''
    userId: ''
  }
  let formData: formDataType = reactive({
    username: '',
    name: '',
    sex: '',
    phone: '',
    email: '',
    userId: ''
  })

  const handleSubmit = () => {
    saveUser(formData).then((res: any) => {
      if (res.code === 0) {
        message.success(res.msg)
      } else {
        message.warning(res.msg)
      }
    })
  }

  const avatarUrl = ref('')
  const userStore = useUserStoreWithOut()
  const handleChangeAvatar = (info: UploadChangeParam) => {
    uploadFile({ file: info.file }).then((res) => {
      if (res.code === 0) {
        avatarUrl.value = res.data.url
        userStore.setAvatar(avatarUrl.value)
        saveUser({ avatar: avatarUrl.value, userId: formData.userId }).then((res: any) => {
          if (res.code === 0) message.success(res.msg)
          else message.warning(res.msg)
        })
      } else message.warning(res.data.msg)
    })
  }

  const loadUserInfo = async () => {
    const result = await profile()
    let key: keyof formDataType
    for (key in formData) {
      formData[key] = result.data[key]
    }
    avatarUrl.value = result.data.avatar
  }

  loadUserInfo()
</script>

<style lang="less" scoped>
  .avatar-box {
    position: absolute;
    left: 45%;
    top: 85px;

    .avatar-title {
      font-size: 20px;
      font-weight: 700;
    }

    .avatar-wrap {
      .avatar-img {
        width: 100px;
        height: 100px;

        .avatar-upload-text {
          display: inline-flex;
        }
      }
    }
  }
</style>
