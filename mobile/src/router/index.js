import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
	// vue-router中,当有子路由的时候,父级路由需要一个默认的路由,所以这个时候不能给父级路由设置name属性
    // name: 'Layout',
    component: Layout,
	children:[
		{
			path:'',
			name:'Home',
			component: ()=> import('../views/home/index.vue')
			//component: ()=> import('../views/home/')
		},
		{
			path:'/shopCar',
			name:'shopCar',
			component: ()=> import('../views/shopCar/')
		},
		{
			path:'/my',
			name:'My',
			component:()=> import('../views/my/')
		}
	]
  },
  {
  	path:'/detail/:id',
  	name:'Detail',
  	component:()=> import('../views/detail/')
  },
  {
  	path:'/search',
  	name:'Search',
  	component:()=> import('../views/search/')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
