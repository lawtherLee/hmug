import fly from '../utils/requset.js'

/**
 * 获取banner
 */
export const getBanners = () => fly.get('/home/swiperdata')

/**
 * 获取分类数据
 * */
export const getNavList = () => fly.get('/home/catitems')