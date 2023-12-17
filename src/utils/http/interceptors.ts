import { isEmpty } from '@depeng9527/tools'
import { isNil, omit } from 'rambda'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '~/utils/auth'
import { useUserStore } from '~/store'

export function requestInterceptors(config: AxiosRequestConfig) {
  const token = getToken() || ''
  config.headers!.Authorization = `${token}`

  return config
}

export function responseInterceptors(response: AxiosResponse<API.AppHttpResponse<any>>) {
  const res = response.data
  if (
    res && res.code === 200
  ) {
    const dataRes = omit(['code', 'msg', 'fail'], res)
    const keyLen = Object.keys(dataRes).length

    if (!isNil(dataRes.data) && keyLen === 1)
      return dataRes.data
    if (!isNil(dataRes.data) && keyLen > 1)
      return dataRes

    return isEmpty(dataRes) ? null : dataRes
  }
  else {
    handlerError(res)
    return Promise.reject(res) as any
  }
}

export function reqResolver(error: any) {
  return Promise.reject(error)
}

export function responeResolver(error: any) {
  const res
  = error.response
  && (error.response.data || error.response)
  return Promise.reject(res || 'error')
}

function handlerError(response: API.AppHttpResponse<any>) {
  const strategy: Record<number, () => void> = {
    505: () => {
      const userStore = useUserStore()
      userStore.logout().then(() => {
        window.location.reload()
      })
    },
  }

  const code = response.code
  if (code && strategy[code])
    return strategy[code]()
}
