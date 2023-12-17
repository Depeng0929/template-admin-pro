import { useStepper } from '@vueuse/core'

export enum PageNames {
  LOGIN = 'login',
  VERIFICATION = 'verification',
}

export const steperManager = useStepper([
  PageNames.LOGIN,
  PageNames.VERIFICATION,
])
