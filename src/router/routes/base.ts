import type { RouteRecordRaw } from 'vue-router'
import { REDIRECT_ROUTE_NAME } from '~/router/constants'

export const DEFAULT_LAYOUT = () => import('~/layouts/default-layout.vue')

export const REDIRECT_MAIN: RouteRecordRaw = {
  path: '/redirect/:path',
  name: REDIRECT_ROUTE_NAME,
  component: () => import('~/pages/redirect/[path].vue'),
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('~/pages/[...all].vue'),
}
