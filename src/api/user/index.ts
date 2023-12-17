import type { ILoginRes, LoginData } from './type'
import type { UserState } from '~/store/modules/user/types'

import http from '~/utils/http'

export function userLogin(data: LoginData) {
  return http.post<null, ILoginRes, LoginData>('/user/login', data)
}

export function userLogout() {
  return http.post<null, null>('/user/logout')
}

export function getUserInfo() {
  return http.post<null, UserState>('/user/info')
}

export function getAuthCode() {
  return http.post<null, string>('/user/authCode')
}
