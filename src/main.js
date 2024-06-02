import { createApp } from 'vue'
import { createPinia } from "pinia"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './pages/App.vue'
import router from "./router";
import './assets/styles/main.scss'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')