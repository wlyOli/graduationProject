<template>
	<div class="product">
		<h1>{{ id? '编辑':'新建'}}商品</h1>
		<el-form :model="model" 
				 label-width="80px"
				 @submit.native.prevent='save'>
		  <el-form-item label="商品名称">
			  <el-col :span="12">
				<el-input v-model="model.name"></el-input>
			  </el-col>
		  </el-form-item>
		  
		  <el-form-item label="商品标题">
			<el-col :span="12">
				<el-input v-model="model.title"></el-input>
			</el-col>
		  </el-form-item>
		  <el-form-item label="商品价格">
			<el-col :span="6">
				<el-input v-model="model.price"></el-input>
			</el-col>
		  </el-form-item>
		  <el-form-item label="商品类型">
		    <el-select v-model="model.categories" placeholder="请选择">
		  				<el-option v-for="item in categories" 
		  						   :key="item._id"                        
		  						   :label="item.name"
		  						   :value="item._id">
		  			    </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="商品品牌">
		    <el-select v-model="model.brand" placeholder="请选择">
		  				<el-option v-for="item in brand" 
		  						   :key="item._id"                        
		  						   :label="item.name"
		  						   :value="item._id">
		  			    </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="商品图标">
			  <el-upload
			    class="avatar-uploader"
				:action="$http.defaults.baseURL+'/upload'"			    
				:show-file-list="false"
			    :on-success="afterUpload"
			    >
				<!-- v-if="model.icon" 有图片就展示图片，没有icon就显示图标 -->
			    <img v-if="model.icon" :src="model.icon" class="avatar">
			    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  </el-upload>
		  </el-form-item>
		  <el-form-item>
			  <vue-editor
			   v-model='model.body' 
			   useCustomImageHandler
			   @image-added="handleImageAdded"/>
		  </el-form-item>
		  <el-form-item>
		  	<!-- native-type='submit'采用原生提交方式 -->
		      <el-button type="primary" native-type='submit'>保存</el-button>
		  </el-form-item>	
		</el-form>  
	</div>
</template>

<script>
	import {VueEditor} from "vue2-editor";
	
	export default{
		name:'ProductEdit',
		props:{
			id:{}
		},
		components:{
			VueEditor
		},
		data(){
			return{
				model:{},
				categories:{},
				brand:[],
			}
		},
		created(){
			//this.fetch(),
			this.fetchType(),
			this.fetchBrand(),
			this.id&&this.fetch()
		},
		methods:{
			afterUpload(res){
				//this.model.icon = res.url+ model中定义icon:''
				//或者this.$set(目标，“变量”，值)
				this.$set(this.model,"icon",res.url)
			 },
			async save(){
				let res
				if(this.id){
					res = await this.$http.put(`rest/products/${this.id}`,this.model) 
					
				}else{
					res = await this.$http.post('rest/products',this.model)
				}
				//跳转到编辑详情页
				this.$router.push('/products/list')
				//保存成功提示
				this.$message({
					message: '保存成功',
					type: 'success'
				});
			},
			//获取品牌
			async fetch(){
				const res = await this.$http.get(`rest/products/${this.id}`)
				this.model = res.data
			},
			//显示上级分类 
			async fetchType(){
					const res = await this.$http.get('rest/categories')
					this.categories = res.data
			},
			//获取上级品牌
			async fetchBrand(){
					const res = await this.$http.get('rest/brands')
					this.brand = res.data
			},
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			    
			    var formData = new FormData();
			    formData.append("file", file);
									
			    const res =await this.$http.post('upload',formData)
			    console.log('res',res)
				Editor.insertEmbed(cursorLocation, "image", res.data.url);
				resetUploader();				       
			},
			
		}
		
	}
</script>

<style>
</style>
