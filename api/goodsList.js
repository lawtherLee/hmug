import fly from '../utils/requset.js'

export const getGoodsListAPI = (data) => fly.get('/goods/search', data)