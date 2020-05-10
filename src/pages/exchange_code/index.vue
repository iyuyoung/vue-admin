<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>兑换码</el-breadcrumb-item>
            <el-breadcrumb-item>兑换码列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--搜索-->
        <div class="search">
          <el-input
            placeholder="请输入兑换码"
            v-model="code"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"
              >搜索</el-button
            >
          </el-input>
        </div>

        <el-dialog
          title="生成兑换码"
          :visible.sync="exchange"
          :append-to-body="true"
        >
          <el-form :model="form">
            <el-form-item
              prop="number"
              label="生成数量"
              :rules="[{ required: true, message: '生成数量不能为空' }]"
            >
              <el-input
                placeholder="请输入要生成的兑换码数量"
                v-model="form.number"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="兑换鸡蛋数量"
              prop="egg"
              :rules="[{ required: true, message: '兑换鸡蛋数量不能为空' }]"
            >
              <el-input
                v-model="form.egg"
                placeholder="请输入兑换鸡蛋的数量"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')"
                >立即创建</el-button
              >
              <el-button @click="exchange = false">取消</el-button>
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
          <el-table :data="data" style="width: 100%">
            <el-table-column prop="id" label="ID" width="90"> </el-table-column>
            <el-table-column prop="username" label="使用人">
              <template slot-scope="scope">
                <span
                  class="success"
                  v-if="scope.row.status"
                  v-text="scope.row.username"
                ></span>
                <span v-else>暂未使用</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="兑换码"></el-table-column>
            <el-table-column prop="number" label="兑换鸡蛋数量">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间">
            </el-table-column>
            <el-table-column label="状态" width="120">
              <template slot-scope="scope">
                <el-button
                  style="color:#409EFF;"
                  v-if="scope.row.status === 1"
                  type="text"
                  size="small"
                >
                  已使用
                </el-button>
                <el-button
                  style="color:#ccc;"
                  v-if="scope.row.status === 0"
                  type="text"
                  size="small"
                >
                  未使用
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination
          @current-change="next"
          background
          :page-size="20"
          layout="prev, pager, next"
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

export default {
  name: 'index',
  data() {
    return {
      data: [],
      exchange: false,
      form: { number: '', egg: '' },
      code: '',
      total: 0,
      page: 1,
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let res = await request(`/code?code=${this.code}`, '')
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = res.data.current_page
      }
    },
    create() {
      this.exchange = true
    },
    async _create() {
      let data = await request('code', this.form, 'POST')
      if (data.error_code === 10000) {
        this.$message.success('添加成功')
        this.exchange = false
        this._request()
      }
    },
    onSubmit() {
      this._create()
    },
    // 修改
    openEdit(id) {
      store.commit('set_id', id)
      store.commit('add_tabs', { path: 'edit-admin', name: '编辑订单' })
    },
    next(e) {
      this.page = e
      this._request()
    },
    search() {
      if (this.code) {
        this._request()
      } else {
        this.$message.error('兑换码不能为空')
      }
    },
  },
}
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
</style>
