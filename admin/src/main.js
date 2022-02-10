import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './http.js'
import './style.css'
Vue.use(ElementUI);
//挂载到vue实例上,任何地方都可以用this访问它 this.$http
Vue.prototype.$http = http


Vue.config.productionTip = false

//全局混入 -- 上传图片
Vue.mixin({
	methods:{
		getAuthHeader(){
			return{
				Authorization:`Bearer ${localStorage.token || ''}`
			}
		}
	}
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
