import { defineStore } from 'pinia'
import type { AppState } from './types'
import type { AppRouteRecordRaw } from '~/router/routes/types'
import defaultSettings from '~/config/settings.json'
import { getMenuList } from '~/api/user'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
    appDevice(state: AppState) {
      return state.device
    },
    appAsyncMenus(state: AppState): AppRouteRecordRaw[] {
      return state.serverMenu as unknown as AppRouteRecordRaw[]
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-expect-error-next-line
      this.$patch(partial)
    },

    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    async fetchServerMenuConfig() {
      try {
        this.serverMenu = await getMenuList()
      }
      catch (error) {
        // error
      }
    },
    clearServerMenu() {
      this.serverMenu = []
    },
  },
})

export default useAppStore
