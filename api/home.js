import fly from '@/utils/request.js'

// 获取首页轮播图
export const getSwipers = () => fly.get('/home/swiperdata')

// 获取分类导航
export const getCateNavs = () => fly.get('/home/catitems')

// 获取楼层数据
export const getFloors = () => fly.get('/home/floordata')
