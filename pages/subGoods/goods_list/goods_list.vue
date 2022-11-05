<template class='listMain'>
	<view class="card">
		<van-card v-for="item in goods" :key="item.goods_id" :price="item.goods_price | toFixed"
			:title="item.goods_name" :thumb="item.goods_big_logo || defaultImg"
			:thumb-link="'/pages/subGoods/goods_detail/goods_detail?id=' + item.goods_id" />
		<van-divider v-if="isFinished" contentPosition="center">我是有底线的</van-divider>
	</view>
</template>

<script>
	import {
		getGoodsListAPI
	} from '../../../api/goodsList.js'
	export default {
		data() {
			return {
				query: {
					pagenum: 1,
					pagesize: 10,
					query: '',
					cid: ''
				},
				tatal: 0,
				goods: [],
				defaultImg: "https://img01.yzcdn.cn/vant/ipad.jpeg",
				isLoading: false,
				isFinished: false
			};
		},
		onLoad({
			cid,
			query
		}) {
			this.query.query = query || ''
			this.query.cid = cid || ''
			this.loadGoodsList()
		},
		methods: {
			async loadGoodsList() {
				// 节流
				this.isLoading = true
				const res = await getGoodsListAPI(this.query)
				this.isLoading = false
				this.total = res.message.total
				this.goods.push(...res.message.goods)
				// 加载完成显示分割线
				if (this.goods.length >= this.total) {
					this.isFinished = true
				}
			}
		},
		onReachBottom() {
			if (this.isLoading || this.isFinished) return
			this.query.pagenum++
			this.loadGoodsList()
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
