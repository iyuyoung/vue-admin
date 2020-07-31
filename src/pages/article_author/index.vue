<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>作者</el-breadcrumb-item>
            <el-breadcrumb-item>作者列表</el-breadcrumb-item>
          </el-breadcrumb>

          <el-button
            type="primary"
            icon="el-icon-refresh"
            circle
            @click="refresh"
          ></el-button>
        </div>
        <!--搜索-->
        <div class="search" style="display:flex">
          <el-input
            placeholder="请输入作者名称"
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
            <el-table-column prop="id" width="100" label="ID"></el-table-column>
            <el-table-column prop="avatar" width="130" label="头像">
              <template slot-scope="scope">
                <el-avatar
                  style="width:35px;height:35px"
                  :src="scope.row.avatar"
                ></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="username" width="150"  label="作者"> </el-table-column>
            <el-table-column prop="describe" label="作者签名">
            </el-table-column>
            <el-table-column prop="create_time" width="180" label="创建时间">
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-top"
                  v-if="!scope.row.status"
                  title="启用"
                  @click="change(scope.row.id, scope.$index, 1)"
                >
                </el-button>
                <el-button
                  size="mini"
                  type="info"
                  title="停用"
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
          background
          :page-size="pagsize"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
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
      page: 1,
      pagsize: 20,
      title: '',
      total: 0,
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let res = await request(
        `/author?page=${this.page}&username=${this.title}`
      )
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = parseInt(res.data.current_page)
      }
    },
    create() {
      store.commit('add_tabs', { path: 'add_article_author', name: '添加作者' })
      this.defaultTab = this.$route.path
    },
    async _change(id, key, status) {
      let res = await request(`/author/${id}`, { status: status }, 'PUT')
      if (res.error_code === 10000) {
        this.data[key]['status'] = status
        this.$message('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    async _detele(id, key) {
      let res = await request(`/author/${id}`, '', 'DELETE')
      if (res.error_code === 10000) {
        this.$message('删除成功')
        this.data.splice(key, 1)
      }
    },
    change(id, key, status) {
      this.$confirm('此操作将更改作者状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this._change(id, key, status)
      })
    },
    del(id, key) {
      this.$confirm('此操作将删除作者, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this._detele(id, key)
      })
    },
    _edit(id) {
      store.commit('set_id', id)
      store.commit('add_tabs', { path: 'edit_article_author', name: '编辑作者' })
    },
    handleCurrentChange(e) {
      this.page = e
      this._request()
    },
    search() {
      if (this.title) {
        this._request()
      } else {
        this.$message.error('作者不能为空')
      }
    },
    refresh() {
      this.page = 1
      this._request()
    }
  },
}
</script>

<style scoped></style>
