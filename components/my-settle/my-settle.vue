<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio">
			<radio color="#C00000" :checked="isAllChecked" @click="updateState" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{totalPrice | toFixed}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settle">结算({{total}})</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				isAllChecked: false
			};
		},
		computed: {
			...mapGetters('cart', ['isAllChecked', 'totalPrice', 'total'])
		},
		methods: {
			updateState() {
				this.$store, commit('cart/updateAllChecked', !this.isAllChecked)
			},
			// 点击结算
			async settle() {
				const keys = Object.keys(this.$store.state.user.address).length
				if (!keys) return uni.showToast({
					title: '请选择收货地址',
					icon: 'none'
				})
				if (!total) return uni.showToast({
					title: '请选择购买的商品',
					icon: 'none'
				})
				if (!this.$store.state.user.token) {
					const res = await uni.showModal({
						title: '登录',
						content: '是否授权登录'
					})
					if (res[1].confirm) {
						uni.switchTab({
							url: '/pages/my/my'
						})
					}
					createOrder()
					return
				}
			},
			async createOrder() {
				const payGoods = this.$store.state.cart.list.filter(item => item.goods_state)
				const goods = payGoods.map(item => {
					return {
						goods_id: item.goods_id,
						goods_number: item.goods_count,
						goods_price: item.goods_price
					}
				})
				// 调起创建订单的接口
				const {
					message: {
						order_number
					}
				} = await createOrder({
					order_price: this.totalPrice,
					consignee_addr: this.$store.getters['user/addressStr'],
					goods: goods
				})
				// 获取到订单id
				console.log(order_id)
			},
			async payGoods(order_number) {
				// 获取支付参数
				const {
					message: {
						pay
					}
				} = await getPayParams({
					order_number
				})
				// 发起微信支付
				const [err, res] = uni.requestPayment(pay)
				if (err) {
					uni.showToast({
						title: '取消支付'
					})
					uni.switchTab({
						url: '/pages/my/my'
					})
				} else {
					uni.showToast({
						title: '支付成功'
					})
					uni.switchTab({
						url: '/pages/my/my'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>