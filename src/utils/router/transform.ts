import type { RouteComponent } from 'vue-router'
import { ensurePrefix, objectMap } from '@depeng9527/tools'
import Layout from '~/layouts/default-layout.vue'
import type { AppRouteRecordRaw } from '~/router/routes/types'

// 通过后台菜单转为异步路由
export function processAsyncRouter(asyncMenus: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  return asyncMenus.map(route => loadComponent(route))
}

function loadComponent(rawRoute: AppRouteRecordRaw): AppRouteRecordRaw {
  const result = rawRoute as any as AppRouteRecordRaw

  result.component = convertComponent(rawRoute)

  if (
    rawRoute.children != null
    && rawRoute.children
    && rawRoute.children.length
  )
    result.children = processAsyncRouter(rawRoute.children) as any

  return result
}

// string转组件
function convertComponent(menu: AppRouteRecordRaw): RouteComponent | (() => Promise<RouteComponent>) {
  // TODO: 使用vite虚拟模块,select options
  if (!menu.component || menu.component === 'Layout')
    return Layout as RouteComponent
  else
    return LazyPageComponent(menu.component)
}

const pageRoutes = import.meta.glob<RouteComponent>(['~/pages/**/*.vue', '!**/components/**/*.vue'])
const pageModules = pathRouteComponentRecords()

function LazyPageComponent(view: string): () => Promise<RouteComponent> {
  const path = ensurePrefix('/', view)
  const componentsFn = pageModules[path]
  return componentsFn || (() => import('~/pages/[...all].vue'))
}

function pathRouteComponentRecords() {
  const subPath = (s: string) => {
    const result = s.split('pages/')[1].split('.vue')[0]
    return ensurePrefix('/', result)
  }
  return objectMap(pageRoutes, (k, v) => [subPath(k), v])
}
