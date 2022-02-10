//1.express模块
const express = require('express')
const app = express()

//静态资源的暴露  富文本编辑器图片的显示路径
app.use('/uploads',express.static(__dirname+'/uploads'))
	
	

//2.配置模板引擎
app.use(express.json())

//3.跨域,相当于
// const cors = require('cors') const app = cors()
app.use(require('cors')())

//设置密钥
app.set('secret','miyao')


//4.导入数据库模块，admin路由
require('./db/db')(app)
require('./routes/admin/index')(app)
require('./routes/mobile/index')(app)

//5.创建监听端口
app.listen(4000, ()=>{
	console.log('@@!!!http://localhost:4000')
})