<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :class="{ aside: isCollapse }">
        <div class="side-menu">
          <el-col>
            <el-menu
              default-active="1"
              :collapse="isCollapse"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-stopwatch"></i>
                  <span>控制台</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="addTab('/', '主页')"
                    >主页</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <!--用户-->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="addTab('/user', '用户列表')"
                    >用户列表</el-menu-item
                  >
                  <el-menu-item
                    index="2-2"
                    @click="addTab('/shopowner', '店长列表')"
                    >店长列表</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <!--商品-->
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="3-1"
                    @click="addTab('/goods', '商品列表')"
                    >商品列表</el-menu-item
                  >
                  <el-menu-item
                    index="3-2"
                    @click="addTab('/category', '分类管理')"
                    >分类管理</el-menu-item
                  >
                  <el-menu-item
                    index="3-3"
                    @click="addTab('/activity', '活动列表')"
                    >活动列表</el-menu-item
                  >
                  <el-menu-item index="3-4" @click="addTab('/hot', '抢购列表')"
                    >抢购列表</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <!--订单管理-->
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="4-1"
                    @click="addTab('/order', '订单列表')"
                    >订单列表</el-menu-item
                  >
                  <el-menu-item
                    index="4-2"
                    @click="addTab('/jdorder', '京东账单')"
                    >京东账单</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <!--活动管理-->
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>活动管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="5-1"
                    @click="addTab('/banner', 'banner列表')"
                    >banner列表</el-menu-item
                  >
                  <el-menu-item
                    index="5-2"
                    @click="addTab('/activity', '活动列表')"
                    >活动列表</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <!-- 管理设置 -->
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>管理设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="6-1"
                    @click="addTab('/store', '门店列表')"
                    >门店列表</el-menu-item
                  >
                  <el-menu-item index="6-2" @click="addTab('/pet', '宠物列表')"
                    >宠物列表</el-menu-item
                  >
                  <el-menu-item
                    index="6-3"
                    @click="addTab('/property', '物业列表')"
                    >物业列表</el-menu-item
                  >
                  <el-menu-item
                    index="6-4"
                    @click="addTab('/coupon', '优惠券列表')"
                    >优惠券列表</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <!-- 设置 -->
              <el-submenu index="7">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>管理员</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="7-1"
                    @click="addTab('/admin', '管理员设置')"
                    >管理员设置</el-menu-item
                  >
                  <el-menu-item
                    index="7-2"
                    @click="addTab('/power', '管理员设置')"
                    >管理员设置</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
      </el-aside>
      <el-container
        class="header-main"
        :class="{ 'header-main-left': isCollapse }"
      >
        <!-- 页面标签 -->
        <el-header :class="{ 'header-main-left': isCollapse }">
          <div class="header">
            <!-- 头部区域 -->
            <ul class="nav">
              <li class="nav-item">
                <span title="侧边伸缩" @click="isCollapse = !isCollapse">
                  <i
                    :class="{
                      'el-icon-s-fold': !isCollapse,
                      'el-icon-s-unfold': isCollapse
                    }"
                  ></i>
                </span>
              </li>
              <li class="nav-item">
                <span title="刷新" @click="refresh">
                  <i class="el-icon-refresh"></i>
                </span>
              </li>
            </ul>
            <ul class="nav">
              <li class="nav-item">
                <span>
                  <i class="el-icon-bell"></i>
                  <!-- 如果有新消息，则显示小圆点 -->
                  <span class="badge-dot"></span>
                </span>
              </li>
              <li class="nav-item">
                <span>
                  <i class="icon el-icon-rank"></i>
                </span>
              </li>
              <li
                class="nav-item"
                @mouseenter="out = true"
                @mouseleave="out = false"
              >
                <span v-text="username"></span>
                <el-collapse-transition>
                  <dl class="nav-child" v-show="out">
                    <span @click="showData">基本资料</span>
                    <span @click="addTab('/admin', '管理员设置')"
                      >修改密码</span
                    >
                    <span @click="loginOut">退出</span>
                  </dl>
                </el-collapse-transition>
              </li>
            </ul>
          </div>
          <el-tabs
            v-model="active"
            type="card"
            @tab-remove="removeTab"
            @tab-click="onTabClick"
          >
            <el-tab-pane
              v-for="(item, index) in tabs"
              :key="index"
              :path="item.path"
              :title="item.name"
              :label="item.name"
              :name="item.path"
              :lazy="true"
              :closable="index === 0 ? false : false"
            >
            </el-tab-pane>
          </el-tabs>
        </el-header>
        <!-- 页面主体 -->
        <el-main :class="{ 'padding-left': isCollapse }">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from '../store/index'
