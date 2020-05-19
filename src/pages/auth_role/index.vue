<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
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
            placeholder="请输入角色"
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
          <el-table :data="data" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column prop="name" label="角色名称"> </el-table-column>
            <el-table-column prop="desc" label="角色描述">
            </el-table-column>
            <el-table-column prop="status" width="120" label="状态">
            </el-table-column>
            <el-table-column prop="create_time" width="180" label="创建时间">
            </el-table-column>
            <el-table-column prop="status" label="操作" width="180">
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

export default {
  name: 'index',
  data() {
    return {
      uid: 0,
      title: '',
      page: 1,
      pageSize: 20,
      total: 0,
      layer: false,
      data: [],
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let res = await request(
        `role?page=${this.page}&tile=${this.title}`
      )
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.page = res.data.current_page
        this.pageSize = res.data.per_page
        this.total = res.data.total
      }
    },
    create() {
      store.commit('add_tabs', { path: 'add_role', name: '添加角色' })
    },
    edit(id) {
      store.commit('add_tabs', {
        path: `edit_role`,
        name: '编辑角色',
        params: { id: id },
      })
    },
    handle_page(e) {
      this.page = e
      this._request()
    },
    search() {
      if (!this.title.trim().length) {
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
      let res = await request(`role/${id}`, { status: status }, 'PUT')
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
          request(`role/${id}`, '', 'DELETE').then((res) => {
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
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.updatePass()
        } else {
          return false
        }
      })
    },
    reset(form) {
      this.$refs[form].resetFields()
    }
  },
}
</script>

<style scoped></style>
