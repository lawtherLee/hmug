import fly from '../utils/request.js'

export const getGoodsListAPI = (data) => fly.get('/goods/search', data)
