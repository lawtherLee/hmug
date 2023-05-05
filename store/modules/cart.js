export default {
	namespaced: true,
	state: {
		// 获取本地数据
		list: uni.getStorageSync('cart') || []
	},
	mutations: {
		// 添加商品
		addGoods(state, payload) {
			const findItem = state.list.find(item => {
				return item.goods_id === payload.goods_id
			})
			if (findItem) {
				findItem.goods_count++
			} else {
				state.list.push(payload)
			}
			uni.setStorageSync('cart', state.list)
		}
	},
	getters: {
		// 购物车总数
		total(state) {
			return state.list.reduce((sum, item) => {
				return sum + item.goods_count
			}, 0)
		}
	}
}