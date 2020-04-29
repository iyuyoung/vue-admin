<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--搜索-->
        <div class="search" style="display:flex;">
          <el-input
            placeholder="请输入商家名称"
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
            <el-table-column prop="title" label="商家名称">
            </el-table-column>
            <el-table-column prop="logo" label="商家名称">
              <template slot-scope="scope">
                <el-avatar :src="scope.row.logo"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="describe" label="商家描述">
            </el-table-column>
            <el-table-column prop="create_time" label="添加时间">
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
          :page-size="20"
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
      title: '',
      page: 1,
      total: 0
    }
  },
  created() {
    this._getData()
  },
  methods: {
    async _getData() {
      let res = await getData(`/business?page=${this.page}&title=${this.title}`)
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = res.data.current_page
      }
    },
    create() {
      store.commit('add_tabs', { path: 'add-business', name: '添加商家' })
    },
    async _change(id, key, status) {
      let res = await getData(
        `/business/${id}`,
        { status: status },
        'PUT'
      )
      if (res.error_code === 10000) {
        this.data[key]['status']=status
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    async _detele(id, key) {
      let res = await getData(`/business/${id}`,'','DELETE')
      if (res.error_code === 10000) {
        this.$message('删除成功')
        this.data.splice(key, 1)
      }
    },
    change(id, key, status) {
      this.$confirm('此操作将更改商品状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._change(id, key, status)
      })
    },

    del(id, key) {
      this.$confirm('此操作将删除商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._detele(id, key)
      })
    },
    _edit(id) {
      store.commit('set_id', id)
      store.commit('add_tabs', { path: 'edit-business', name: '编辑商家' })
    },
    handleCurrentChange(e) {
      this.page = e
      this._getData()
    },
    search() {
      if (this.title) {
        this._getData()
      } else {
        this.$message('商家标题不能为空')
      }
    }
  }
}
</script>

<style scoped>
.success {
  font-size: 14px;
  color: #fc5350;
  font-style: initial;
  margin-left: 5px;
}
</style>
