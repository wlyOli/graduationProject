<template>
	<div class="search"> 
		<!-- 搜索栏 -->
		<van-search
		  v-model="searchText"
		  shape="round"
		  background="#4fc08d"
		  placeholder="请输入搜索关键词"
		  @search="onSearch(searchText)"
		  
		/>
		
		<!--
			思路：当有结果的时候，显示searche-result
				 有内容，search-suggestion
				 其余情况（没有内容），历史记录search-history
				 
				 当调用onSearch时，展示搜索结果
				 
		 -->
		 <!-- 父传子：   ：子组件接收的名称=“父元素中的变量名” -->
		 <!-- 搜索结果 -->
		 <search-result v-if="isResultShow" 
						:search-text="searchText"></search-result>
		 
		 <!-- 历史记录 -->
		 <search-history v-else
				 :search-histories="searchHistories"
				 :search="onSearch"
				 @updata-histories='allDelete'></search-history>
	</div>
</template>

<script>
	import SearchResult from './components/SearchResult.vue'
	import SearchHistory from './components/SearchHistory.vue'
	
	import { setItem,getItem } from '@/utils/storage'
	import { getHistories,allDelete } from '@/api/search'
	
	export default{
		name:"Search",
		data(){
			return{
				searchText:'',
				isResultShow:false,//搜索结果
				searchHistories:[]//搜索历史记录
			}
		},
		created(){
			this.loadHistories()
		},
		methods:{
			onSearch(val) {
				this.searchText = val
				//console.log('onsearch',val)
				
				//记录搜索记录
				//不能重复
				//每次放在最前面
				
				const index = this.searchHistories.indexOf(val)
				if(index !== -1){
					//重复了，就把该项移除
					this.searchHistories.splice(index,1)
				}
				//把最新历史记录记录到顶部
				this.searchHistories.unshift(val)
				
				//如果用户登录，则把记录存储到线上
				
				//没有登录，记录存储到本地
				setItem('search-histories',this.searchHistories)
				
				
				
				console.log('this.searchHistories',this.searchHistories)
				this.isResultShow = true 
			},
			
			//历史记录
			async loadHistories(){
				let searchHistories = getItem('search-histories')||[]
				
				// if(this.user){
				// 	const res = await getHistories()
				// 	console.log('历史',res.data)
				// 	//合并数组:[...数组，...数组]
				// 	//把set对象转为数组：[...Set]
				// 	//数组去重：[...new Set([])]
				// 	searchHistories = [...new Set([...searchHistories,...res.data])]
					
				// }
				
				//if(this.user){
					const res = await getHistories()
					console.log('历史',res.data)
					//合并数组:[...数组，...数组]
					//把set对象转为数组：[...Set]
					//数组去重：[...new Set([])]
					searchHistories = [...new Set([...searchHistories,...res.data])]
					
				//}
				
				
				
				this.searchHistories = searchHistories
			},
			allDelete(){
				
			},
		},
		components:{
			SearchResult,
			SearchHistory
		}
	}
</script>

<style>
</style>
