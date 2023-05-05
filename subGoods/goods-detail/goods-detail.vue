<template>
	<view class="detailMain">
		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key="item.pics_id">
				<image @click="previewImg(i)" :src="item.pics_sma_url"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goodsInfo.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品详情区域 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品底部导航 -->
		<van-goods-action>
			<van-goods-action-icon icon="chat-o" text="客服" open-type="contact" />
			<van-goods-action-icon icon="cart-o" text="购物车" url="/pages/cart/cart" link-type="switchTab" :info='total' />
			<van-goods-action-icon icon="shop-o" text="店铺" />
			<van-goods-action-button @click="addCart" text="加入购物车" type="warning" />
			<van-goods-action-button text="立即购买" />
		</van-goods-action>
	</view>
</template>

<script>
	import {
		getGoodsDetailAPI
	} from '../../api/goodsDetail';
	import {
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				goodsInfo: {},
			};
		},
		async onLoad(options) {
			await this.loadGoodsDetail(options.id)
		},
		computed: {
			...mapGetters('cart', ['total'])
		},
		methods: {
			async loadGoodsDetail(id) {
				const {
					message
				} = await getGoodsDetailAPI(id)
				console.log(message);
				message.goods_introduce = message.goods_introduce
					.replace(/<img /g, '<img style="display:block"')
					.replace(/webp/g, 'jpg')
				this.goodsInfo = message
				// message.goods_introduce
			},
			// 放大图片
			previewImg(e) {
				const urls = this.goodsInfo.pics.map(item => item.pics_big_url)
				uni.previewImage({
					e,
					urls
				})
			},
			// 添加购物车
			addCart() {
				const {
					goods_id,
					goods_name,
					goods_price,
					goods_small_logo
				} = this.goodsInfo
				this.$store.commit('cart/addGoods', {
					goods_id,
					goods_name,
					goods_price,
					goods_small_logo,
					goods_state: true,
					goods_count: 1
				})
				uni.showToast({
					title: '添加成功',
					icon: 'success'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detailMain {
		padding-bottom: 84rpx;

		swiper {
			height: 750rpx;
			width: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		// 商品信息区域的样式
		.goods-info-box {
			padding: 10px;
			padding-right: 0;

			.price {
				color: #c00000;
				font-size: 18px;
				margin: 10px 0;
			}

			.goods-info-body {
				display: flex;
				justify-content: space-between;

				.goods-name {
					font-size: 13px;
					padding-right: 10px;
				}

				// 收藏区域
				.favi {
					width: 120px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-left: 1px solid #efefef;
					color: gray;
				}
			}

			// 运费
			.yf {
				margin: 10px 0;
				font-size: 12px;
				color: gray;
			}
		}
	}
</style>