<template>
	<view>
		list
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
				isFinished: false
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
				console.log(message);
				this.total = message.total
			}
		}
	}
</script>

<style lang="scss">

</style>