export default ({ mock, setup }: { mock?: boolean, setup: () => void }) => {
  if (mock !== false)
    setup()
}

export function successResponseWrap<T extends Record<string, any> | null>(data: T): API.AppHttpResponse<T> {
  return {
    data,
    msg: '请求成功',
    code: 200,
  }
}

export function failResponseWrap<T extends Record<string, any> | null>(data: T, msg: string, code = 500): API.AppHttpResponse<T> {
  return {
    data,
    msg,
    code,
  }
}
