import fly from '@/utils/requset.js'
export const createOrder = (data) => {
	return fly.post('/my/orders/create', data)
}