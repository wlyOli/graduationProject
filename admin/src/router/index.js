import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

const CategoryEdit = () => import('../views/category/CategoryEdit.vue')
const CategoryList = () => import('../views/category/CategoryList.vue')
const BrandEdit = () => import('../views/brand/BrandEdit.vue')
const BrandList = () => import('../views/brand/BrandList.vue')

const VegetableEdit = () => import('../views/products/vegetable/VegetableEdit.vue')
const VegetableList = () => import('../views/products/vegetable/VegetableList.vue')
const FruitEdit = () => import('../views/products/fruit/FruitEdit.vue')
const FruitList = () => import('../views/products/fruit/FruitList.vue')
const MeetEdit = () => import('../views/products/meet/MeetEdit.vue')
const MeetList = () => import('../views/products/meet/MeetList.vue')
const AquaticEdit = () => import('../views/products/aquatic/AquaticEdit.vue')
const AquaticList = () => import('../views/products/aquatic/AquaticList.vue')
const AgriculturalEdit = () => import('../views/products/agricultural/AgriculturalEdit.vue')
const AgriculturalList = () => import('../views/products/agricultural/AgriculturalList.vue')
const RiceEdit = () => import('../views/products/rice/RiceEdit.vue')
const RiceList = () => import('../views/products/rice/RiceList.vue')
const PlantletEdit = () => import('../views/products/plantlet/PlantletEdit.vue')
const PlantletList = () => import('../views/products/plantlet/PlantletList.vue')

const AdvEdit = () => import('../views/adv/AdvEdit.vue')
const AdvList = () => import('../views/adv/AdvList.vue')
const AdminEdit = () => import('../views/adminUser/AdminEdit.vue')
const AdminList = () => import('../views/adminUser/AdminList.vue')


const ProductEdit = () => import('../views/products/product/ProductEdit.vue')
const ProductList = () => import('../views/products/product/ProductList.vue')



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
	meta:{isPublic:true}
	
  //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
	children:[
		{ path:'/admin/create',component:AdminEdit },
		{ path:'/admin/edit/:id',component:AdminEdit,props:true},
		{ path:'/admin/list',component:AdminList },
		
		{ path:'/categories/create',component:CategoryEdit },
		{ path:'/categories/edit/:id',component:CategoryEdit,props:true},
		//props:true路由通讯，父子传值
		{ path:'/categories/list',component:CategoryList },
		
		{ path:'/brands/create',component:BrandEdit },
		{ path:'/brands/edit/:id',component:BrandEdit,props:true},
		{ path:'/brands/list',component:BrandList },
		
		{ path:'/advs/create',component:AdvEdit },
		{ path:'/advs/edit/:id',component:AdvEdit,props:true},
		{ path:'/advs/list',component:AdvList },
		
		{ path:'/products/create',component:ProductEdit },
		{ path:'/products/edit/:id',component:ProductEdit,props:true},
		{ path:'/products/list',component:ProductList },
		
		// { path:'/vegetables/create',component:VegetableEdit },
		// { path:'/vegetables/edit/:id',component:VegetableEdit,props:true},
		// { path:'/vegetables/list',component:VegetableList },
		
		// { path:'/fruits/create',component:FruitEdit },
		// { path:'/fruits/edit/:id',component:FruitEdit,props:true},
		// { path:'/fruits/list',component:FruitList },
		
		// { path:'/meets/create',component:MeetEdit },
		// { path:'/meets/edit/:id',component:MeetEdit,props:true},
		// { path:'/meets/list',component:MeetList },
		
		// { path:'/aquatic/create',component:AquaticEdit },
		// { path:'/aquatic/edit/:id',component:AquaticEdit,props:true},
		// { path:'/aquatic/list',component:AquaticList },
		
		// { path:'/agricultural/create',component:AgriculturalEdit },
		// { path:'/agricultural/edit/:id',component:AgriculturalEdit,props:true},
		// { path:'/agricultural/list',component:AgriculturalList },
		
		// { path:'/rice/create',component:RiceEdit },
		// { path:'/rice/edit/:id',component:RiceEdit,props:true},
		// { path:'/rice/list',component:RiceList },
		
		// { path:'/plantlet/create',component:PlantletEdit },
		// { path:'/plantlet/edit/:id',component:PlantletEdit,props:true},
		// { path:'/plantlet/list',component:PlantletList },
		
		
		
		
	]
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
