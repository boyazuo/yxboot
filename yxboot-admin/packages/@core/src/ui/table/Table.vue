<script setup lang="ts">
import type { TableColumn } from './types';

interface Props {
  columns: TableColumn[];
  data?: any[];
  loading?: boolean;
  rowKey?: string | ((row: any) => string);
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  loading: false,
  rowKey: 'id',
});

function getRowKey(row: any, index: number) {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row);
  }
  return row?.[props.rowKey] ?? index;
}
</script>

<template>
  <div class="core-table-wrap">
    <div v-if="loading" class="core-table__loading">加载中...</div>
    <table class="core-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.prop" :style="{ width: col.width ? (typeof col.width === 'number' ? `${col.width}px` : col.width) : undefined }">
            {{ col.label }}
          </th>
          <th v-if="$slots.actions" class="core-table__actions-th">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="getRowKey(row, index)">
          <td v-for="col in columns" :key="col.prop">
            <slot :name="col.slot ?? col.prop" :row="row" :column="col" :value="row[col.prop]">
              {{ row[col.prop] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="core-table__actions-td">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.core-table-wrap {
  position: relative;
  width: 100%;
  overflow: auto;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background: hsl(var(--background));
}
.core-table__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(var(--overlay-content));
  z-index: 1;
  font-size: 14px;
  color: hsl(var(--foreground));
}
.core-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.core-table th,
.core-table td {
  padding: 12px 16px;
  border-bottom: 1px solid hsl(var(--border));
  text-align: left;
}
.core-table th {
  font-weight: 600;
  color: hsl(var(--foreground));
  background: hsl(var(--muted));
}
.core-table tbody tr {
  transition: background 0.15s;
}
.core-table tbody tr:hover {
  background: hsl(var(--accent));
}
.core-table__actions-th,
.core-table__actions-td {
  width: 120px;
  text-align: center;
}
</style>
