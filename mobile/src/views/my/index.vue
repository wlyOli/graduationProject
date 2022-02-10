<template>
    <div class="my">
		<!-- 第一部分 -->
		<!-- v-if="user" -->
		<van-cell-group class="my-info" >
			<!-- <img src="../../assets/2.jpg" /> -->
           <van-cell 
             center
             class="base-info"
             :border="false">
             <!-- <van-image
               class="avatar"
               slot="icon"
               round
               fit="cover"
			   :src="currentUser.avatar"
               /> -->
			   <van-button
			       class="updata-btn" 
			       size="small"
			       round
					 to='/user/profile'
					 >
					 编辑资料
					 </van-button>
					 </van-cell>
					 <van-cell>
             <div slot="title" class="name">昵称:{currentUser.nickname}}</div>
             
           </van-cell>
		   
		   <!-- 第一部分第二小块-->
           <!-- <van-grid :column-num="2" :border="false">
             <van-grid-item class="data-info-item">
                  <div slot="text" class="text-wrap">
                      <div class="count">0</div>
                      <div class="text">关注</div>
                  </div>
             </van-grid-item>
              <van-grid-item class="data-info-item">
                  <div slot="text" class="text-wrap">
                      <div class="count">0</div>
                      <div class="text">店铺</div>
                  </div>
             </van-grid-item>             
            </van-grid> -->
        </van-cell-group>
        
		<!-- 未登录状态 -->
		<!-- v-else -->
		<div class="not-login" >
			<!--  @click="$router.push('/login')" -->
			<div class="text" 
				 @click="$router.push({
					 name:'login',
					 query:{
						 redirect:'/my'
					 }
				 })">登录注册</div>
		</div>
        
        <!--  第二部分 -->
        <van-grid :column-num="2" class="nav-grid mb-4">
             <van-grid-item icon="star-o" text="收藏" class="nav-grid-item"/>  
             <van-grid-item icon="browsing-history-o" text="关注" class="nav-grid-item"/>        
        </van-grid>
        <!-- 第三部分 页面导航-->
        <!-- <van-cell title="帮助" is-link000000 to="" />
        <van-cell class="mb-4" title="关于我们" is-link to=""/>
        -->
		<!-- v-if="user" -->
        <van-cell 
            
            class="loginout-cell" 
            title="退出登录"
            @click="onLogout"
            />
    </div>
</template>
<script>
   //import { mapState } from 'vuex'
   //import {getCurrentUser} from '@/api/user'
   export default{
       name:'My',
       data(){
           return{
			   //data里的名称不能和mapState（vuex）重名
              currentUser:{}
           }
       },
       computed:{
		   //mapState是个方法，将user映射到当前组件
		   //...mapState(['user'])
	   },
	   created(){
		  // this.loadCurrentUser()
	   },
	   methods:{
		   onLogout(){
				this.$dialog.confirm({
				  title: '退出提示',
				  message: '确认退出？',
				})   
				  .then(() => {
					// 清楚用户登录状态
					//vuex 调用
					this.$store.commit('setUser',null)
					this.$store.commit('setUserInfo',null)
					
				  })
				  .catch(() => {
					// on cancel
				  });   
		   },
		   //当前用户信息
		   // async loadCurrentUser(){
			  //  const { data } = await getCurrentUser(this.user.username)
			  //  //console.log('data',data)
			  //  // this.currentUser = data[0]
			  //  // console.log('this.currentUser',this.currentUser)
			   
			  //  if(data.length != 0){
			  //  	                this.currentUser = data[0]
			  //  					console.log('this.currentUser22',this.currentUser)
			  //  				}

		   // }
		   //当前用户信息
		   			// async loadCurrentUser(){
		   			// 	const { data } = await getCurrentUser(this.user.username)
		      //              if(data.length != 0){
		      //                 this.currentUser = data[0]
		   		 //                }							
		   			// 	console.log('this.currentUser',this.currentUser)
		   			// },
					
		   
	   }
   }
</script>
<!-- <style scoped lang="less">
	img{
		height: 150px;
		width: 100%;
	}
	.my{
		.my-info{
			 background-color: #fff;
			.base-info{
				  background-color: #fff;
				  height: 90px;
				  padding-top: 38px;
				  padding-bottom: 11px;
				  .avatar{
					  width:70px;
					  height:70px;
					  border: 1px solid #fff;
					  box-sizing: border-box;
					  margin-right: 12px;
					  margin-bottom: 5px;
				  }
				  .name{					     
					  color: #fff;						
				  }
				  
			 }
			/deep/ .van-grid-item__content{
								 background-color: unset;
			}
				
			/deep/ .data-info-item{
				color: white;
				.text-wrap{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.count{
						font-size: 18px;
					}
					.text{
						font-size: 12px;
					}
				}
			}
			
			 
		}
		.nav-grid{
			.nav-grid-item{
				height: 70px;
				.van-icon{
					font-size: 22px;
				}
				/deep/ .van-icon-star-o{
					color: #eb5253;
				}
				/deep/ .van-icon-like-o{
					color: #EBB563;
				}
				/deep/ .van-grid-item__text{
					font-size: 14px;
					color: #333333;
				}
			}
		}
		.not-login{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 180px;
			background-color:#62b9ce;
			color: white;
		}
	
		
		.loginout-cell{
			color: #d86262;
			text-align: center;
		}
		.mb-4{
			margin-bottom: 4px;
		}
		.updata-btn{
			border: 1px solid  #FB8F8D;
			width: 200px;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: none;
			font-size: 18px;
			color: #FB8F8D;
		}
		.van-cell__value {
		    display: flex;
		    justify-content: center;
		    align-items: center;
		}
		.van-cell__title{
			font-size: 20px;
			height: 50px;
			margin-top: 20px;
			color: gray;
		}
	}
</style> -->