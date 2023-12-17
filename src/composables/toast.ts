import { Message } from '@arco-design/web-vue'

export function success(msg: string) {
  return Message.success(msg)
}

export function fail(msg: string) {
  return Message.error(msg)
}

export function warning(msg: string) {
  return Message.warning(msg)
}
