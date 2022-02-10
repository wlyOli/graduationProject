<template>
	<div class="brand">
		<h1>品牌列表</h1>
		<el-table
		  :data="model"
		  style="width: 100%">
		  <el-table-column
			prop="_id"
			label="ID"
			width="230">
		  </el-table-column>
		  <el-table-column
			prop="name"
			label="品牌名称"
			width="230">
		  </el-table-column>
		 <el-table-column label="图片" width='200'>
			  <template slot-scope="scope">
			  　　<img :src="scope.row.icon" width="70" height="70"/>
			  </template>
		  </el-table-column>
		   <el-table-column label="操作" width="230">
		        <template slot-scope="scope">
		          <el-button
		            size="mini"
		            @click="$router.push(`/brands/edit/${scope.row._id}`)">编辑</el-button>
		          <el-button
		            size="mini"
		            type="danger"
		            @click="remove(scope.row)">删除</el-button>
		        </template>
		      </el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		name:"CategoryList",
		data(){
			return {
			  model: [],
			  
			}
		},
		created(){
			this.fetch()
		},
	    methods: {
			//获取页面
			async fetch(){
				const res = await this.$http.get('rest/brands')
				this.model = res.data
				console.log('res.data:',res)
			},
			async remove(row){
				 this.$confirm(`是否删除分类${row.name}?`, '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(async() => {
						  //删除
						  const res = await this.$http.delete(`rest/brands/${row._id}`)
						  //弹框
				          this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
						  
						  //更新数据
						  this.fetch()
						  
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });          
				        });
								
			},
		}
		
	}
</script>

<style>
</style>
