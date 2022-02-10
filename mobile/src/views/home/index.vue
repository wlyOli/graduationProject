<template>
	<div class="home"> 
		<!-- 搜索栏 -->
		<van-nav-bar class="app-nav-bar">
			<van-button  
				icon="search" 
				slot="title" 
				class="search-button"
				to='/search'>搜索</van-button>
		</van-nav-bar>
		<!-- 标签栏 -->
		<van-tabs v-model="active">
		  <van-tab v-for="item in categories"
				   :key="item._id"
				   :title="item.name">
				   <!-- 组件使用：创建  引入  注册(components) 使用(items-list) -->				
				<items-list  :categories = "item"></items-list>
				<!-- :子组件接收的名称 = 父组件内容-->
		  </van-tab>	
		</van-tabs>
	</div>
</template>

<script>
	import {getCategories} from '../../api/user.js'
	import ItemsList from './component/ItemsList.vue'
	export default{
		name:"Home",
		data(){
			return{
				active:0,
				categories:[]
			}
		},
		created(){
			this.loadCategories()
		},
		methods: {
		   async loadCategories(){
			   const { data } = await getCategories()
			   this.categories = data
		   }
		},
		components:{
			ItemsList
		}
	}
</script>

<style>
	.app-nav-bar{
		background-color: seagreen;
	}
	.van-nav-bar .van-icon{
		color: white;
	}
	.search-button{
		height: 35px;
		width: 190px;
		border-radius: 15px;
		background-color: lightgray;
		color: white;
	}
</style>