import { getData } from '../untils/js/request'
import router from '../router/index'
export default {
  name: 'Index',
  data() {
    return {
      isCollapse: false,
      out: false,
      username: 'admin',
      defaultTab: store.state.active,
      tabs: store.state.path
    }
  },
  computed: {
    active: {
      get() {
        return store.state.active
      },
      set(value) {
        this.defaultTab = value
      }
    }
  },
  watch: {
    name() {
      this.username = localStorage.getItem('username')
    }
  },
  mounted() {
    // 页面刷新打开当前路由tab
    if (this.$route.path !== '/') {
      store.commit('add_tabs', {
        path: this.$route.path,
        name: this.$route.name
      })
      this.defaultTab = this.$route.path
    }
  },
  methods: {
    async _getData() {
      let res = await getData('admin/findOne')
      if (res.error_code === 10000) {
        if (!res.data) {
          this.admin = true
        }
      }
    },
    capitalize() {
      return true
    },
    addTab(path, title, id = 0) {
      this.defaultTab = path
      store.commit('add_tabs', { path: path, name: title, params: { id: id } })
    },
    // 打开标签
    onTabClick(tab) {
      this.defaultTab = tab.$attrs.path
      store.commit('add_tabs', {
        path: tab.$attrs.path,
        name: tab.$attrs.title
      })
    },
    // 刷新
    refresh() {
      window.location.reload()
    },
    // 查看资料
    showData() {
      this.$message.error('暂无资料')
    },
    // 退出登陆
    loginOut() {
      this.$confirm('此操作将退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('token')
          router.push({ path: '/login', name: '登录' })
          window.location.reload()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 关闭标签
    removeTab(targetName) {
      let tabs = this.tabs
      router.push({
        path: '/',
        name: '主页'
      })
      this.defaultTab = '/'
      this.tabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<style lang="less">
.home {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  .el-aside {
    width: 150px !important;
    min-height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 99;
    background: #545c64;
    .el-menu {
      border-right: none;
    }
  }
  .aside {
    width: 64px !important;
  }
  .el-menu-item {
    min-width: 150px !important;
  }

  .header-main {
    width: 100%;
    box-sizing: border-box;
    padding-left: 150px;
    header {
      padding: 0px;
      height: 60px;
      position: fixed;
      width: 100%;
      box-sizing: border-box;
      right: 0px;
      padding-left: 150px;
      top: 0px;
      z-index: 88;
      .header {
        background: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f6f6f6;
        z-index: 88;
        padding: 0px 35px;
        .nav {
          display: flex;
          justify-content: space-between;
          padding-left: 0px;
          &:last-child {
            padding-right: 6%;
          }
          .nav-item {
            color: #333;
            cursor: pointer;
            padding: 0px 10px;
            font-style: inherit;
            &::before {
              font-size: 18px;
            }
            .nav-child {
              position: absolute;
              right: 70px;
              top: 80px;
              min-width: 120px;
              line-height: 36px;
              padding: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
              border: 1px solid #f4f4f4;
              border-radius: 3px;
              background-color: #fff;
              z-index: 100;
              border-radius: 2px;
              white-space: nowrap;
              box-sizing: border-box;
              span {
                width: 100%;
                float: left;
                text-align: center;
                line-height: 45px;
                line-height: 45px;
                border-bottom: 1px solid #f4f4f4;
                font-size: 14px;
                cursor: pointer;
                color: #333;
                position: relative;
                &:last-child {
                  border-bottom: none;
                }
                &::before {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 1px;
                  background-color: #358180;
                  transform-origin: bottom right;
                  transform: scaleX(0);
                  transition: transform 0.5s ease;
                }
                &:hover::before {
                  transform-origin: bottom left;
                  transform: scaleX(1);
                }
              }
              &:before {
                width: 150px;
                height: 70px;
                content: '';
                position: fixed;
                top: 35px;
                right: 5%;
              }
            }
          }
        }
      }
      .el-tabs__header {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      }
      .el-tabs {
        position: initial;
        padding-left: 0px !important;
        .el-tabs__item {
          padding: 0 20px;
          height: 40px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          line-height: 40px;
          display: inline-block;
          list-style: none;
          font-size: 14px;
          font-weight: 500;
          color: #303133;
          position: relative;
          border-left: 1px solid #f2f2f2;
          color: #999;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            top: 0px;
            left: 50%;
            width: 100%;
            height: 2px;
            opacity: 0;
            background-color: teal;
            transform-origin: center;
            transform: translate(-50%, 0) scaleX(0);
            transition: all 0.3s ease-in-out;
          }
          &:hover {
            &::before {
              transform: translate(-50%, 0) scaleX(1);
              opacity: 1;
            }
          }
        }
        .el-tabs__nav {
          border: none;
        }
        .is-active {
          background: #f2f2f2;
          min-width: 0;
          line-height: 40px;
          max-width: 150px;
          text-overflow: ellipsis;
          overflow: hidden;
          vertical-align: top;
          position: relative;
          border-bottom: none;
          height: 39px;
          color: teal;
          &::before {
            transform: translate(-50%, 0) scaleX(1);
            opacity: 1;
          }
        }
      }
    }
    .el-main {
      margin-top: 60px;
      position: fixed;
      left: 150px;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 85;
      width: auto;
      overflow: hidden;
      overflow-y: auto;
      box-sizing: border-box;
      .router {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  .header-main-left {
    padding-left: 64px !important;
  }
  .padding-left {
    left: 64px !important;
  }
}
</style>
