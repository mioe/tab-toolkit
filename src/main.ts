import { createApp } from 'vue'
import App from './App.vue'

/**
 * Styles
 */
import './style.css'
import 'uno.css'

/**
 * Modules
 */
import { pinia } from './modules/pinia'

createApp(App)
	.use(pinia)
	.mount('#app')
