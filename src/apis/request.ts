import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/UserStore'

export const baseURL = 'http://localhost:53671'

export const request: AxiosInstance = axios.create({
  baseURL: `${baseURL}/fan-art`,
  withCredentials: true,
  timeout: 50000,
  headers: {},
})

request.interceptors.request.use(
  function (config) {
    const userStore = useUserStore()
    config.headers.token = userStore.token
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (resp) => {
    if (resp.data.code !== 0) {
      throw new Error(resp.data.message) // Better to throw an Error object
    }
    return resp.data
  },
  (err) => {
    return Promise.reject(err)
  },
)
