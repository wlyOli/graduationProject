<template>
	<div class="main">		
		<el-container style="height: 100vh;">
		  <!-- 侧边导航栏 -->
		  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			<!-- 
				router:路由跳转
				:default-openeds="['1']"
			-->
		    <el-menu router
					 :default-openeds="['2']">
			  <el-submenu index="1">
				 <template slot="title"><i class="el-icon-menu"></i>内容管理</template>
				 <el-menu-item-group>
				   <template slot="title">管理员</template>
				   <el-menu-item index="/admin/create">新建管理员</el-menu-item>
				   <el-menu-item index="/admin/list">管理员列表</el-menu-item>
				 </el-menu-item-group>
				 <el-menu-item-group>
				   <template slot="title">分类管理</template>
				   <el-menu-item index="/categories/create">新建分类</el-menu-item>
				   <el-menu-item index="/categories/list">分类列表</el-menu-item>
				 </el-menu-item-group>
				 <el-menu-item-group>
				   <template slot="title">品牌管理</template>
				   <el-menu-item index="/brands/create">新建品牌</el-menu-item>
				   <el-menu-item index="/brands/list">品牌列表</el-menu-item>
				 </el-menu-item-group>
			  </el-submenu>
			  
		      <el-submenu index="2">
		        <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
		      <el-menu-item-group>
		         <template slot="title">商品</template>
		      				  <el-menu-item index="/products/create">新建商品</el-menu-item>
		      				  <el-menu-item index="/products/list">商品列表</el-menu-item>
		         
		       </el-menu-item-group>
			   <!-- <el-menu-item-group>
		          <template slot="title">水果</template>
				  <el-menu-item index="/fruits/create">新建水果</el-menu-item>
				  <el-menu-item index="/fruits/list">水果列表</el-menu-item>
		          
		        </el-menu-item-group>
		        <el-menu-item-group title="蔬菜">
					<el-menu-item index="/vegetables/create">新建蔬菜</el-menu-item>
					<el-menu-item index="/vegetables/list">蔬菜列表</el-menu-item>
		         
		        </el-menu-item-group>
				<el-menu-item-group title="禽畜肉蛋">
					<el-menu-item index="/meets/create">新建禽畜肉蛋</el-menu-item>
					<el-menu-item index="/meets/list">禽畜肉蛋列表</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="水产">
					<el-menu-item index="/aquatic/create">新建水产</el-menu-item>
					<el-menu-item index="/aquatic/list">水产列表</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="农副加工">
					<el-menu-item index="/agricultural/create">新建农副加工</el-menu-item>
					<el-menu-item index="/agricultural/list">农副加工列表</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="粮油米面">
					<el-menu-item index="/rice/create">新建粮油米面</el-menu-item>
					<el-menu-item index="/rice/list">粮油米面列表</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="苗木花草">
					<el-menu-item index="/plantlet/create">新建苗木花草</el-menu-item>
					<el-menu-item index="/plantlet/list">苗木花草列表</el-menu-item>
				</el-menu-item-group> -->
		      </el-submenu>
			  <el-submenu index="3">
			    <template slot="title"><i class="el-icon-message"></i>广告资讯</template>
			    <el-menu-item-group>
			      <template slot="title">广告</template>
			      <el-menu-item index="/advs/create">新建广告</el-menu-item>
			      <el-menu-item index="/advs/list">广告列表</el-menu-item>
			    </el-menu-item-group>
			  </el-submenu>
		    </el-menu>
		  </el-aside>
		  <!-- 头部设置 -->
		  <el-container>
		    <el-header style="text-align: right; font-size: 12px">
		      <el-dropdown @command="loginOut">
		        <i class="el-icon-setting" style="margin-right: 15px"></i>
		        <el-dropdown-menu slot="dropdown">
		          <el-dropdown-item>退出</el-dropdown-item>
		        </el-dropdown-menu>
		      </el-dropdown>
		      <span>user</span>
		    </el-header>
		    <el-main>
				<router-view></router-view>
		    </el-main>
		  </el-container>
		</el-container>
		
	</div>
</template>

<script>
	export default {
	name:'Main',
	  data() {
	    // const item = {
	    //   date: '2016-05-02',
	    //   name: '王小虎',
	    //   address: '上海市普陀区金沙江路 1518 弄'
	    // };
	    return {
	      // tableData: Array(20).fill(item)
	    }
	  },
	  methods:{
		  loginOut(){
			  localStorage.removeItem('token')
			  // 跳转到登录页
			  this.$router.push('/')
			  console.log('tuichu')
		  }
	  }
	};
</script>
 
<style>
	
	.main{
		width:100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin:0 auto;
		
	}
	.el-header {
	  background-color: #B3C0D1;
	  color: #333;
	  line-height: 60px;
	}
	
	.el-aside {
	  color: #333;
	}
	
	.el-main{
		/* Main右部 */
		  
		  /*width: 85%; position: absolute; */
		  background-color: white;
		  border: #bbb solid 1px;
		  /* height: 100vh; */
		   margin-left: 8%;
		  
		  position: relative;
		  width: 92%;
		  height: 89vh;
	}
	.el-container{
		  position: relative;
		  width: 100vm;
	}
	.el-aside{
		  position: relative;
		  left: 7%;
		  z-index: 2;
		  background-color: white;
		  border: #bbb solid 1px;
	}
</style>