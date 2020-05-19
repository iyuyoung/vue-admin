import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './untils/css/base.css'
import './plugins/element.js'
import 'remixicon/fonts/remixicon.css'
import VCharts from 'v-charts'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.config.productionTip = false
Vue.prototype.Base = process.env.NODE_ENV == 'development' ? '/admin' : ''
Vue.use(VCharts, Loading)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
