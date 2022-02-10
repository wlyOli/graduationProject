<template>
	<div class="ad">
		<h1>{{id?'编辑':'新建'}}管理员</h1>
		<!-- @submit.native.prevent阻止默认提交，不要跳转页面，进行指定提交 -->
		<el-form :model="model" label-width="80px" @submit.native.prevent="save">
			
			<el-form-item label="名称">
				<el-input v-model="model.user"></el-input>
			</el-form-item>
             			 
			<el-form-item label="密码">
				<el-input v-model="model.password"></el-input>
			</el-form-item>

			<el-form-item>
				<!-- native-type="submit"：采用原生提交方式 -->
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'AdminEdit',
		props:{
			id:{}
		},
		data() {
			return {
				model: {
				  
				  }
			}
		},
		methods: {
			//图片上传
			/* afterUpload(res){
				console.log('res',res)
				//this.model.icon = res.url
				this.$set(this.model,'icon',res.url)
			}, */
			async save() {
				//console.log('save')
				let res

                if(this.id){
					//更新
					res = await this.$http.put(`rest/adminUser/${this.id}`, this.model)
				}else{
					//创建、保存
					res = await this.$http.post('rest/adminUser', this.model)
				}
				
				//const res = await this.$http.post('/categories', this.model)
				//const a = await this.$http.post()
				//console.log('res',res)

				//跳转到分类列表页
				// router index.js path
				this.$router.push('/admin/list')
				//弹出提示框，保存成功
				this.$message({
					message: '保存成功',
					type: 'success'
				});
			},
			//编辑详情
			async fetch(){
				//根据id来查询,请求接口
				//  /categories/:id
				const res = await this.$http.get(`rest/adminUser/${this.id}`)
				//第一种完全覆盖
				this.model = res.data
				//第二种：es6展开运算符,对原有数据不进行改变，只是增加新属性
				//this.model = {...this.model,...res.data}
				console.log('this.model',this.model)
			},
			//获取上级分类`
			async fetchParents(){
				const res = await this.$http.get('rest/adminUser')
				this.parents = res.data
			}
		},
		created(){
			this.fetchParents()
			//当前面的为真的时候，执行后面
			this.id && this.fetch()
			/* 
			即：if(this.id){
				this.fetch()
			} */
		}
	}
</script>

<!-- <style scoped>  加上虚线边框没有了，局部样式 -->
<style scoped>
	  
</style>
