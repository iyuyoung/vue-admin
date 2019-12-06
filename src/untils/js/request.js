//引入fly实例
var fly = require("flyio")
// loading
var load = ''
import {
    Loading
} from 'element-ui'
// 配置请求基地址
fly.config.baseURL = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8080/admin' : 'http://127.0.0.1:8081/admin'

fly.interceptors.request.use(
    (request) => {
        load = Loading.service({
            fullscreen: true
        })
        // 给所有请求添加自定义header
        request.headers['token'] = localStorage.getItem('token')
        return request
    }
)

fly.interceptors.response.use(
    (response, promise) => {
        load.close()
        return promise.resolve(response.data)
    },
    (err, promise) => {
        if (err.response.data.error_code === 9999) {
            localStorage.clear()
            window.location.reload()
        }
        load.close()
        return promise.resolve()
    }
)

/***
 * 请求数据
 * @param url
 * @param data
 * @param method
 * @returns {FlyPromise<any>}
 */
export function getData(url, data, method = 'GET') {
    return fly.request(url, data, {
        'method': method
    })
}