<template>
	<div class="items-list">
		<!-- v-model设置为false表示加载完成 -->
		<van-pull-refresh
		  v-model="isLoading"
		  :success-text="RefreshText"
		  @refresh="onRefresh"
		  success-duration="1500"
		>		
		<!-- 轮播图 -->
		<van-swipe :autoplay="3000" class="swipe-block" v-if="categories.name=='蔬菜'">
		  <van-swipe-item v-for="(item, index) in images" :key="index">
		    <img v-lazy="item.image" style="width: 100%;"/>
		  </van-swipe-item>
		</van-swipe>
		
		<van-list v-model="loading"
				  :finished="finished"
				  finished-text="没有更多了"
				  @load="onLoad">
			<!-- 列表项 -->
				  <!-- <van-cell v-for="item in list" :key="item._id" :title="item.title" /> -->
			  <goods v-for="(item, index) in list" :key="index" :goods="item" ></goods>
		</van-list>
		
		</van-pull-refresh>
		
	</div>
</template>

<script>
	import { getItems,getSwipImg } from '@/api/product.js'
	import Goods from '../../../components/goods/index.vue'
	export default{
		name:'ItemsList',
		// 父组件穿单个值用[] props:["categories"],
		props:{
			categories:{
				type:Object,
				required:true
			}
		},
		components:{
			Goods
		},
		created(){
			this.getSwip()
		},
		data(){
			return{
				isLoading:false,
				RefreshText:'',
				loading: false,
				finished: false,
				pageNum:1,
				pageSize:5,
				images:[],
				list:[],
			}
		},
		methods:{
			async onLoad() {
				 
				 //1.请求数据
				 const { data } = await getItems({
					 categoryId:this.categories._id,
					 pageNum:this.pageNum,
					 pageSize:this.pageSize
				 })
				 console.log('res.dataaaaa',data)
				 
				 //2.把数据放到list: []再传给组件
				 
				 this.list.push(...data.itemsList)
				 //3.加载状态结束设置，本次加载状态，它才可以判断是否需要加载下一次
				 //否则它就停在那里
				 this.loading = false;
				 
				 //4.数据全部加载完成
				 if(data.itemsList>=this.pageSize){
					 this.pageNum++
				 }else{
					 this.finished = true
				 }
				 
				
			},
			 async onRefresh() {
				 //1.请求数据
				  const { data } = await getItems({
					 categoryId:this.categories._id,
					 pageNum:this.pageNum,
					 pageSize:this.pageSize
				  })				  
				  //2.把数据从后插入list  unshift
				  this.list.unshift(...data.itemsList)
				  console.log('下拉刷新')
				  //3.关闭刷新状态
				this.isLoading = false
				this.RefreshText = `更新了${ data.itemsList.length}条数据`
					
			},
			async getSwip(){
				// 获取轮播图图片(广告)
				const { data } = await getSwipImg()
				console.log('data.getSwipImg',data)
				this.images = data[0].items
			},
			
		}
	}
</script>

<style>
	.swipe-block{
		height: 200px;
		width: 100%;
	}
	.items-list{
		position: fixed;
		right:0;
		left: 0;
		bottom: 50px;
		overflow: auto;/* 滑动 */
		top: 90px;
	}
</style>
