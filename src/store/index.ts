import { createPinia } from 'pinia'
import useUserStore from './modules/user/index'
import useAppStore from './modules/app/index'

const pinia = createPinia()

export { useUserStore, useAppStore }
export default pinia
