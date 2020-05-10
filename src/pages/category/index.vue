<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
          </el-breadcrumb>

          <el-button
            type="primary"
            icon="el-icon-refresh"
            circle
            @click="refresh"
          ></el-button>
        </div>
        <!--搜索-->
        <div class="search" style="display:flex;">
          <el-input
            placeholder="请输入分类名称"
            v-model="title"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"
              >搜索</el-button
            >
          </el-input>
        </div>
        <!--添加-->
        <div class="create">
          <el-button type="primary" icon="el-icon-edit" @click="create"
            >添加</el-button
          >
          <span>共有数据: {{ total }} 条</span>
        </div>

        <!--数据-->
        <div class="card-body text">
          <el-table :data="data" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column prop="pid_title" label="上级分类" width="120">
            </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column prop="image" label="缩略图">
              <template slot-scope="score">
                <el-avatar :src="score.row.image"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="描述"> </el-table-column>
            <el-table-column prop="sort" width="200" label="排序">
              <template slot-scope="scope">
                <el-input
                  title="排序越大越靠前"
                  placeholder="排序越大越靠前"
                  v-model="scope.row.sort"
                  @blur="changeSort(scope.row.id, scope.row.sort)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-top"
                  v-if="!scope.row.status"
                  title="上架"
                  @click="change(scope.row.id, scope.$index, 1)"
                >
                </el-button>
                <el-button
                  size="mini"
                  type="info"
                  title="下架"
                  icon="el-icon-bottom"
                  v-else
                  @click="change(scope.row.id, scope.$index, 0)"
                >
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-edit"
                  @click="_edit(scope.row.id)"
                >
                </el-button>
                <el-button
                  @click="del(scope.row.id, scope.$index)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-size="paegsize"
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
      title: '',
      page: 1,
      paegsize: 20,
      total: 0,
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let res = await request(`/category?page=${this.page}&title=${this.title}`)
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = res.data.current_page
        this.paegsize = res.data.per_page
      }
    },
    create() {
      store.commit('add_tabs', { path: 'add-category', name: '添加分类' })
    },
    async _change(id, form, key) {
      let res = await request(`/category/${id}`, form, 'PUT')
      if (res.error_code === 10000) {
        let value = Object.keys(form)[0]
        if (value === 'status') {
          this.data[key][value] = Object.values(form)[0]
        }
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    async _detele(id, key) {
      let res = await request(`/category/${id}`, '', 'DELETE')
      if (res.error_code === 10000) {
        this.$message('删除成功')
        this.data.splice(key, 1)
      }
    },
    change(id, key, status) {
      this.$confirm('此操作将更改商品状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this._change(id, { status: status }, key)
      })
    },
    changeSort(id, sort) {
      this._change(id, { sort: sort })
    },
    del(id, key) {
      this.$confirm('此操作将删除商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this._detele(id, key)
      })
    },
    _edit(id) {
      store.commit('setid', id)
      store.commit('add_tabs', { path: 'edit-category', name: '编辑分类' })
    },
    handleCurrentChange(e) {
      this.page = e
      this._request()
    },
    search() {
      if (this.title) {
        this._request()
      } else {
        this.$message.error('标题不能为空')
      }
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
