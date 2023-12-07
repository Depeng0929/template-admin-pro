import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import store from './store'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '~/styles/index.scss'
import directive from './directive'

import '../mock'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(store)
app.use(directive)
app.mount('#app')
