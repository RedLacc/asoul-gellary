<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { checkRecord, getRecords } from '@/apis/api'
import type { RecordItem } from '@/types/api'
import { ElMessage } from 'element-plus'
import type { CheckResult } from '@/types/enum'

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
    ElMessage.error((e as Error).message)
  }
}

const check = async (id: number, result: CheckResult) => {
  try {
    await checkRecord(id, result)
    records.value = records.value.filter((item) => item.id !== id)
  } catch (e) {
    ElMessage.error((e as Error).message)
  }
}

onMounted(() => {
  loadMoreRecords()
})
</script>

<template>
  <div
    class="gallery-container"
    v-infinite-scroll="loadMoreRecords"
    :infinite-scroll-disabled="!hasMore"
    :infinite-scroll-distance="600"
  >
    <div v-for="item in records" :key="item.id" class="image-item">
      <a :href="'https://' + item.dynamic_URL" target="_blank">
        <img :src="item.URL" alt="Image" class="image" />
      </a>
      <div class="button-group">
        <button style="background-color: #e799b0" @click="check(item.id, 1)">是</button>
        <button style="background-color: #9ac8e2" @click="check(item.id, 0)">否</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.button-group button {
  flex: 1;
  padding: 10px;
}

.gallery-container {
  column-count: 4;
  column-gap: 20px;
  column-fill: balance;
  padding: 2rem;
}

.image-item {
  overflow: hidden;
  border-radius: 8px;
  margin: 10px 0;
  background-color: #f8f8f8;
}

.image {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.image:hover {
  transform: scale(1.05);
}

button {
  padding: 10px 20px;
  font-size: 20px;
  border: none;
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
</style>
