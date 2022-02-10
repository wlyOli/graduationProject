import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入vant
import Vant from 'vant'
import 'vant/lib/index.css';

//图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
