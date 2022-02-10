<template>
	<div class="adv">
		<h1>新建广告</h1>
		<el-form
		:model="model" 
		label-width="80px" 
		@submit.native.prevent='save'>
			<el-form-item label="广告名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<!-- 广告位 -->
			<el-form-item label="广告">
				<el-button icon="el-icon-plus" @click="model.items.push({})">添加广告</el-button>
				<el-row>
					<el-col  v-for="(item,index) in model.items" :key='index'>
						<el-card shadow = "never" class="box-card">
						  <div slot="header" class="clearfix">
						    <span>广告{{index+1}}</span>
						    <el-button style="float: right; padding: 3px 0" type="text"
										@click="model.items.splice(index,1)">删除</el-button>
						  </div>
							  <el-form label-width="80px">
								  <el-form-item label="跳转链接">
									  <el-input class='class-url' v-model="item.url"></el-input>
								  </el-form-item>
								  <el-form-item label="广告图片">
									  <el-upload
											class="avatar-uploader"
											:action="$http.defaults.baseURL+'/upload'"
											:show-file-list="false"
											:on-success="res=>$set(item,'image',res.url)">
											<img v-if="item.image" :src="item.image" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									  </el-upload>
									  <!-- <el-upload
											:headers="getAuthHeader()"
									  </el-upload> -->
								  </el-form-item>		  
							  </el-form>
						</el-card>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<!--'submit', ""不行  -->
				<el-button type="primary" native-type = 'submit'>保存</el-button>
			</el-form-item>
		</el-form>
		
	</div>
</template>

<script>
	export default{
		name:"AdvEdit",
		props:{
			id:{}
		},
		data(){
			return{
				model:{
					items:[]
					// items:[{'url':'1111'}]
				}
			}
		},
		created(){
			this.fetch()
		},
		methods:{
			async fetch(){
				const res = await this.$http.get(`rest/advs/${ this.id }`)
				this.model = res.data
			},
			async save(){
				let res
				//保存，有id就更新，没有id新增
				if( this.id ){
					res = await this.$http.put(`rest/advs/${this.id}`,this.model)
				}else{
					res = await this.$http.post('rest/advs',this.model)
					console.log('rea.data',res.data)
				}
				this.$router.push('/advs/list')
				this.$message({
					message:'保存成功',
					type:'success'
				})
			}
		}
	}
</script>

<style>
	 .text {
	    font-size: 14px;
	  }
	
	  .item {
	    margin-bottom: 18px;
	  }
	
	  .clearfix:before,
	  .clearfix:after {
	    display: table;
	    content: "";
	  }
	  .clearfix:after {
	    clear: both
	  }
	
	  .box-card {
	    width: 480px;
		margin-top: 20px;
	  }
	  .class-url{
		  margin-bottom: 20px;
	  }
</style>
