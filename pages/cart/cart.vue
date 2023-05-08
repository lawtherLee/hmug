<template>
	<view>
		<!-- 收货地址 -->
		<my-address class="address" />
		<!-- 商品列表 -->
		<van-card v-for="item in list" :key="item.goods_id" :num="item.goods_count" :price="item.goods_price | toFixed"
			:title="item.goods_name">
			<view class="card_left" slot="thumb">
				<van-checkbox :value="item.goods_state" @change="onChange(item.goods_id)"></van-checkbox>
				<image :src="item.goods_small_logo || defultImg" mode="aspectFill"></image>
			</view>
		</van-card>
		<!-- 结算 -->
		<my-settle />
	</view>
</template>

<script>
	import defultImg from '../../static/logo.png'
	import {
		mapState
	} from 'vuex'
	import mixinBadge from '../../mixins/badge.js'
	export default {
		mixins: [mixinBadge],
		data() {
			return {
				defultImg
			}
		},
		computed: {
			...mapState('cart', ['list'])
		},
		methods: {
			onChange(id) {
				this.$store.commit('cart/updateGoodsState', id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 收货地址
	.address {
		background-color: #eee;
	}

	.van-card__thumb {
		width: unset !important;
	}

	// 商品列表
	.card_left {
		display: flex;
		height: 88px;
		align-items: center;

		image {
			width: 80px;
			height: 80px;
		}
	}
</style>