<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>规则设置</el-breadcrumb-item>
            <el-breadcrumb-item>规则列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--添加-->
        <div class="create">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="create"
            >添加</el-button
          >
          <span>共有数据: {{ total }} 条</span>
        </div>
        <!--数据-->
        <div class="card-body text">
          <el-table :data="data" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column prop="title" label="标题" width="150"> </el-table-column>
            <el-table-column label="描述" prop="describe"> </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  style="color:#409EFF;"
                  type="text"
                  size="small"
                  @click="openEdit(scope.row.id)"
                >
                  编辑
                </el-button>
                <el-button
                  style="color:#F56C6C;"
                  @click="del(scope.row.id, scope.$index)"
                  type="text"
                  size="small"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination
          @current-page="next"
          background
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '../../untils/js/request'
import store from '../../store'

export default {
  name: 'index',
  data() {
    return {
      data: [],
      page: 1,
      total: 0,
    }
  },
  created() {
    this._getData()
  },
  methods: {
    async _getData() {
      let data = await getData(`rule`)
      if (data.error_code === 10000) {
        this.data = data.data.data
        this.total = data.data.total
        this.page = data.data.current_page
      }
    },
    async _del(id, key) {
      let data = await getData(`/rule/${id}`, {}, 'delete')
      if (data.error_code === 10000) {
        this.data.splice(key, 1)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }
    },
    //  删除
    del(id, key) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this._del(id, key)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 修改
    openEdit(id) {
      store.commit('set_id', id)
      store.commit('add_tabs', { path: 'edit-rule', name: '编辑规则' })
    },
    create() {
      store.commit('add_tabs', { path: 'add-rule', name: '添加规则' })
    },
    next(e) {
      this.page = e
      this._getData()
    },
  },
}
</script>

<style scoped></style>
