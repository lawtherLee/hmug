import Vue from 'vue'
import Vuex, {
	createLogger
} from 'vuex'
import cart from './modules/cart.js'
import user from './modules/user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		cart,
		user
	},
	plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})

export default store