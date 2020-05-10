import vue from 'vue'
import Vuex from 'vuex'

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
        set_id(state, data) {
            this.state.id = data
        },
        // 修改 table
        edit_tabs(state, data) {
            this.state.table = data
        },
        // 添加tabs
        add_tabs(state, data) {
            let status = true
            for (let key in this.state.path) {
                if (this.state.path[key]['path'] === data.path || this.state.path[key]['path'] === '/' + data.path) {
                    status = false
                }
            }
            this.state.active = data.path
            if (status) {
                this.state.path.push(data)
            }
        },
        // 设置当前激活的tab
        set_active_index(state, index) {
            this.state.active = index
        },
        // 关闭tab
        close_tab(state, path) {
            let tabs = this.state.path
            let activeTab = path;
            let activeName = '';
            let index = 0;
            if (activeTab === path) {
                tabs.forEach((tab, key) => {
                    if (tab.path === path) {
                        let nextTab = tabs[key + 1] || tabs[key - 1];
                        if (nextTab) {
                            activeTab = nextTab.path;
                            activeName = nextTab.name
                        }
                        index = key
                    }
                });
            }
            this.state.active = activeTab
            store.commit('add_tabs', {
                path: activeTab,
                name: activeName
            })
            this.state.path.splice(index, 1);
        }
    }
})

export default store