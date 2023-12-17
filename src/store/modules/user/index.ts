import { defineStore } from 'pinia'
import type { UserState } from './types'
import type { LoginData } from '~/api/user/type'

import { getUserInfo, userLogin, userLogout } from '~/api/user'
import { clearToken, setToken } from '~/utils/auth'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    phone: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },

    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    resetInfo() {
      this.$reset()
    },

    async info() {
      const res = await getUserInfo()

      this.setInfo(res)
    },

    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.access_token)
      }
      catch (err) {
        clearToken()
        throw err
      }
    },

    async logout() {
      try {
        await userLogout()
      }
      finally {
        this.logoutCallBack()
      }
    },

    logoutCallBack() {
      // 清除菜单
      // removeRouteListener();
      this.resetInfo()
      clearToken()
    },

  },
})

export default useUserStore
