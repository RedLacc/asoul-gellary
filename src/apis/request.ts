import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const baseURL = 'http://localhost:53671'

export const request: AxiosInstance = axios.create({
  baseURL: `${baseURL}/fan-art`,
  withCredentials: true,
  timeout: 5000,
  headers: {},
})

request.interceptors.response.use(
  (resp) => {
    if (resp.data.code != 0) {
      console.error(resp.data.message)
    }
    return resp.data
  },
  (err) => {
    console.error(err)
  },
)

