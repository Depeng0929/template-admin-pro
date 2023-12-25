import Mock from 'mockjs'
import type { ILoginRes } from './type'
import setupMock, { failResponseWrap, successResponseWrap } from '~/utils/setup-mock'
import { isLogin } from '~/utils/auth'
import type { AppRouteRecordRaw } from '~/router/routes/types'

setupMock({
  setup() {
    Mock.mock(new RegExp('/user/login'), () => {
      const data: ILoginRes = {
        access_token: '@guid',
        expires_in: 720,
      }
      return successResponseWrap(Mock.mock(data))
    })

    Mock.mock(new RegExp('/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('userRole') || 'admin'
        return successResponseWrap({
          name: '@cname()',
          avatar: '@image（“300*200”，‘#ff0000\',\'#fff\',\'gif\',\'坤坤\'）',
          email: '@email()',
          job: 'frontend',
          jobName: '前端艺术家',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'beijing',
          locationName: '@city',
          introduction: '人潇洒，性温存',
          personalWebsite: '@url',
          phone: '150****0000',
          registrationDate: '@datetime("yyyy-MM-dd HH:mm")',
          accountId: '@guid',
          certification: 1,
          role,
        })
      }
      return failResponseWrap({}, '未登录', 50008)
    })

    Mock.mock(new RegExp('/user/logout'), () => {
      return successResponseWrap({})
    })

    Mock.mock(new RegExp('/user/authCode'), () => {
      return successResponseWrap({})
    })

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList: AppRouteRecordRaw[] = [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: 'default-layout',
          meta: {
            locale: 'dashboard',
            requiresAuth: true,
            icon: 'icon-dashboard',
            order: 1,
          },
          children: [
            {
              path: 'workplace',
              name: 'Workplace',
              component: '/dashboard/workplace/index',
              meta: {
                locale: 'workplace',
                requiresAuth: true,
              },
            },
            {
              path: 'https://arco.design',
              name: 'arcoWebsite',
              component: '',
              meta: {
                locale: 'menu.arcoWebsite',
                requiresAuth: true,
              },
            },
          ],
        },
      ]
      return successResponseWrap(menuList)
    })
  },
})
