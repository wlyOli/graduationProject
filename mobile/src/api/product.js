// 商品相关请求模块
import request from '../utils/request.js'

//商品数据列表
export const getItems = data =>{
	return request({
		method:'POST',
		url:'/rest/products/List',
		data

	})
}

// export const getItems = params =>{
// 	return request({
// 		method:'GET',
// 		url:`/rest/products/${params.categoryId}`,
// 	})
// }

// 获取轮播图
export const getSwipImg = () =>{
	return request({
		method:'GET',
		url:'/rest/advs'
	})
}