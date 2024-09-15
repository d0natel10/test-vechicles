import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { languages } from './i18n'
import { defaultLocale } from './i18n'
import { createI18n, useI18n } from 'vue-i18n'

const localeLang = localStorage.getItem('lang')
const messages = Object.assign(languages);
const i18n = createI18n({
    lagacy: false,
    locale: localeLang || defaultLocale,
    fallbackLocale: 'en',
    messages
})

const app = createApp(App, {
    setup() {
        const {t} = useI18n()
        return {t}
    }
})

app.use(createPinia())
app.use(i18n)
app.mount('#app')
