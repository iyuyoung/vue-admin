<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
            placeholder="请输入用户名|手机号|邮箱"
            v-model="username"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"
              >搜索</el-button
            >
          </el-input>
        </div>

        <!--添加-->
        <div class="create">
          <span>共有数据: {{ total }} 条</span>
        </div>
        <!--数据-->
        <div class="card-body text">
          <el-table :data="data" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column prop="pid_name" label="推荐人" width="150">
            </el-table-column>
            <el-table-column label="用户头像" width="100">
              <template slot-scope="scope">
                <el-avatar
                  style="width:30px;height:30px"
                  :src="scope.row.avatar"
                ></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="名称"> </el-table-column>
            <el-table-column prop="phone" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="chicken_number" width="100" label="鸡的数量">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.chicken_number"
                  @click="show('chicken', scope.row.id)"
                  class="brand"
                  style="cursor: pointer;"
                  v-text="scope.row.chicken_number"
                ></span>
                <span class="info" v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column prop="egg_number" width="100" label="蛋的数量">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.egg_number"
                  @click="show('egg', scope.row.id)"
                  class="danger"
                  style="cursor: pointer;"
                  v-text="scope.row.egg_number"
                ></span>
                <span class="info" v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column prop="sign_number" width="100" label="签到天数">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.sign_number"
                  @click="show('forage', scope.row.id)"
                  class="success"
                  style="cursor: pointer;"
                  v-text="scope.row.sign_number"
                ></span>
                <span class="info" v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" width="120" label="注册时间">
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

export default {
  name: 'index',
  data() {
    return {
      username: '',
      page: 1,
      pageSize: 20,
      total: 0,
      data: [],
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let res = await request(
        `staff?page=${this.page}&username=${this.username}`
      )
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.page = res.data.total
        this.pageSize = res.data.total
        this.total = res.data.total
      }
    },
    handle_page(e) {
      this.page = e
      this._request()
    },
    search() {
      if (!this.username.trim().length) {
        this.$message.error('用户名不能为空')
        return false
      }
      this._request()
    },
    refresh() {
      this.page = 1
      this.title = ''
      this._request()
    },
  },
}
</script>

<style scoped></style>
