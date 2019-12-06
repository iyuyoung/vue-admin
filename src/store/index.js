import vue from 'vue'
import Vuex from 'vuex'
import route from '../router/index'

vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        table: {},
        coupon: {},
        id: 0,
        path: [{
            path: '/',
            name: '主页'
        }],
        active: '/'
    },
    mutations: {
        setid(state, data) {
            this.state.id = data
        },
        // 修改 table
        edit_tabs(state, data) {
            this.state.table = data
        },
        // 修改 coupon
        edit_coupon(state, data) {
            this.state.coupon = data
        },
        // 添加tabs
        add_tabs(state, data) {
            let status = true
            for (let key in this.state.path) {
                if (this.state.path[key]['path'] === data.path || this.state.path[key]['path'] === '/' + data.path) {
                    status = false
                }
            }
            route.push(data)
            this.state.active = data.path
            if (status) {
                this.state.path.push(data)
            }
        },
        // 设置当前激活的tab
        set_active_index(state, index) {
            this.state.active = index
        },
    }
})

export default store