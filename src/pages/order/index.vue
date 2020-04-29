<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--搜索-->
        <div class="search">
          <el-input
            placeholder="请输入付款人"
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
            <el-table-column prop="id" label="ID" width="90"> </el-table-column>
            <el-table-column prop="username" label="付款人"> </el-table-column>
            <el-table-column prop="price" label="商品价格"></el-table-column>
            <el-table-column prop="total" label="实际付款金额">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.status"
                  style="color:red"
                  v-text="scope.row.total"
                ></span>
                <span v-else style="color:#ccc">未付款</span>
              </template>
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
                  已付款
                </el-button>
                <el-button
                  style="color:#ccc;"
                  v-if="scope.row.status === 0"
                  type="text"
                  size="small"
                >
                  未付款
                </el-button>
                <el-button
                  style="color:#fc5350;"
                  v-if="scope.row.status === 2"
                  type="text"
                  size="small"
                >
                  已发货
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  style="color:#409EFF;"
                  type="text"
                  v-if="false"
                  size="small"
                  @click="openEdit(scope.row.id)"
                >
                  发货
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
import { getData } from '../../untils/js/request'
import store from '../../store'

export default {
  name: 'index',
  data() {
    return {
      data: [],
      form: {},
      username: '',
      total: 0,
      page: 1,
    }
  },
  created() {
    this._getData()
  },
  methods: {
    async _getData() {
      let res = await getData(`/order?username=${this.username}`, '')
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = res.data.current_page
      }
    },
    async _del(id, key) {
      let data = await getData(`order/delete?id=${id}`, {}, 'delete')
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
      store.commit('add_tabs', { path: 'edit-admin', name: '编辑订单' })
    },
    next(e) {
      this.page = e
      this._getData()
    },
    search() {
      if (this.username) {
        this._getData()
      } else {
        this.$message.error('用户名称不能为空')
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
