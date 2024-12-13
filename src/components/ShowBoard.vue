<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { checkRecord, getRecords, type RecordItem } from '@/apis/api'
import { ElMessage } from 'element-plus'

const records = ref<RecordItem[]>([])
const loading = ref(true)

async function fetchRecords() {
  try {
    const response = await getRecords('')
    records.value = response.data.items
  } catch (error) {
    ElMessage.error(error as Error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRecords()
})
</script>

<template>
  <div class="gallery-container">
    <div class="image-grid">
      <div v-for="item in records" :key="item.id" class="image-item">
        <img :src="item.URL" alt="Image" class="image" />
        <div class="button-group">
          <button @click="checkRecord(item.id, 1)">是</button>
          <button @click="checkRecord(item.id, 0)">否</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  padding: 20px;
  text-align: center;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 固定为5列 */
  grid-gap: 15px;
  /* 图片之间的间距 */
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
  /* 鼠标悬停时轻微放大 */
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
