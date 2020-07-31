<template>
  <div class="main">
    <userinfo :status="status" :userinfo="userinfo" @close="closeUserInfo"></userinfo>
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员</el-breadcrumb-item>
            <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
          </el-breadcrumb>

          <el-button
            type="primary"
            icon="el-icon-refresh"
            circle
            @click="refresh"
          ></el-button>
        </div>
        <!--搜索-->
        <div class="search">
          <el-input
            placeholder="请输入管理员姓名|手机号|邮箱"
            v-model="username"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"
              >搜索</el-button
            >
          </el-input>
        </div>
        <!-- 修改密码 -->
        <el-dialog
          title="提示"
          :append-to-body="true"
          :visible.sync="layer"
          width="30%"
        >
          <el-form
            :model="form"
            status-icon
            ref="form"
            label-width="100px"
            class="demo-form"
          >
            <el-form-item
              label="密码"
              :rules="[{ required: true, message: '密码不能为空' }]"
              prop="password"
            >
              <el-input
                type="password"
                v-model="form.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :rules="rules" prop="checkPassword">
              <el-input
                type="password"
                v-model="form.checkPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('form')">提交</el-button>
              <el-button @click="reset('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <!--添加-->
        <div class="create">
          <div style="display:flex">
            <el-button type="primary" icon="el-icon-edit" @click="create"
              >添加</el-button
            >
          </div>
          <span>共有数据: {{ total }} 条</span>
        </div>
        <!--数据-->
        <div class="card-body text">
          <el-table :data="data">
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column prop="nickname" label="姓名">
              <template slot-scope="scope">
                <span
                  @click="look(scope.row)"
                  class="success"
                  style="    cursor: pointer;"
                  v-text="scope.row.nickname"
                ></span>
              </template>
            </el-table-column>
            <el-table-column label="头像" width="100">
              <template slot-scope="scope">
                <el-avatar
                  style="width:30px;height:30px"
                  :src="scope.row.avatar"
                ></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="220">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="220">
            </el-table-column>
            <el-table-column prop="role" label="角色" width="180">
              <template slot-scope="scope">
                <span
                  v-for="(val, key) in scope.row.role"
                  :key="key"
                  v-text="val.title"
                  class="brand"
                  style="font-size: 13px;
    margin-left: 5px;"
                ></span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" width="180" label="创建时间">
            </el-table-column>

            <el-table-column prop="status" width="120" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status" class="brand">已启用</span>
                <span v-else class="info">待启用</span>
                <span></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              fixed="right"
              label="操作"
              width="180"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-top"
                  v-if="!scope.row.status"
                  size="mini"
                  @click="change(scope.row.id, 1, scope.$index)"
                  title="启用"
                ></el-button>
                <el-button
                  type="warning"
                  icon="el-icon-bottom"
                  size="mini"
                  @click="change(scope.row.id, 0, scope.$index)"
                  title="停用"
                  v-else
                ></el-button>
                <el-button
                  type="info"
                  title="编辑"
                  @click="edit(scope.row.id)"
                  icon="el-icon-edit"
                  size="mini"
                ></el-button>
                <el-button
                  type="danger"
                  title="修改密码"
                  @click="edit_password(scope.row.uid)"
                  icon="el-icon-key"
                  size="mini"
                ></el-button>
                <!-- <el-button
                  type="danger"
                  title="删除"
                  @click="remove(scope.row.id, scope.$index)"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination
          background
          :page-size="pageSize"
          layout="prev, pager, next"
          @current-change="handle_page"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../untils/js/request'
import store from '../../store'
import userinfo from '../../components/userinfo'

export default {
  name: 'index',
  components: {
    userinfo,
  },
  data() {
    var validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      uid: 0,
      username: '',
      page: 1,
      pageSize: 20,
      total: 0,
      layer: false,
      data: [],
      status: false,
      userinfo: {},
      rules: [{ required: true, validator: validate, trigger: 'blur' }],
      form: { password: '', checkPassword: '' },
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let res = await request(
        `staff?page=${this.page}&nickname=${this.username}`
      )
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.page = res.data.current_page
        this.pageSize = res.data.per_page
        this.total = res.data.total
      }
    },
    async updatePass() {
      let res = await request(
        `staff/${this.uid}`,
        { password: this.form.password },
        'PUT'
      )
      if (res.error_code === 10000) {
        this.$message.success(res.msg)
        this.layer = false
      } else {
        this.$message.error(res.msg)
      }
    },
    create() {
      store.commit('add_tabs', { path: 'add_staff', name: '添加管理员' })
    },
    edit(id) {
      store.commit('add_tabs', {
        path: `edit_staff`,
        name: '编辑管理员',
        params: { id: id },
      })
    },
    handle_page(e) {
      this.page = e
      this._request()
    },
    search() {
      if (!this.username.trim().length) {
        this.$message.error('搜索内容不能为空')
        return false
      }
      this._request()
    },
    refresh() {
      this.page = 1
      this.title = ''
      this._request()
    },
    async _change(id, status, key) {
      let res = await request(`staff/${id}`, { status: status }, 'PUT')
      if (res.error_code === 10000) {
        this.data[key]['status'] = status
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    change(id, status, key) {
      let title = status ? '启用' : '停用'
      this.$confirm(`此操作将${title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this._change(id, status, key)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    remove(id, key) {
      this.$confirm(`此操作将删除该记录,是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          request(`staff/${id}`, '', 'DELETE').then((res) => {
            if (res.error_code === 10000) {
              this.data.splice(key, 1)
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    edit_password(uid) {
      this.layer = true
      this.uid = uid
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.updatePass()
        } else {
          return false
        }
      })
    },
    look(info) {
      this.status = true
      this.userinfo = info
    },
    closeUserInfo(data) {
      this.userinfo = {}
      this.status = data
    },
    reset(form) {
      this.$refs[form].resetFields()
    }
  },
}
</script>

<style scoped></style>
