//请求模块
import axios from 'axios';

//创建
const request = axios.create({
	baseURL:"http://localhost:4000/web/api"
	
})

//导出request
export default request