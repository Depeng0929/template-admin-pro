import { useStepper } from '@vueuse/core'
import type { LoginData } from '~/api/user/type'

export enum PageNames {
  LOGIN = 'login',
  VERIFICATION = 'verification',
  PASSWORD = 'password',
}

export const steperManager = useStepper([
  PageNames.LOGIN,
  PageNames.VERIFICATION,
  PageNames.PASSWORD,
])

export const loginFormModel = ref<LoginData>({
  phone: '15911111111',
  email: '',
  code: '',
  password: '',
})
