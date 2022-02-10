module.exports = app =>{
	//引入路由
	const express = require('express')
	const router = express.Router({
		mergeParams:true//导入父级参数到子集的配置		
	})
	
	
	 const Brand = require('../../models/Brand')
	 const Category = require('../../models/Category')
	
	//商品
	const Product = require('../../models/Product')
	
	//SearchText
	const SearchText = require('../../models/SearchText')
	
	
	
	//获取用户分类
	//分类列表
	router.get('/',async(req,res)=>{
		console.log('req.params..',req.params)
		const items = await req.Model.find().populate('parent'). limit(10)
		res.send(items)
	})
	
	//获取查询分类数据
		// router.get('/:categoryId',async(req,res)=>{
		// 	console.log('req.params',req.params)
		// 	const items = await req.Model.find({'categories':req.params.categoryId})
		// 	res.send(items)
		// })
	
	//首页查询分类是美妆的数据
		//分页处理
	router.post('/List',async (req,res)=>{
			//const Brand = require('../../models/Brand')
			//const Category = require('../../models/Category')
			let pageNum = req.body.pageNum
			let pageSize = req.body.pageSize || 5
			let limitNum = parseInt(pageSize)
			//console.log('pageNum',pageNum)
			//console.log('limitNum',limitNum)
			//获取数据
			req.Model.find({"categories":req.body.categoryId},(err,data)=>{
				if(err) return res.status(500).json({
					result: 1,
					error_info: '请求失败！'
				})
				let count = data.length
				//console.log("count",count)
				//console.log('data',data)
				
				//populate('要关联的字段多个空格隔开','填充document中的哪些字段')
				//.populate('brands categories','name')
				req.Model.find({"categories":req.body.categoryId}).populate('categories','name').skip((pageNum - 1)*limitNum).limit(limitNum).exec(function (err, data) {
					if(err) return res.status(500).json({
						result: 1,
						error_info: '服务器繁忙，请稍后重试！'
					})
					return res.status(200).json({
						result:0,
						message:'请求成功',
						total: count,
						itemsList: data
					})
				})
			})     
	})
	
	//商品编辑的详情
	router.get('/:id',async (req,res)=>{
		// .populate('brands categories','icon name')
		const model = await req.Model.findById(req.params.id).populate('categories','icon name')
		//console.log('商品编辑id',req.params.id)
		res.send(model)
	})
	
	
	
	// 模糊查询
	app.get('/web/api/search',async (req,res) => {
		let query = {}
		if(req.query.searchName){
			query['title'] = new RegExp(req.query.searchName)
			//相当于`/${req.query.searchName}/g`，但是正则里面不能放变量
		} 
		Product.find(query,function(err,list){
			res.send({list})
		})
	})
	
	//搜索结果
	    app.post('/web/api/searchResults',async (req,res)=>{
	        let pageNum = req.body.pageNum
	        let pageSize = req.body.pageSize || 10
	        let limitNum = parseInt(pageSize)
	        let query = {}
	        query['title']=new RegExp(req.body.q);//模糊查询参数
	       
		   //记录到搜索记录里面
		   // SearchText.find({keywords:req.body.q},function(err,data){
			  //  console.log('key',data)
			  //  if(data.length === 0){          
				 //   SearchText.create({
					//    keywords:req.body.q
				 //   })
			  //  }
		   // })
		   
		   
	        //关键字
	        Product.find(query,function(err, list){
	            if(err) return res.status(500).json({
	                result: 1,
	                error_info: '请求失败！'
	            })
	            let count = list.length
	            //console.log('list',list)
				//populate('brands categories','name')
	            Product.find(query).populate('categories','name').skip((pageNum - 1)*limitNum).limit(limitNum).exec(function (err, list) {
	                if(err) return res.status(500).json({
	                    result: 1,
	                    error_info: '服务器繁忙，请稍后重试！'
	                })
	                return res.status(200).json({
	                    result:0,
	                    message:'请求成功',
	                    total: count,
	                    list: list
	                })
	            })
	        });
	
	    })
		
		//返回历史记录
		app.get('/web/api/histories', async (req,res) => {
			const keywordList = await SearchText.find()
			const keywords = keywordList.splice(-5).reverse()
			//forEach
			let newkeywords = []
			keywords.forEach(item =>{
				newkeywords.push(item.keywords)
			})
			
			//map
			// let arrNew = keywords.map(item=>{
			// 	return item.keywords
			// })
			
			
			res.send(newkeywords)
			
		})
		
		
		//删除单个历史记录
		  // app.get('/web/api/deleteItems',async (req,res)=>{
		  //       console.log('req.query.key',req.query.key)
		  //       SearchText.findOne({keywords:req.query.key}, function (err, data) {
		  //           console.log('data',data)
		  //           data.remove(function (err) { 
		  //             if(err){
		  //               return res.status(500).json({
		  //                   result:1,
		  //                   message:'删除失败',
		  //               })
		  //             }
		  //             res.send({
		  //               result:0,
		  //               message:'删除成功',
		  //           })
		  //           }); 
		  //       }); 
		  //  })
	
	//查看用户信息  //待修改
	app.get('/web/api/userInfo',async(req,res)=>{
		// const items = await UserInfo.find().populate('username')
		// res.send(items)
		const username = req.query.username
		const items = await UserInfo.find({username})
		res.send(items)
	})
	
	
	
	//统一接口
	app.use('/web/api/rest/:resource',async (req,res,next)=>{
		
		const modelName = require('inflection').classify(req.params.resource)
		/* 把Model挂载到req上，其他地方访问的时候均为req.Model */
		req.Model = require(`../../models/${modelName}`)
		
		//继续向下执行
		next()
		
	},router)
	
	
	
}