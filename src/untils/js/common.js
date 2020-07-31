import store from "../../store"

// 线上地址
const BASE_URL = '/'
// 开发地址          
const DEV_URL = '/admin'
// 上传文件地址
const UPLOAD_URL = '/upload'

// 上传路径、远程地址
const UPLOAD_PATH = 'banner'

// 上传远程
const UPLOAD_REMOTE = 'qiniu'

/**
 * 上传信息
 * @param 文件夹 path 
 * @param 本地 or 远程 qiniu、又拍云、OSS... types 
 */
export function update_info(path = UPLOAD_PATH, types = UPLOAD_REMOTE) {
    return {
        path: path,
        types: types
    }
}

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

/**
 * 笛卡尔集
 * [[1,2], [4,8], [16,32]]
 * @param {array} array 
 */
export function cartesian(array) {
    if (!Array.isArray(array)) {
        return []
    } else {
        return array.reduce((a, b) => {
            return a.map((x) => {
                return b.map((y) => {
                    return x.concat(y)
                })
            }).reduce((a, b) => {
                return a.concat(b)
            }, [])
        }, [
            []
        ])
    }
}


/**
 * 时间戳转换格式
 * @param {时间戳} time 
 */
export function timestamp(time) {
    if (time) {
        var now = new Date(time * 1000),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate()

        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
}



/**
 * 数组合并
 * @param {*} array 
 */
export function array_chunk(array) {
    var arr = []
    if (Array.isArray(array)) {
        array.map(item => {
            if (Array.isArray(item)) {
                let data = array_chunk(item)
                arr = data
            } else {
                arr.push(item.id)
            }
        })
    }
    return arr
}


export {
    BASE_URL,
    DEV_URL,
    UPLOAD_URL,
}