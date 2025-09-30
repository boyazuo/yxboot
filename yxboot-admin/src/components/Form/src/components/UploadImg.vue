<template>
  <a-upload
    class="upload-img"
    list-type="picture-card"
    :show-upload-list="false"
    :before-upload="() => false"
    accept=".png,.jpg,.jepg"
    @change="handleChangeOssImg"
  >
    <img v-if="ImgUrl" :src="ImgUrl" class="img" />
    <div v-else>{{ attrs?.placeholder }}</div>
  </a-upload>
  <div v-if="proposal" class="proposal">{{ proposal }}</div>
</template>
<script setup lang="ts">
/**
 * 上传图片 组件
 * @date 2023-08-15
 * @author caohy
 * @Email 482315166@qq.com
 */

import { message, UploadChangeParam } from 'ant-design-vue'
import { uploadFile } from '@/api/sys/file'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  proposal: {
    type: String,
    default: '',
  },
})
const attrs = useAttrs()

const emits = defineEmits(['update:value'])

const ImgUrl = computed({
  get() {
    return props.value
  },
  set(value) {
    emits('update:value', value)
  },
})

const handleChangeOssImg = (info: UploadChangeParam) => {
  uploadFile({ file: info.file }).then((res) => {
    if (res.code === 0) {
      ImgUrl.value = res.data.url
      message.success(res.msg)
    } else message.warning(res.data.msg)
  })
}
</script>
<style lang="less" scoped>
  .upload-img {
    :deep(.ant-upload.ant-upload-select-picture-card) {
      margin-bottom: 0 !important;
    }

    .img {
      width: 100px;
      max-height: 100px;
      object-fit: cover;
    }
  }

  .proposal {
    user-select: none;
    color: rgb(0 0 0 / 55%);
  }
</style>
