import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '~/styles/index.scss'
import directive from './directive'

import '../mock'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(directive)
app.mount('#app')
