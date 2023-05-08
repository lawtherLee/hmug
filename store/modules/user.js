export default {
	namespaced: true,
	state: {
		address: uni.getStorageSync('address') || {},
		token: uni.getStorageSync('token') || ''
	},
	mutations: {
		updateAddress(state, payload) {
			state.address = payload
			uni.setStorageSync('address', payload)
		},
		updateToken(state, payload) {
			state.token = payload
			uni.setStorageSync('token', payload)
		}
	},
	getters: {
		addressStr(state) {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo
			} = state.address
			return provinceName + cityName + countyName + detailInfo
		}
	}
}