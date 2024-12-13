import { defineStore } from 'pinia'
import { loginAPI, type LoginReq } from '@/apis/api'

export const useUserStore = defineStore('userInfo', {
  state: () => {
    return {
      token: '',
      userName: '',
      avatar: '',
    }
  },
  actions: {
    async login(loginData: LoginReq) {
      try {
        const resp = await loginAPI(loginData)
        this.token = resp.data.token
        this.userName = resp.data.userName
        this.avatar = resp.data.avatar
      } catch (error) {
        throw error
      }
    },
    logout() {
      this.token = ''
      this.userName = ''
      this.avatar = ''
    },
  },
  persist: true,
})
