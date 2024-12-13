import './assets/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './routers'

const app = createApp(App)
const p = createPinia()
p.use(piniaPluginPersistedstate)
app.use(p)
app.use(router)

app.mount('#app')
