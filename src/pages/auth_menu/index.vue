<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限菜单</el-breadcrumb-item>
            <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
          </el-breadcrumb>

          <el-button
            type="primary"
            icon="el-icon-refresh"
            circle
            @click="refresh"
          ></el-button>
        </div>

        <!--添加-->
        <div class="create">
          <div style="display:flex">
            <el-button type="primary" icon="el-icon-edit" @click="create"
              >添加</el-button
            >
          </div>
        </div>
        <!--数据-->
        <div class="card-body text">
          <el-table
            :data="data"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            style="width: 100%"
          >
            <el-table-column prop="menu_name" label="菜单名称">
            </el-table-column>
            <el-table-column prop="menu_desc" label="菜单描述">
            </el-table-column>
            <el-table-column width="100" prop="status" label="状态">
              <template slot-scope="scope">
                <span class="success" v-if="scope.row.status">已启用</span>
                <span class="info" v-else>未启用</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" width="200" label="创建时间">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="180">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  title="编辑"
                  @click="edit(scope.row.id)"
                  icon="el-icon-edit"
                  size="mini"
                ></el-button>
                <el-button
                  type="danger"
                  title="删除"
                  @click="remove(scope.row.id, scope.$index)"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      id: 0,
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
      let res = await request(`menu`)
      if (res.error_code === 10000) {
        this.data = res.data
      }
    },
    create() {
      store.commit('add_tabs', {
        path: 'add_menu',
        name: '添加权限菜单'
      })
    },
    edit(id) {
      store.commit('add_tabs', {
        path: `edit_menu`,
        name: '编辑权限菜单',
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
      let res = await request(`menu/${id}`, { status: status }, 'PUT')
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
          request(`menu/${id}`, '', 'DELETE').then((res) => {
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
  },
}
</script>

<style scoped></style>
