<template>
  <a-card title="访问记录" :bordered="false">
    <div class="line-box">
      <a-timeline>
        <a-timeline-item v-for="item in visLogList" :key="item.id"
          >{{ item.createTime }} {{ item.operation }}
          <p class="line-ip">{{ item.ip }}</p>
        </a-timeline-item>
      </a-timeline>
    </div>
  </a-card>
</template>

<script setup lang="ts">
  import { listOptionLog } from '@/api/sys/home'
  import { onMounted } from 'vue'

  const visLogList = ref([]) as any

  onMounted(() => {
    VisLogList()
  })
  // 查询数据
  const VisLogList = () => {
    listOptionLog({ type: 1, size: 30 }).then((res) => {
      visLogList.value = res.data.records
    })
  }
</script>
<style scoped>
  .ant-timeline-item {
    padding-top: 5px;
    padding-bottom: 10px !important;
  }

  .line-ip {
    margin-bottom: 0;
    color: rgb(188 189 190);
  }

  .line-box {
    height: 334px;
    overflow-y: auto;
  }

  .line-box::-webkit-scrollbar {
    display: none;
  }
</style>
