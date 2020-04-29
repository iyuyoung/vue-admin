<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>设置</el-breadcrumb-item>
            <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--添加-->
        <div class="create">
          <el-button type="primary" v-if="false"
                     icon="el-icon-edit"
                     @click="create">添加</el-button>
          <span>共有数据: {{total}} 条</span>
        </div>
        <!--数据-->
        <div class="card-body text">
          <el-table :data="data"
                    style="width: 100%">
            <el-table-column prop="id"
                             label="用户ID">
            </el-table-column>
            <el-table-column prop="username"
                             label="账号">
            </el-table-column>
            <el-table-column label="修改密码">
              <template slot-scope="scope">
                <span style="font-size:12px;color:#f80003;cursor:pointer"
                      title="修改密码"
                      @click="change(scope.row.id)">*****</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time"
                             label="启用时间">
            </el-table-column>
            <el-table-column label="操作" v-if="false"
                             width="120">
              <template slot-scope="scope">
                <el-button style="color:#409EFF;"
                           type="text"
                           size="small"
                           @click="openEdit(scope.row.id)">
                  编辑
                </el-button>
                <el-button style="color:#F56C6C;" 
                           @click="del(scope.row.id,scope.$index)"
                           type="text"
                           size="small">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination @current-page="next"
                       background
                       layout="prev, pager, next"
                       :total="page">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router/index'
import { getData } from "../../untils/js/request";
import store from '../../store';

export default {
  name: "index",
  data () {
    return {
      password: { 'new': '', 'old': '' },
      data: [],
      total: 0
    }
  },
  created () {
    this._getData()
  },
  methods: {
    async _getData () {
      let data = await getData(`/admin/index`, '')
      if (data.error_code === 10000) {
        this.data = data.data.data
      }
    },
    look (src) {
      this.$alert(`<img src="${src}">`, '', {
        dangerouslyUseHTMLString: true
      });
    },
    async _del (id, key) {
      let data = await getData(`admin/delete?id=${id}`, {}, 'delete')
      if (data.error_code === 10000) {
        this.data.splice(key, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }
    },
    //  删除
    del (id, key) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._del(id, key)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 修改
    openEdit (id) {
      store.commit('setid', id)
      store.commit('add_tabs', { path: 'edit-admin', name: '编辑管理员' })
    },
    async _password (id, text) {
      let data = await getData(`/admin/update?id=${id}`, { 'password': text }, 'POST')
      if (data.error_code === 10000) {
        localStorage.removeItem('token')
        router.push({ path: '/login', name: '登录' })
        window.location.reload()
      }
    },
    _change (id, text) {
      this.$confirm('此操作将修改密码，并退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
        this._password(id, text)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    change (id) {
      this.$alert(``, `修改密码`, {
        dangerouslyUseHTMLString: true,
        showInput: true,
        inputPlaceholder: '请输入新密码',
        confirmButtonText: '确认修改',
      }).then((e) => {
        if (e.action === "confirm") {
          this._change(id, e.value)
        }
      });
      // this._password(id)
    },
    create () {
      store.commit('add_tabs', { path: 'add-admin', name: '添加管理员' })
    },
    next (e) {
      this.page = e
      this._getData()
    }
  }

}
</script>

<style scoped>
</style>