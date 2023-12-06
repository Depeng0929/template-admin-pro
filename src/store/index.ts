import { createPinia } from 'pinia';
import useUserStore from './modules/user/index'

const pinia = createPinia();

export { useUserStore };
export default pinia;
