import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
// 配置请求的基准地址, 将请求地址添加到服务器合法域名
fly.config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

// 请求拦截器(拦截所有基于fly实例发出的请求, 统一携带token,配置请求头等)
//添加请求拦截器
fly.interceptors.request.use((request) => {
	// 添加菊花
	uni.showLoading({
		title: '加载中'
	})
	//给所有请求添加自定义header
	request.headers["X-Tag"] = "flyio";
	//打印出请求体
	//终止请求
	//var err=new Error("xxx")
	//err.request=request
	//return Promise.reject(new Error(""))
	//可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
	return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行(对数据进行剥离,以及进行统一的错误处理)
fly.interceptors.response.use(
	(response) => {
		// 取消菊花
		uni.hideLoading()
		//只将请求结果的data字段返回
		if (response.data.meta.status !== 200) {
			uni.showToast({
				title: '获取数据失败',
				icon: 'error'
			})
			return Promise.reject(new Error('请求失败'))
		}
		return response.data
	},
	(err) => {
		//发生网络错误后会走到这里
		//return Promise.resolve("ssss")
	}
)
export default fly
