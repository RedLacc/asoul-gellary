<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { checkRecord, getRecords } from '@/apis/api'
import type { RecordItem } from '@/types/api'
import { ElMessage } from 'element-plus'

const records = ref<RecordItem[]>([])
const hasMore = ref(false)
const offset = ref(0)
const loading = ref(false) // 用于显示加载状态

const loadMoreRecords = async () => {
  loading.value = true // 开始加载
  try {
    const resp = await getRecords(offset.value)
    if (resp && resp.data && resp.data.items) {
      records.value.push(...resp.data.items)
      offset.value = resp.data.offset
      hasMore.value = resp.data.has_more
    }
  } catch (e) {
    ElMessage.error(e as Error)
  }
}

onMounted(() => {
  loadMoreRecords() // 初始化时加载图片
})
</script>

<template>
  <div class="gallery-container">
    <div v-for="item in records" :key="item.id" class="image-item">
      <img :src="item.URL" alt="Image" class="image" />
      <div class="button-group">
        <button style="text-align: left" @click="checkRecord(item.id, 1)">是</button>
        <button style="text-align: right" @click="checkRecord(item.id, 0)">否</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  column-count: 4;
  column-gap: 20px;
  column-fill: balance;
  padding: 2rem;
}

.image-item {
  overflow: hidden;
  border-radius: 8px;
  background-color: #f8f8f8;
}

.image {
  width: 100%;
  height: auto;
  /* 确保图片保持原比例 */
  object-fit: contain;
  /* 确保图片不被裁剪，保持原有宽高比例 */
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.image:hover {
  transform: scale(1.05);
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  /* 设置占位符的固定高度 */
  background-color: #e0e0e0;
  color: #999;
  border-radius: 8px;
}

.image-title {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

.load-more {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
