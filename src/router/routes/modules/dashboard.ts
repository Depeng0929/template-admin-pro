import type { AppRouteRecordRaw } from '../types'
import { DEFAULT_LAYOUT } from '../base'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('~/pages/dashboard/workplace/index.vue'),
      meta: {
        locale: 'dashboard.workplace',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default DASHBOARD
