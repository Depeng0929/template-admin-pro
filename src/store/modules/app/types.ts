import type { AppRouteRecordRaw } from '~/router/routes/types'

export interface AppState {
  colorWeak: boolean
  navbar: boolean
  menu: boolean
  topMenu: boolean
  hideMenu: boolean
  menuCollapse: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  globalSettings: boolean
  device: string
  tabBar: boolean
  menuFromServer: boolean
  serverMenu: AppRouteRecordRaw[]
  [key: string]: unknown
}
