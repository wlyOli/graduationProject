<template>
	<div class="adv">
		<h1>广告列表</h1>
		<el-table
		  :data="model"
		  style="width: 100%">
		  <el-table-column
			prop="_id"
			label="ID"
			width="280">
		  </el-table-column>
		  <el-table-column
			prop="name"
			label="广告名称"
			width="320">
		  </el-table-column>
		   <el-table-column label="操作" width='230'>
		        <template slot-scope="scope">
		          <el-button
		            size="mini"
		            @click="$router.push(`/advs/edit/${scope.row._id}`)">编辑</el-button>
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
		name:"AdvList",
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
				const res = await this.$http.get('rest/advs')
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
						  const res = await this.$http.delete(`rest/advs/${row._id}`)
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
