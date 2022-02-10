<template>
	<div class="goods">
		<van-card
		  :price="goods.price"
		  :desc="goods.title"
		  :title="goods.name"
		  :thumb="goods.icon"
		  @click="itemClick"
		/>
	</div>
</template>

<script>
	import { getItems } from '@/api/product'
	
	export default{
		name:'Goods',
		props:{
			goods:{
				type:Object,
				required:true
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			itemClick(){
				console.log('itemClick,,,')
				this.$router.push('/detail/'+this.goods._id)
				
				//query
				//detail?id=111
				// this.$router.push({
				// 	path:'/detail',
				// 	query:{
				// 		id:this.goods._id
				// 	}
				// })
			}
		}
	}
</script>

<style>
</style>
