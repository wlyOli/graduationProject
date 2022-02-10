import request from "../utils/request.js"

//商品列表数据
export const getItemDetails = id =>{
	return request({
		method:'GET',
		url:`rest/products/${id}`,
		
	})
}