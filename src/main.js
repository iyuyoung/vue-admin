import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './untils/css/base.css'
import './plugins/element.js'
import VCharts from 'v-charts'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.config.productionTip = false
Vue.prototype.Base = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8080' : 'https://tail.mphot.cn/'
Vue.use(VCharts, Loading)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
