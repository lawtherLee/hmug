<template>
	<view class="home-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环渲染轮播图的 item 项 -->
			<swiper-item v-for="(item, i) in banners" :key="i" @click="goGoodsDetail(item.goods_id)">
				<view class="swiper-item">
					<!-- 动态绑定图片的 src 属性 -->
					<image :src="item.image_src"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 分类导航 -->
		<view class="navs">
			<image @click="cateNavigateTo" v-for="item in navs" :key="item.name" :src="item.image_src" mode=""></image>
		</view>

		<!-- 楼层 -->
		<view class="floor">
			<!-- 每一层楼 -->
			<view class="floor_item" v-for="item in floors" :key="item.floor_title.name">
				<!-- 每层的标题 -->
				<image class="title" :src="item.floor_title.image_src" mode=""></image>
				<!-- 每层楼的图片列表 -->
				<view class="image_box">
					<!-- 左边的1张图片 -->
					<image @click="goGoodsList(item.product_list[0].navigator_url)" class="left"
						:src="item.product_list[0].image_src"></image>
					<!-- 右边的4张图片 -->
					<view class="right">
						<image v-for="(img,index) in item.product_list.slice(1)" @click="() => goGoodsList(img.navigator_url)"
							:src="img.image_src" :key="index">
						</image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBanners,
		getFloors,
		getNavList
	} from '../../api/home';
	export default {
		data() {
			return {
				banners: [],
				navs: [],
				floors: []
			};
		},

		onLoad() {
			this.loadBanners()
			this.loadCateNavs()
			this.loadFloors()
		},

		methods: {
			// 点击进入商品列表
			goGoodsList(url) {
				const query = url.split('?')[1]
				console.log(query);
				uni.navigateTo({
					url: "/subGoods/goods-list/goods-list?" + query
				})
			},
			// 加载并保存楼层数据
			async loadFloors() {
				const {
					message
				} = await getFloors()
				this.floors = message
				console.log(this.floors);
			},
			// 导航跳转
			cateNavigateTo() {
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			// 轮播详情
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/subGoods/goods-detail/goods-detail?id=' + id
				})
			},
			// 轮播图
			async loadBanners() {
				const {
					message
				} = await getBanners()
				this.banners = message
			},
			// 获取首页分类导航数据
			async loadCateNavs() {
				const {
					message
				} =
				await getNavList()
				this.navs = message
			}
		}
	}
</script>

<style lang="scss">
	.home-container {
		swiper {
			height: 330rpx;

			.swiper-item,
			image {
				width: 100%;
				height: 100%;
			}
		}

		// 分类导航
		.navs {
			display: flex;
			justify-content: space-around;
			margin: 15rpx;

			image {
				width: 128rpx;
				height: 140rpx;
			}
		}

		// 楼层
		.floor {
			margin-top: 20rpx;

			.floor_item {
				margin: 15rpx 10rpx;

				.title {
					height: 60rpx;
					width: 750rpx;
				}

				.image_box {
					display: flex;
					justify-content: space-between;

					.left {
						width: 232rpx;
						height: 392rpx;
						float: left;
					}

					.right {
						width: 500rpx;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						align-content: space-between;

						image {
							width: 233rpx;
							height: 190rpx;
						}
					}
				}
			}
		}
	}
</style>