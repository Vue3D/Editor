import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import editor from "@"

const app = createApp(App)

app.use(editor)
app.mount('#app')
