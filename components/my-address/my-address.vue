<template>
	<view class="address">
		<!-- 选择收货地址的盒子 -->
		<view v-if="!address.cityName" class="address-choose-box address-card">
			<button @click="chooseAddressBtn" type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
		</view>
		<!-- 渲染收货信息的盒子 -->
		<view @click="chooseAddressBtn" v-else class="address-info-box address-card">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addressStr}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {

			};
		},

		computed: {
			...mapState('user', ['address']),
			...mapGetters('user', ['addressStr'])
		},
		methods: {
			async chooseAddressBtn() {
				const [err, res] = await uni.chooseAddress()
				if (err) {
					uni.showToast({
						title: '已取消',
						icon: 'none'
					})
					return
				}
				this.$store.commit('user/updateAddress', res)
			}
		}

	}
</script>

<style lang="scss">
	.address {
		overflow: hidden;
	}

	.address-card {
		width: 730rpx;
		margin: 20rpx auto;
		background-color: #fff;
		border-radius: 5px
	}

	// 底部边框线的样式
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	// 选择收货地址的盒子
	.address-choose-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 渲染收货信息的盒子
	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 10px;

		// 第一行
		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>