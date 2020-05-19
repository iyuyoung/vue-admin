import store from "../../store"

// 线上地址
const BASE_URL = '/'
// 开发地址          
const DEV_URL = '/admin'
// 上传文件地址
const UPLOAD_URL = '/upload'

/**
 * 关闭tab
 * @param {*} path 
 */
export function closeTab(path = '') {
    if (!path) {
        path = store.state.active
    }
    store.commit('close_tab', path)
}


export {
    BASE_URL,
    DEV_URL,
    UPLOAD_URL
}