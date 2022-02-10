<template>
	<div class="category">
		<h1>新建、编辑 分类</h1>
		<el-form :model="model" label-width="120px" @submit.native.prevent = "save">
		  <el-form-item label="上级分类">
		    <el-select v-model="model.parent" placeholder="请选择">
				<el-option v-for="item in parents" 
						   :key="item._id"                        
						   :label="item.name"
						   :value="item._id">
			    </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="分类名称">
			<el-input v-model="model.name"></el-input>
	      </el-form-item>  
		  <el-form-item>
		    <el-button type="primary" native-type="submit">保存</el-button>
		  </el-form-item>
		</el-form>

	</div>
</template>

<script>
	export default{
		name:"CategoryEdit",
		props:{
			//父级 prop 的更新会向下流动到子组件中
			//编辑详情页面加上props id才能显示..。
			id:{}
		},
		data() {
		      return {
		        model: {},
				parents:[]
				
		      }
		    },
			created(){
				this.fetchParents(),
				this.id&&this.fetch()
				//this.fetch()
			},
		    methods: {
		      async save() {
				  let res
				//有id，更新编辑内容---put
				if(this.id){
					res = await this.$http.put(`rest/categories/${this.id}`,this.model) 
				}else{
				//没有id---创建
					res = await this.$http.post('rest/categories',this.model)
				}
				
				//跳转到编辑详情页
				this.$router.push('/categories/list')
				//保存成功提示
				this.$message({
					message: '保存成功',
					type: 'success'
				});
		      },
			  //获取编辑
			  async fetch(){
				  const res = await this.$http.get(`rest/categories/${this.id}`)
				  this.model = res.data
			  },
			  //显示上级分类
			  async fetchParents(){
				  const res = await this.$http.get('rest/categories')
				  this.parents = res.data
			  }
			  
		    }
		
	}
</script>

