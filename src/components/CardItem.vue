<script lang="ts" setup>
import { ref, defineProps } from 'vue'

defineProps({
  backgroundImage: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
})

const isHovered = ref(false)
</script>

<template>
  <div
    class="card"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="overlay" v-if="isHovered">
      <div class="author-info">
        <img class="avatar" :src="authorAvatar" alt="author avatar" />
        <span class="author-name">{{ authorName }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  padding: 16px;
  box-sizing: border-box;
}

.author-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid #fff;
}

.author-name {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
</style>
