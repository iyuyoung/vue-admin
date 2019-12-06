import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import index from '../components/console/index'
import user from '../components/user/index'
import addUser from '../components/user/add'
import editUser from '../components/user/edit'
import activity from '../components/activity/index'
import hot from '../components/goods/hot'
import team from '../components/goods/team'
import bargain from '../components/goods/bargain'
import banner from '../components/banner/index'
import addBanner from '../components/banner/add'
import editBanner from '../components/banner/edit'
import goods from '../components/goods/index'
import addGoods from '../components/goods/add'
import editGoods from '../components/goods/edit'
import category from '../components/category/index'
import addcategory from '../components/category/add'
import editcategory from '../components/category/edit'
import order from '../components/order/index'
import jdorder from '../components/jdorder/index'
import power from '../components/power/index'
import addPower from '../components/power/add'
import editPower from '../components/power/edit'
import property from '../components/power/index'
import addProperty from '../components/property/add'
import editProperty from '../components/property/edit'
import shopowner from '../components/shopowner/index'
import addShopowner from '../components/shopowner/add'
import editShopowner from '../components/shopowner/edit'
import store from '../components/store/index'
import addStore from '../components/store/add'
import editStore from '../components/store/edit'
import pet from '../components/pet/index'
import addPet from '../components/pet/add'
import editPet from '../components/pet/edit'
import coupon from '../components/coupon/index'
import addCoupon from '../components/coupon/add'
import editCoupon from '../components/coupon/edit'
import Admin from '../components/admin/index'
import addAdmin from '../components/admin/add'
import editAdmin from '../components/admin/edit'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/login',
            name: '登录',
            component: login
        },
        {
            path: '/',
            name: '主页',
            component: index,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/user',
            name: '用户列表',
            component: user,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-user',
            name: '添加员工',
            component: addUser,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-user',
            name: '编辑员工',
            component: editUser,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/activity',
            name: '活动列表',
            component: activity,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/hot',
            name: '抢购列表',
            component: hot,
            meta: {
                keepAlive: true
            }
        },{
            path: '/team',
            name: '团购列表',
            component: team,
            meta: {
                keepAlive: true
            }
        },{
            path: '/bargain',
            name: '砍价列表',
            component: bargain,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-category',
            name: '添加活动',
            component: addcategory,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/edit-category',
            name: '编辑分类',
            component: editcategory,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/goods',
            name: '商品列表',
            component: goods,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-goods',
            name: '添加商品',
            component: addGoods,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-goods',
            name: '编辑商品',
            component: editGoods,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/category',
            name: '分类管理',
            component: category,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-category',
            name: '添加分类',
            component: addcategory,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-category',
            name: '编辑分类',
            component: editcategory,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/banner',
            name: 'banner列表',
            component: banner,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-banner',
            name: '添加banner',
            component: addBanner,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-banner',
            name: '编辑banner',
            component: editBanner,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/order',
            name: '订单列表',
            component: order,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/jdorder',
            name: '京东账单',
            component: jdorder,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/admin',
            name: '管理员设置',
            component: Admin,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-admin',
            name: '添加管理员',
            component: addAdmin,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-admin',
            name: '编辑管理员',
            component: editAdmin,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/power',
            name: '权限设置',
            component: power,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-power',
            name: '添加权限',
            component: addPower,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-power',
            name: '编辑权限',
            component: editPower,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/shopowner',
            name: '店长列表',
            component: shopowner,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-shopowner',
            name: '添加店长',
            component: addShopowner,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-shopowner',
            name: '编辑店长',
            component: editShopowner,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/property',
            name: '物业列表',
            component: property,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-property',
            name: '添加物业',
            component: addProperty,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-property',
            name: '编辑物业',
            component: editProperty,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/property',
            name: '物业设置',
            component: property,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-property',
            name: '添加物业',
            component: addProperty,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-property',
            name: '编辑物业',
            component: editProperty,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/store',
            name: '门店列表',
            component: store,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-store',
            name: '添加门店',
            component: addStore,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/edit-store',
            name: '编辑门店',
            component: editStore,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/pet',
            name: '宠物列表',
            component: pet,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-pet',
            name: '添加宠物',
            component: addPet,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/edit-pet',
            name: '编辑宠物',
            component: editPet,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/coupon',
            name: '优惠券列表',
            component: coupon,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-coupon',
            name: '添加优惠券',
            component: addCoupon,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-coupon',
            name: '编辑优惠券',
            component: editCoupon,
            meta: {
                keepAlive: false
            }
        }
    ]
})
router.beforeEach(function (to, from, next) {
    let token = localStorage.getItem('token')
    //未登录
    if (!token) {
        if (to.path !== '/login') {
            return next({
                path: '/login',
                name: '登录'
            })
        }
        next()
    }
    // 已登录的情况再去登录页，跳转至首页
    if (to.path === '/login') {
        if (token) {
            return next({
                path: '/',
                name: '主页'
            })
        } else {
            return next({
                path: '/login',
                name: '登录',
            })
        }
    }
    next()
})
export default router