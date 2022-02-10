<template>
	<div class="aquatic">
		<h1>水产列表</h1>
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
			label="名称"
			width="220">
		  </el-table-column>
		 <el-table-column label="图片" width='100'>
			  <template slot-scope="scope">
			  　　<img :src="scope.row.icon" width="70" height="70"/>
			  </template>
		  </el-table-column>
		  <el-table-column
			prop="price"
			label="价格"
			width="120">
		  </el-table-column>
		  <el-table-column
			prop="brand"
			label="品牌"
			width="140">
		  </el-table-column>
		   <el-table-column label="操作">
		        <template slot-scope="scope">
		         <el-button
		           size="mini"
				   @click="$router.push(`/aquatic/edit/${scope.row._id}`)">编辑</el-button>
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
		name:"AquaticList",
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
				const res = await this.$http.get('rest/aquatic')
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
						  const res = await this.$http.delete(`rest/aquatic/${row._id}`)
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
