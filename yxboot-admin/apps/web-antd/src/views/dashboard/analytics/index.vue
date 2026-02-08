<script setup lang="ts">
import { ref } from 'vue';
import { Card, Row, Col, Statistic, Tabs } from 'ant-design-vue';

const activeTab = ref('trends');

const overviewItems = [
  { title: '用户量', value: 2000, total: 120_000 },
  { title: '访问量', value: 20_000, total: 500_000 },
  { title: '下载量', value: 8000, total: 120_000 },
  { title: '使用量', value: 5000, total: 50_000 },
];
</script>

<template>
  <div class="min-h-full bg-background p-5">
    <h2 class="mb-4 text-lg font-semibold text-foreground">分析页</h2>

    <Row :gutter="[16, 16]" class="mb-5">
      <Col v-for="(item, i) in overviewItems" :key="i" :xs="24" :sm="12" :md="6">
        <Card class="overflow-hidden">
          <Statistic :title="item.title" :value="item.value" />
          <div class="text-muted-foreground mt-1 text-xs">
            总{{ item.title }}：{{ item.total.toLocaleString() }}
          </div>
        </Card>
      </Col>
    </Row>

    <Card class="mb-5" title="流量趋势">
      <Tabs v-model:activeKey="activeTab">
        <Tabs.TabPane key="trends" tab="流量趋势">
          <div class="flex h-64 items-center justify-center rounded border border-dashed border-border bg-muted/30">
            <span class="text-muted-foreground text-sm">图表占位 - 可接入 ECharts</span>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key="visits" tab="月访问量">
          <div class="flex h-64 items-center justify-center rounded border border-dashed border-border bg-muted/30">
            <span class="text-muted-foreground text-sm">月访问量图表</span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Card>

    <Row :gutter="[16, 16]">
      <Col :xs="24" :md="8">
        <Card title="访问数量">
          <div class="flex h-48 items-center justify-center rounded border border-dashed border-border bg-muted/30">
            <span class="text-muted-foreground text-sm">访问数量</span>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="8">
        <Card title="访问来源">
          <div class="flex h-48 items-center justify-center rounded border border-dashed border-border bg-muted/30">
            <span class="text-muted-foreground text-sm">访问来源</span>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :md="8">
        <Card title="访问销售">
          <div class="flex h-48 items-center justify-center rounded border border-dashed border-border bg-muted/30">
            <span class="text-muted-foreground text-sm">访问销售</span>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
