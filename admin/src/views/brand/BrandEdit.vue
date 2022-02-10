<template>
	<div class="brand">
		<h1>新建品牌</h1>
		<el-form :model="model" 
				 label-width="80px"
				 @submit.native.prevent='save'>
		  <el-form-item label="品牌名称">
		    <el-input v-model="model.name"></el-input>
		  </el-form-item>
		  <el-form-item label="品牌图标">
			  <!-- 
			  :action="$http.defaults.baseURL+'/upload'"
			  :headers="getAuthHeader()"
			  -->
			  <el-upload
			    class="avatar-uploader"
				:action="$http.defaults.baseURL+'/upload'"	
				:headers="getAuthHeader()"
				:show-file-list="false"
			    :on-success="afterUpload"
			    >
				<!-- v-if="model.icon" 有图片就展示图片，没有icon就显示图标 -->
			    <img v-if="model.icon" :src="model.icon" class="avatar">
			    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  </el-upload>
		  </el-form-item>
		  <el-form-item>
		  	<!-- native-type='submit'采用原生提交方式 -->
		      <el-button type="primary" native-type='submit'>保存</el-button>
		  </el-form-item>	
		</el-form>  
	</div>
</template>

<script>
	export default{
		name:'BrandEdit',
		props:{
			id:{}
		},
		data(){
			return{
				model:{}
			}
		},
		created(){
			//this.fetch(),
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
					res = await this.$http.put(`rest/brands/${this.id}`,this.model) 
					
				}else{
					res = await this.$http.post('rest/brands',this.model)
				}
				//跳转到编辑详情页
				this.$router.push('/brands/list')
				//保存成功提示
				this.$message({
					message: '保存成功',
					type: 'success'
				});
			},
			//获取品牌
			async fetch(){
				const res = await this.$http.get(`rest/brands/${this.id}`)
				this.model = res.data
			},
			
		}
		
	}
</script>

<style>
</style>
