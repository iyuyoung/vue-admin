import {
    DEV_URL,
    BASE_URL
} from './common'


//引入fly实例
var fly = require("flyio")
// loading
var load = ''
import {
    Loading,
    Message
} from 'element-ui'
// 配置请求基地址
fly.config.baseURL = process.env.NODE_ENV == 'development' ? DEV_URL : BASE_URL

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
        } else {
            Message({
                message: err.response.data.msg,
                type: 'error'
            })
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
export function request(url, data, method = 'GET') {
    return fly.request(url, data, {
        'method': method
    })
}