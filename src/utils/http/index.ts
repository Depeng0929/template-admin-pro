import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { reqResolver, requestInterceptors, responeResolver, responseInterceptors } from './interceptors'

const defaultOptions = {
  baseURL: '/api',
  header: {
    'content-type': 'application/json',
  },
}

function createAxios(options: AxiosRequestConfig = {}) {
  const service = createBaseAxios(options)
  service.interceptors.response.use(responseInterceptors, responeResolver)

  return service
}

function createBaseAxios(options: AxiosRequestConfig = {}) {
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  service.interceptors.request.use(requestInterceptors as any, reqResolver)

  return service
}

export default createAxios()

export const downloadRequest = createBaseAxios()
