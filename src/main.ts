import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useQuestionStore } from '@/stores/question'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const store = useQuestionStore()
store.initializeQuestions()

app.mount('#app')
