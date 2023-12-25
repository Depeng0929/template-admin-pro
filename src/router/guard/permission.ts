import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { appRoutes } from '../routes'
import { NOT_FOUND, WHITE_LIST } from '../constants'
import type { AppRouteRecordRaw } from '~/router/routes/types'
import { useAppStore, useUserStore } from '~/store'
import { processAsyncRouter } from '~/utils/router/transform'
import { isExternal } from '~/utils/validate'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const Permission = usePermission()

    const permissionsAllow = Permission.accessRouter(to)
    if (appStore.menuFromServer) {
      if (
        !appStore.appAsyncMenus.length
        && !WHITE_LIST.find(el => el.name === to.name)
      ) {
        // 生成路由
        await appStore.fetchServerMenuConfig()
        const asyncRoutes = processAsyncRouter(appStore.appAsyncMenus)
        asyncRoutes.forEach((r) => {
          if (!isExternal(r.path))
            router.addRoute(r as any)
        })
      }

      const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST]

      let exist = false
      while (serverMenuConfig.length && !exist) {
        const element = serverMenuConfig.shift()
        // name不能有重复，需要后台判断
        if (element?.name === to.name)
          exist = true

        if (element?.children) {
          serverMenuConfig.push(
            ...(element.children as unknown as AppRouteRecordRaw[]),
          )
        }
      }
      if (exist && permissionsAllow)
        next()

      else next(NOT_FOUND)
    }
    else {
      if (permissionsAllow) {
        next()
      }
      else {
        const destination
          = Permission.findFirstPermissionRoute(appRoutes, userStore.role)
          || NOT_FOUND
        next(destination)
      }
    }
    NProgress.done()
  })
}
