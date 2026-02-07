<template>
  <a-page-header title="按钮" :ghost="false" style="margin: -10px">
    <div>标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。</div>
  </a-page-header>

  <div class="page-wrapper">
    <a-card title="基础用法">
      <div>
        <a-button>默认按钮</a-button>
        <a-button type="primary" class="ml-2">主要按钮</a-button>
        <a-button type="primary" danger class="ml-2">危险按钮</a-button>
        <a-button type="dashed" class="ml-2">虚线按钮</a-button>
        <a-button type="text" class="ml-2">文本按钮</a-button>
        <a-button type="link" class="ml-2">链接按钮</a-button>
      </div>
      <div class="my-2">
        <a-button disabled>默认按钮(禁用)</a-button>
        <a-button disabled type="primary" class="ml-2">主要按钮(禁用)</a-button>
        <a-button disabled type="primary" danger class="ml-2">危险按钮(禁用)</a-button>
        <a-button disabled type="dashed" class="ml-2">虚线按钮(禁用)</a-button>
        <a-button disabled type="text" class="ml-2">文本按钮(禁用)</a-button>
        <a-button disabled type="link" class="ml-2">链接按钮(禁用)</a-button>
      </div>
      <div class="my-2">
        <a-button size="large">大号按钮</a-button>
        <a-button size="middle" class="ml-2">默认按钮</a-button>
        <a-button size="small" class="ml-2">小号按钮</a-button>
      </div>
    </a-card>

    <a-card title="图标按钮" class="my-2">
      <div>
        <a-tooltip title="search">
          <a-button type="primary" shape="circle" :icon="h(SearchOutlined)" />
        </a-tooltip>
        <a-button type="primary" shape="circle" class="ml-2">A</a-button>
        <a-button type="primary" :icon="h(SearchOutlined)" class="ml-2">Search</a-button>
        <a-tooltip title="search">
          <a-button shape="circle" :icon="h(SearchOutlined)" class="ml-2" />
        </a-tooltip>
        <a-button :icon="h(SearchOutlined)" class="ml-2">Search</a-button>

        <a-button type="primary" :icon="h(EditOutlined)" class="ml-2" />
        <a-button type="primary" :icon="h(ShareAltOutlined)" class="ml-2" />
        <a-button type="primary" :icon="h(DownloadOutlined)" class="ml-2" />
        <a-button type="primary" class="ml-2">
          <template #icon>
            <DownloadOutlined />
          </template>
          Download
        </a-button>
      </div>
    </a-card>

    <a-card title="Loading 按钮" class="my-2">
      <div>
        <a-button type="primary" loading />
        <a-button type="primary" loading class="ml-2">Loading</a-button>
      </div>
    </a-card>

    <a-card title="幽灵按钮" class="my-2">
      <div :style="{ background: 'rgb(190, 200, 200)', padding: '16px 16px' }">
        <a-button type="primary" ghost>Primary</a-button>
        <a-button ghost class="ml-2">Default</a-button>
        <a-button type="dashed" ghost class="ml-2">Dashed</a-button>
        <a-button type="primary" danger ghost class="ml-2">Danger</a-button>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { DownloadOutlined, EditOutlined, SearchOutlined, ShareAltOutlined } from '@ant-design/icons-vue'
</script>
<style scoped>
  .page-wrapper {
    padding: 20px 0;
  }

  .anticon {
    vertical-align: middle;
  }
</style>
