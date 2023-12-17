declare namespace API {
  type IRes = Record<string, unknown> | null
  export interface AppHttpResponse<T extends IRes > {
    code: number
    msg: string
    data?: T
  }

  export interface AppList<T = unknown> {
    records: T[]
    total: number
  }
}
