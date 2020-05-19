import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../pages/login'

import index from '../pages/console/index'
import user from '../pages/user/index'
import editUser from '../pages/user/edit'

import staff from '../pages/staff/index'
import add_staff from '../pages/staff/add'
import edit_staff from '../pages/staff/edit'

import auth_menu from '../pages/auth_menu/index'
import add_auth_menu from '../pages/auth_menu/add'
import edit_auth_menu from '../pages/auth_menu/edit'

import auth_role from '../pages/auth_role/index'
import add_auth_role from '../pages/auth_role/add'
import edit_auth_role from '../pages/auth_role/edit'


import business from '../pages/business/index'
import addBusiness from '../pages/business/add'
import editBusiness from '../pages/business/edit'
import Product from '../pages/product/index'
import addProduct from '../pages/product/add'
import editProduct from '../pages/product/edit'
import category from '../pages/category/index'
import addCategory from '../pages/category/add'
import editCategory from '../pages/category/edit'
import order from '../pages/order/index'
import Admin from '../pages/admin/index'
import addAdmin from '../pages/admin/add'
import editAdmin from '../pages/admin/edit'
import Rule from '../pages/rule/index'
import addRule from '../pages/rule/add'
import editRule from '../pages/rule/edit'
import code from '../pages/exchange_code/index'
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
            path: '/staff',
            name: '管理员列表',
            component: staff,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/add-staff',
            name: '添加管理员',
            component: add_staff,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-staff',
            name: '编辑管理员',
            component: edit_staff,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/auth-menu',
            name: '权限菜单',
            component: auth_menu,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/add-authmenu',
            name: '添加权限菜单',
            component: add_auth_menu,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-auth-menu',
            name: '编辑权限菜单',
            component: edit_auth_menu,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/auth-role',
            name: '角色管理',
            component: auth_role,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/add-auth-role',
            name: '添加角色',
            component: add_auth_role,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-auth-role',
            name: '编辑角色',
            component: edit_auth_role,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/user',
            name: '用户列表',
            component: user,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/edit-user',
            name: '编辑用户',
            component: editUser,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/add-category',
            name: '添加分类',
            component: addCategory,
            meta: {
                keepAlive: true
            }
        }, {
            path: '/edit-category',
            name: '编辑分类',
            component: editCategory,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/product',
            name: '商品列表',
            component: Product,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-product',
            name: '添加商品',
            component: addProduct,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-product',
            name: '编辑商品',
            component: editProduct,
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
            component: addCategory,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-category',
            name: '编辑分类',
            component: editCategory,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/business',
            name: '商家列表',
            component: business,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-business',
            name: '添加商家',
            component: addBusiness,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-business',
            name: '编辑商家',
            component: editBusiness,
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
        }, {
            path: '/rule',
            name: '规则设置',
            component: Rule,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/add-rule',
            name: '添加规则',
            component: addRule,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/edit-rule',
            name: '编辑规则',
            component: editRule,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/code',
            name: '兑换码',
            component: code,
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