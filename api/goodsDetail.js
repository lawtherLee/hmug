import fly from '@/utils/requset.js'
/*
 * 获取商品详情数据
 */
export const getGoodsDetailAPI = goods_id => fly.get('/goods/detail', {
	goods_id
})