const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name:{type:String},
	icon:{type:String},
	parent:{
		type:mongoose.Schema.Types.ObjectId,	//ObjectId mongoose的id名称
		ref:'Category'							//关联的是本身，关联谁
	}
})

module.exports = mongoose.model('Brand',schema)