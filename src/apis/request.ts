import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/UserStore'

export const baseURL = 'http://localhost:53671'

export const request: AxiosInstance = axios.create({
  baseURL: `${baseURL}/fan-art`,
  withCredentials: true,
  timeout: 50000,
  headers: {},
})

request.interceptors.request.use(function (config) {
  const userStore = useUserStore()
  config.headers.append('token', userStore.token)
  console.log(config)
  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use(
  (resp) => {
    if (resp.data.code != 0) {
      ElMessage.error(resp.data.message)
    }
    return resp.data
  },
  (err) => {
    ElMessage.error(err)
  },
)
