import Mock from 'mockjs'
import type { ILoginRes } from './type'
import setupMock, { failResponseWrap, successResponseWrap } from '~/utils/setup-mock'
import { isLogin } from '~/utils/auth'

setupMock({
  setup() {
    Mock.mock(new RegExp('/user/login'), () => {
      const data: ILoginRes = {
        access_token: '111',
        expires_in: 720,
      }
      return successResponseWrap(Mock.mock(data))
    })

    Mock.mock(new RegExp('/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('userRole') || 'admin'
        return successResponseWrap({
          name: '王立群',
          avatar:
            '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
          email: 'wangliqun@email.com',
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
  },
})
