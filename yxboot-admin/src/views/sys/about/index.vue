<template>
  <div class="page">
    <a-back-top />
    <a-card title="关于" style="margin-bottom: 10px">
      YXBoot 是一个开箱即用的前后台管理系统框架。YXBoot 以前后端分离的方式整合了前后端框架，前端框架使用了最新的vue3,
      vite4, Ant Design Vue 4.0, TypeScript 等主流技术开发，后端框架使用了最新的 SpringBoot3, Spring Security, JWT
      等技术。
    </a-card>
    <a-card title="项目信息" size="small" style="margin-bottom: 10px">
      <a-descriptions bordered size="small" :column="2">
        <a-descriptions-item label="版本">
          <a-tag color="blue">{{ infoData.version }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="最后编译时间">
          <a-tag color="blue">{{ infoData.lastBuildTime }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="文档地址">
          <a-button type="link" :href="infoData.doc" target="_blank" size="small">文档地址</a-button>
        </a-descriptions-item>
        <a-descriptions-item label="预览地址">
          <a-button type="link" :href="infoData.preview" target="_blank" size="small">预览地址</a-button>
        </a-descriptions-item>
        <a-descriptions-item label="Gitee">
          <a-button type="link" :href="infoData.gitee" target="_blank" size="small">Gitee</a-button>
        </a-descriptions-item>
        <a-descriptions-item label="Github">
          <a-button type="link" :href="infoData.github" target="_blank" size="small">Github</a-button>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="生产环境依赖" size="small" style="margin-bottom: 10px">
      <a-descriptions bordered size="small" :column="3">
        <template v-for="item in schema" :key="item.key">
          <a-descriptions-item :label="item.label">{{ lodashAt(dependencies, item.key).at(0) }}</a-descriptions-item>
        </template>
      </a-descriptions>
    </a-card>
    <a-card title="开发环境依赖" size="small" style="margin-bottom: 10px">
      <a-descriptions bordered size="small" :column="3">
        <template v-for="item in devSchema" :key="item.key">
          <a-descriptions-item :label="item.label">{{ lodashAt(devDependencies, item.key).at(0) }}</a-descriptions-item>
        </template>
      </a-descriptions>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { at as lodashAt } from 'lodash-es'

const { pkg, lastBuildTime } = __APP_INFO__
const { dependencies, devDependencies, version } = pkg

const schema: any = []
const devSchema: any = []
const infoData = {
  version,
  lastBuildTime,
  doc: 'http://admin.yxboot.com:9000/doc.html#/home',
  preview: 'http://admin.yxboot.com',
  gitee: 'https://gitee.com/yxboot/yxboot',
  github: 'https://github.com/boyazuo/yxboot',
}
Object.keys(dependencies).forEach((key) => {
  schema.push({ key, label: key })
})

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ key, label: key })
})
</script>
