// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import * as filters from '@/filters/index.js'
import store from './store/index.js'
Vue.config.productionTip = false

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif