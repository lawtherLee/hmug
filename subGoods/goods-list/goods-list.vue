<template class="listMain">
	<view class="card">
		<view class="card">
			<van-card v-for="item in goodsList" :key="item.goods_id" :price="item.goods_price | toFixed"
				:title="item.goods_name" :thumb="item.goods_big_logo || defaultImg"
				:thumb-link="'/subGoods/goods-detail/goods-detail?id=' + item.goods_id" />
			<van-divider v-if="isFinished" contentPosition="center">我是有底线的</van-divider>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsListAPI
	} from '../../api/goodsList.js'
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0,
				isLoading: false,
				isFinished: false,
				defaultImg: "https://img01.yzcdn.cn/vant/ipad.jpeg",

			};
		},
		onLoad({
			query,
			cid
		}) {
			this.queryObj.query = query || ''
			this.loadGoodsList()
			this.queryObj.cid = cid || ''
		},
		methods: {
			async loadGoodsList() {
				this.isLoading = true
				const {
					message
				} = await getGoodsListAPI(this.queryObj)
				this.isLoading = false
				console.log(message);
				this.total = message.total
				this.goodsList.push(...message.goods)
				// 加载完成显示分割线
				if (this.goodsList.length >= this.total) this.isFinished = true
			}
		},
		// 上滑加载更多
		onReachBottom() {
			if (this.isLoading || this.isFinished) return
			this.queryObj.pagenum++
			this.loadGoodsList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			this.loadGoodsList()
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="scss">
	.listMain {
		padding: 20rpx;
		background-color: #eee;

		.custom-class {
			width: 700rpx;
			margin: 10rpx 10rpx 0;
			border-radius: 24rpx;
			background-color: red;
			box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
		}
	}
</style>