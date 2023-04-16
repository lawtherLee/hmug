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

	</view>
</template>

<script>
	import {
		getBanners,
		getNavList
	} from '../../api/home';
	export default {
		data() {
			return {
				banners: [],
				navs: []
			};
		},
		onLoad() {
			this.loadBanners()
			this.loadCateNavs()
		},
		methods: {
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
				console.log(this.banners);
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
	}
</style>