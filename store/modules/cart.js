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
		},
		// 更新购物车商品状态
		unpdateGoodsState(state, id) {
			const findItem = state.list.find(item => item.goods_id === id)
			if (findItem) {
				findItem.goods_state = !findItem.goods_state
			}
		},
		// 同步全选的状态
		updateAllChecked(state, payload) {
			state.list.forEach(item => {
				item.goods_state = payload
			})
		}
	},
	getters: {
		// 购物车总数
		total(state) {
			return state.list.reduce((sum, item) => {
				return sum + item.goods_count
			})
		},

		isAllChecked(state) {
			return state.list.every(item => {
				return item.goods_state
			})
		},
		// 合计价格
		totalPrice(state) {
			return state.list.reduce((sum, item) => {
				if (item.goods_state) {
					return sum + item.goods_price * item.goods_count
				} else {
					return sum
				}
			}, 0)
		},
		total(state) {
			return state.list.reduce((sum, item) => {
				if (item.goods_state) {
					return sum + item.goods_count
				} else {
					return sum
				}
			}, 0)
		},
	}
}