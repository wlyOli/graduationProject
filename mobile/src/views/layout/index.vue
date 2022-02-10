<template>
  <div class="layout">
	  <!-- 子路由的出口 -->
	  <router-view></router-view>
	  <!-- <router-link to='/shopCar'></router-link> -->
	  <!-- 底部标签导航栏 -->
	  <van-tabbar v-model="active">
	    <van-tabbar-item icon="home-o" to='/' >首页</van-tabbar-item>
	    <van-tabbar-item icon="shopping-cart-o" to='/shopCar'>购物车</van-tabbar-item>
	    <van-tabbar-item icon="user-o" to='/my'>我的</van-tabbar-item>
	  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data(){
	  return{
		  active:0
	  }
  },
  components: {
    // HelloWorld
  }
}
</script>
