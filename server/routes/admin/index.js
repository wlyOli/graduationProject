module.exports = app =>{
	//引入路由   express 和 router
	const express = require('express')
	const router = express.Router({
		mergeParams:true  //导入父级参数到子级的配置	
	})
	
	//调用生成树
	//const toTreeByRecursion = require('../../plugins/tree.js')
	const jwt = require('jsonwebtoken')
	
	//抽取共通,验证token中间件
	const authMiddle = require('../../plugins/auth.js')
	
	//导入数据模块-- 分类模块 抽离之前的形式
	//const Category = require('../../models/Category')
	//router.get('/categories/:id',async(req,res)=>{
	//引入管理员模块
	const AdminUser = require('../../models/AdminUser')
	
	//分类的创建
	router.post('/',authMiddle(),async(req,res)=>{
		const model = await req.Model.create(req.body)
		res.send(model)
	})
	//分类列表
	router.get('/',authMiddle(),async(req,res)=>{
		console.log('req.params.resource',req.params)
		//引入分类模块----req.params {resource:'categories'}
		//npm i inflection 进行单复数转换，转换成大写的单数 categories-->Category
		//populate关联取什么东西
		const model = await req.Model.find().populate('parent').limit(10)
		res.send(model)
	})
	
	//分类编辑的详情显示
	router.get('/:id',authMiddle(),async(req,res)=>{
		//req请求，res响应 req.params.id
		const model = await req.Model.findById(req.params.id)
		console.log('model'.model)
		res.send(model)
	})
	//分类的更新put,跳转到不同url用push
	router.put('/:id',authMiddle(),async(req,res)=>{
		//findByIdAndUpdate(id,需要修改的数据)
		const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
		res.send(model)
	})
	//删除分类
	router.delete('/:id',authMiddle(),async(req,res)=>{
		await req.Model.findByIdAndDelete(req.params.id,req.body)
		res.send({
			success:true
		})
	})
	
	
	
	/* 
		app.use(path,router),
		将路由(如/category)挂在到总路径下(admin/api,与admin中http.js写的一致)
		
		将子路由挂载到上面去
		当一个路由有好多子路由的时候用
		app.use(path,router)
		就会自动匹配到上面去
		例：/categories
		app.use('/admin/api/categories',router)	
		---------------
		表示通用增删改查的接口，增加动态请求参数：resource
		resource是前端请求地址的参数
		给通用接口增加rest，是与其他接口进行区别，不会冲突
	*/
	//app.use('/admin/api',router)
	app.use('/admin/api/rest/:resource',async (req,res,next)=>{
		
		const modelName = require('inflection').classify(req.params.resource)
		/* 把Model挂载到req上，其他地方访问的时候均为req.Model */
		req.Model = require(`../../models/${modelName}`)
		
		//继续向下执行
		next()
		
	},router)
	
	//图片上传
	//安装处理图片的中间件npm i multer
	const multer = require('multer')
	const upload = multer({dest:__dirname+'/../../uploads'})
	app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
		//中间件把file挂载到req上
		const file = req.file
		//挂载静态资源后，将url挂载到file上，可以在浏览器看到url参数
		file.url = `http://localhost:4000/uploads/${file.filename}`
		res.send(file)
	})
	
	//登录login接口
	app.post('/admin/api/login', async (req,res)=>{
		//res.send('ok')
		//解构赋值
		const {user,password} = req.body
		console.log("req.body",user,password)
		
		//1.根据用户名找用户
		//const AdminUser = require('../../models/AdminUser')
		// “+” 强制取某个值，“-” 是被排除
		const checkUser = await AdminUser.findOne({user}).select('+password')
		console.log('checkUser',checkUser)
		//console.log('user',user)
		if(!checkUser){
			return res.status(422).send({
				message:"用户名不存在"
			})
		}
		//2.校验密码
		//解密，返回的是布尔值（用户输入密码与数据库密码对比）compareSync同步请求
		const isValid = require('bcrypt').compareSync(password,checkUser.password)
		console.log('isValid',isValid)
		
		if(!isValid){
			return res.status(400).send({
				message:"密码错误"
			})
		}
		
		//3.返回token
		//生成token: npm i jsonwebtoken
		//jwt.sign(payload,secretOrPrivateKey)
		//payload是对象，一般用用户id传值
		//secretOrPrivateKey密钥
		// const jwt = require('jsonwebtoken')
		 const token = jwt.sign({id:checkUser._id},app.get('secret'))
		
		 console.log('token',token)
		// //发送token，用户名
		 res.send({token})	
	})
	
	
}