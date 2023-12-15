<template>
  <a-card title="操作记录" :bordered="false">
    <div class="line-box">
      <a-timeline>
        <a-timeline-item v-for="item in opLogList" :key="item.id"
          >{{ item.createTime }} {{ item.operation }}
        </a-timeline-item>
      </a-timeline>
    </div>
  </a-card>
</template>

<script setup lang="ts">
  import { listOptionLog } from '@/api/sys/home'
  import { onMounted } from 'vue'

  const opLogList = ref([]) as any
  onMounted(() => {
    seleOpLogList()
  })
  const seleOpLogList = async () => {
    listOptionLog({ type: 2, size: 30 }).then((res) => {
      opLogList.value = res.data.records
    })
  }
</script>
<style scoped>
  .ant-timeline-item {
    padding-top: 5px;
    padding-bottom: 10px !important;
  }

  .line-box {
    height: 334px;
    overflow-y: auto;
  }

  .line-box::-webkit-scrollbar {
    display: none;
  }
</style>
