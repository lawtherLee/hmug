export default {
	methods: {
		setBadge() {
			this.cartTotal && uni.setTabBarBadge({
				index: 2,
				text: this.cartTotal + ''
			})
		}
	},
	computed: {
		cartTotal() {
			// 获取商品总数
			return this.$store.getters['cart/total']
		}
	},
	onShow() {
		this.setBadge()
	}
}