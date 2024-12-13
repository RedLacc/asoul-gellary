<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import { User, Lock } from '@element-plus/icons-vue'
import type { LoginReq } from '@/types/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginInfo = ref<LoginReq>({
  username: '',
  password: '',
})

const remember = ref(true)
// const rules = reactive<FormRules>({
//   userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
//   password: [
//     { required: true, message: '请输入密码', trigger: 'blur' },
//     { pattern: /^[a-zA-Z0-9]{6,13}$/, message: '请输入6~13位字母或数字', trigger: 'change' },
//   ],
// })

const login = async (info: LoginReq) => {
  try {
    await useUserStore().login(info)
  } catch (error) {}
  await router.push({ path: '/records' })
}
</script>

<template>
  <div class="bg">
    <div class="login-container">
      <h1 class="title">登录</h1>
      <el-form :model="loginInfo">
        <el-form-item prop="userName">
          <el-input
            placeholder="请输入用户名"
            :prefix-icon="User"
            v-model="loginInfo.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            :prefix-icon="Lock"
            v-model="loginInfo.password"
            show-password
          ></el-input>
        </el-form-item>
        <div>
          <el-checkbox v-model="remember" label="记住密码"></el-checkbox>
        </div>
        <button class="login-button button" @click="login(loginInfo)">立即登录</button>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
/* 背景 */
.bg {
  position: relative;
  width: 100%;
  min-width: 1600px;
  height: 100%;
  min-height: 800px;
  background-image: url('../assets/background.avif');
  background-size: cover; /* 图片铺满容器 */
  background-position: center; /* 居中对齐 */
  background-repeat: no-repeat; /* 防止图片重复 */
  overflow: hidden;
  transition: all 0.5s;
}

/* 登录模块容器 */
.login-container {
  position: absolute;
  top: 150px;
  right: 250px;
  width: 400px;
  height: 550px;
  padding: 50px;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow:
    4px 4px 4px rgba(0, 0, 0, 0.25),
    -3px -3px 4px rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
}

/* 登录标题 */
.title {
  color: #fff;
  margin: 50px 0;
  user-select: none;
}

/* 登录按钮 */
.login-button {
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  color: #fff;
  background-color: #e799b0;
  user-select: none;
  border: none;
  border-radius: 15px;
}

/* 设置按钮 */
.setting-button {
  position: absolute;
  z-index: 6;
  bottom: 50px;
  left: 50px;
  font-size: 30px;
  color: #fff;
  transition: all 1s;
}

/* 设置按钮过渡动画 */
.setting-show {
  transform: rotate(90deg);
}

/* 遮罩 */
.shade {
  position: absolute;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
}

/* 遮罩过渡动画 */
.shade-enter-from,
.shade-leave-to {
  opacity: 0;
}

.shade-enter-active,
.shade-leave-active {
  transition: all 0.4s;
}

/* 设置模块容器 */
.setting-container {
  position: absolute;
  z-index: 10;
  left: calc(50% - 500px);
  bottom: calc(50% - 300px);
  display: flex;
  width: 1000px;
  height: 600px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  box-shadow:
    -2px -2px 2px rgba(255, 255, 255, 0.5),
    4px 4px 8px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

/* 设置模块过渡动画 */
.set-enter-from,
.set-leave-to {
  width: 0;
  height: 0;
  left: 50px;
  bottom: 50px;
  box-shadow: none;
}

.set-enter-active,
.set-leave-active {
  transition: all 0.4s;
}

/* 设置内容过渡 */
.set-content-enter-from,
.set-content-leave-to {
  opacity: 0;
}

.set-content-enter-active,
.set-content-leave-active {
  transition: all 0.25s;
}

/* 设置模块左侧导航 */
.setting-container > .tag-container {
  flex: 0 0 200px;
  height: 100%;
  margin-right: 10px;
  padding: 100px 0;
}

/* 导航标签 */
.tag-container > .tag {
  height: 40px;
  margin-bottom: 10px;
  border-radius: 0 20px 20px 0;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  color: var(--login-setting-tag-word);
  background-color: var(--login-setting-tag-bg);
  transition: all 0.4s;
}

/* 被选中标签样式 */
.tag-container > .active {
  color: var(--login-setting-tag-active-word);
  background-color: var(--login-setting-tag-active-bg);
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.25);
}

/* 设置的内容 */
.setting-container > .setting-content {
  width: 100%;
  height: 100%;
  padding: 30px;
}
</style>
<style>
/* 调整elementui默认样式 */
.el-form {
  width: 100%;
}

.el-input {
  height: 40px;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: var(--login-button);
  border-color: var(--login-button);
}

.el-checkbox__inner:hover {
  border-color: transparent;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #fff;
}

.el-checkbox {
  color: rgb(215, 215, 215);
}
</style>
