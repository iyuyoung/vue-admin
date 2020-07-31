<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>banner</el-breadcrumb-item>
            <el-breadcrumb-item>banner列表</el-breadcrumb-item>
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
          <el-select
            style="margin-right:5px;"
            v-model="category"
            placeholder="分类"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            placeholder="请输入banner名称"
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
            <el-table-column fixed="left" prop="id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="250">
            </el-table-column>
            <el-table-column prop="image" width="120" label="缩略图">
              <template slot-scope="score">
                <el-avatar :src="score.row.image"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="describe" width="180" label="描述">
            </el-table-column>
            <el-table-column prop="sort" width="120" label="排序">
              <template slot-scope="scope">
                <el-input
                  title="排序越大越靠前"
                  placeholder="排序越大越靠前"
                  v-model="scope.row.sort"
                  @blur="changeSort(scope.row.id, scope.row.sort)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="url_type" width="120" label="链接类型">
              <template slot-scope="scope">
                <span v-if="scope.row.url_type === 1" class="brand">网页</span>
                <span v-else-if="scope.row.url_type === 2" class="success"
                  >小程序</span
                >
                <span v-else class="info">其它</span>
              </template>
            </el-table-column>
            <el-table-column prop="url" width="250" label="链接">
            </el-table-column>
            <el-table-column fixed="right" width="180" label="操作">
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
      category: 0,
      page: 1,
      paegsize: 20,
      options: [
        { value: 0, label: '全部' },
        { value: 1, label: '网页链接' },
        { value: 2, label: '小程序' },
      ],
      total: 0,
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let res = await request(
        `/banner?page=${this.page}&title=${this.title}&category=${
          this.category
        }`
      )
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = res.data.current_page
        this.paegsize = res.data.per_page
      }
    },
    create() {
      store.commit('add_tabs', { path: 'add-banner', name: '添加banner' })
    },
    async _change(id, form, key) {
      let res = await request(`/banner/${id}`, form, 'PUT')
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
      let res = await request(`/banner/${id}`, '', 'DELETE')
      if (res.error_code === 10000) {
        this.$message('删除成功')
        this.data.splice(key, 1)
      }
    },
    change(id, key, status) {
      this.$confirm('此操作将更改banner状态, 是否继续?', '提示', {
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
      this.$confirm('此操作将删除banner, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this._detele(id, key)
      })
    },
    _edit(id) {
      store.commit('set_id', id)
      store.commit('add_tabs', { path: 'edit-banner', name: '编辑banner' })
    },
    handleCurrentChange(e) {
      this.page = e
      this._request()
    },
    search() {
      if (this.title || this.category) {
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
