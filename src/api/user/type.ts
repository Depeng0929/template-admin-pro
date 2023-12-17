export interface LoginData {
  email?: string
  phone?: string
  code?: string
  password?: string
}

export interface ILoginRes {
  access_token: string
  expires_in: number
}
