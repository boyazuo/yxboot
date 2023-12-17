<template>
  <a-page-header title="警告提示" :ghost="false" style="margin: -10px">
    <div>警告提示，展现需要关注的信息。</div>
  </a-page-header>

  <div class="page-wrapper">
    <a-row :gutter="20">
      <a-col :span="12">
        <Card title="基本用法">
          <div style="width: 300px">
            <a-alert message="Success Text" type="success" />
            <a-alert message="Info Text" type="info" class="mt-2" />
            <a-alert message="Warning Text" type="warning" class="mt-2" />
            <a-alert message="Error Text" type="error" class="mt-2" />
            <a-alert message="Success Tips" type="success" show-icon class="mt-2" />
            <a-alert message="Informational Notes" type="info" show-icon class="mt-2" />
            <a-alert message="Warning" type="warning" show-icon class="mt-2" />
            <a-alert message="Error" type="error" show-icon class="mt-2" />
          </div>
        </Card>
      </a-col>
      <a-col :span="12">
        <Card title="基本用法">
          <div style="width: 500px">
            <a-alert
              message="Success Tips"
              description="Detailed description and advices about successful copywriting."
              type="success"
              show-icon
            />
            <a-alert
              message="Informational Notes"
              description="Additional description and informations about copywriting."
              type="info"
              show-icon
              class="mt-2"
            />
            <a-alert
              message="Warning"
              description="This is a warning notice about copywriting."
              type="warning"
              show-icon
              class="mt-2"
            />
            <a-alert
              message="Error"
              description="This is an error message about copywriting."
              type="error"
              show-icon
              class="mt-2"
            />
          </div>
        </Card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue'
</script>
<style scoped>
  .page-wrapper {
    padding: 20px 0;
  }

  .anticon {
    vertical-align: middle;
  }
</style>
