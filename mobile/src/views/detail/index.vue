<template>
	<div class="detail">
		<!-- {{$route.params.id}} -->
		<!-- 导航 -->		
		<van-nav-bar
		  title="详情页"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<!-- 商品图片 -->
		<van-swipe :autoplay="3000" class="swiper-block">
		   <van-swipe-item>
			   <!-- :src="detailsInfo.icon" -->
			  <img  style="width:100%" :src="details.icon"/>
		   </van-swipe-item>
		</van-swipe>
		<!-- 商品介绍 -->
		<div calss="detail-info">
			<van-row type="flex" justify="space-around">
				<van-col span="6" class="title">{{details.title}}</van-col>
				<van-col span="10" offset="4"></van-col>

				<van-col span="24">
					<van-col span="8" class="price">￥{{details.price}}</van-col>
					<van-col span="4" offset="4"></van-col>
					<van-col span="5">
						<van-icon name="star-o"
								  isFavor
								  :color="isFavor?'red':''"
								  @click="iconClick"/>
					</van-col>
				</van-col>	
			</van-row>
			
			
			<!-- <van-stepper v-model="value" /> -->

			<!-- 品牌信息 -->
			<van-row type="flex" justify="space-around" class='isFollow'>
				<van-col span="6" class="title">details.brands</van-col>
				<van-col span="10" offset="4">
					<van-button class="button" 
								:color="isFollow?'':'red'"
								:text="isFollow?'已关注':'+关注'"
								@click="changeButton"></van-button>
				</van-col>
			</van-row>
						
		</div>
		<!-- 底部 -->
		<van-goods-action>
		  <!-- <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" /> -->
		  <!-- <van-goods-action-icon icon="cart-o" text="购物车" /> -->
		  <van-goods-action-icon icon="star" 
								:text="isFavor?'已收藏':'未收藏'" 
								:color="isFavor?'#ff5000':''" />
		  <van-goods-action-button type="warning" text="加入购物车" @click="addToCar" />
		  <van-goods-action-button type="danger" text="立即购买" @click="buyItems"/>
		</van-goods-action>
		<!-- 商品规格 -->
		
	</div>
</template>

<script>
	import { getItemDetails } from '../../api/details.js'
	export default{
		name:"Detail",
		// props:{
		// 	id:''
		// },
		data(){
			return{
				details:{
					
				},
				isFavor:false,
				isFollow:false,
				
			}
		},
		created(){
			this.getDetails()
		},
		methods:{
			async getDetails(){
				const { data } = await getItemDetails(this.$route.params.id)
				console.log('getDetails data',data)
				this.details = data
			},
			onClickLeft(){
				this.$router.back()
			},
			iconClick(){
				this.isFavor = !this.isFavor
				console.log('点击收藏')
			},
			changeButton(){
				this.isFollow = !this.isFollow
				console.log('this.iddd',this.id)
				console.log('切换关注按钮')
			},
			addToCar(){
				console.log('加入购物车')
			},
			buyItems(){
				console.log('立即购买')
			},
			onBuyClicked(){
				console.log('onBuyClicked')
			},
			onAddCartClicked(){
				console.log('onAddCartClicked')
				
			}
		}
	}
</script>

<style>
	.van-nav-bar{
		background-color: seagreen;
	}
	.van-nav-bar .van-icon{
		color: white;
	}
	.van-nav-bar__title{
		color: white;
	}
    /* .van-col{
		background-color: #409EFF;
	} */
	.title{
	    font-size:16px;
	    margin: 15px 0;
	}
	.price{
	    font-size:16px;
		color: red;		
	}
	.button{
		border-radius: 10px;
		margin: 15px 7px;
		height: 25px;
		width: 80px;
	}
	.isFollow{
		background-color: #D3D3D3;
		margin-top: 10px;
	}
</style>
