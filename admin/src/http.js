// 1.下载axios   npm install axios
// 2.引入axios   import axios from 'axios'
//	拦截器
// 3.创建axios实例 http
// 4.导出axios   export default http
// 5.main.js中全局挂在http(axios实例)
import axios from 'axios'

const http = axios.create({
	baseURL:'http://localhost:4000/admin/api'
})

//响应拦截 response
	http.interceptors.response.use(res=>{
		//正常情况走第一个循环体
		console.log('res',res)
		return res
	},err=>{
		
		//错误时，一般返回400之后的码
		console.log(err.response)
		//如果有错误就弹出
		if(err.response.data.message){
			//当加入element-ui  被挂载到vue原型链上
			Vue.prototype.$message({
				type:'error',
				message:err.response.data.message
			})
			
			//如果错误码等于401，跳转到登录页
			if(err.response.status === 401){
				router.push('/login')
				
			}
			
		}
		return Promise.reject(err)
	})



//请求拦截
http.interceptors.request.use(config=>{
	
		console.log('config',config)
		
		if(localStorage.token){
			//'Bearer '后面是半角空格
			//requesr Headers 中出现authorization，证明每次请求都加上了token信息
			config.headers.authorization = 'Bearer ' + localStorage.token
		}
		
		return config
	},err=>{
		
	})


export default http