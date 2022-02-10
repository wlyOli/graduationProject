module.exports = app =>{
	 //引包
	 const mongoose = require('mongoose')
	 //（自）mongodb连接本地数据库默认是27017，若要打开其他需要连接别的
	 mongoose.connect('mongodb://127.0.0.1:27017/agriculture', {
		 useNewUrlParser: true ,
		 useUnifiedTopology: true,
	})
	
 }
