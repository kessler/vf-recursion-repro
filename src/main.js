import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import useGraphStore from './store.js'

const app = createApp(App)

app.use(createPinia())

const store = useGraphStore()
app.provide('graphStore', store)

app.mount('#app')
