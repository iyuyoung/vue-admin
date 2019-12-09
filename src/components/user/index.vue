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
        </div>
        <!--搜索-->
        <div class="search">
          <el-input placeholder="请输入微信名"
                    v-model="title"
                    class="input-with-select">
            <el-button slot="append"
                       icon="el-icon-search">搜索</el-button>
          </el-input>
        </div>
        <!--添加-->
        <div class="create">
          <span>共有数据: {{total}} 条</span>
        </div>
        <!--数据-->
        <div class="card-body text">
          <el-table :data="data"
                    style="width: 100%">
            <el-table-column prop="id"
                             label="ID"
                             width="80">
            </el-table-column>
            <el-table-column prop="pid"
                             label="推荐人"
                             width="150">
            </el-table-column>
            <el-table-column prop="nickname"
                             label="微信名称"
                             width="150">
            </el-table-column>
            <el-table-column label="用户头像"
                             width="100">
              <template slot-scope="scope">
                <span @click="look(scope.row.avatar)"
                      style="font-size:12px;color:#67C23A;">点击查看</span>
              </template>
            </el-table-column>
            <el-table-column prop="location"
                             label="用户地址"
                             width="150">
            </el-table-column>
            <el-table-column prop="sex"
                             label="性别"
                             width="120">
            </el-table-column>
            <el-table-column prop="create_time"
                             label="注册时间">
            </el-table-column>
            <el-table-column label="设置">
               <template slot-scope="scope">
                    <el-button v-if="scope" type="primary" size="mini" plain>编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination background
                       :page-size="pageSize"
                       layout="prev, pager, next"
                       @current-change="change"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "../../untils/js/request";
import store from '../../store';

export default {
  name: "index",
  data () {
    return {
      title: '',
      page: 1,
      pageSize: 20,
      total: 0,
      data: []
    }
  },
  created () {
    this._getData()
  },
  methods: {
    async _getData () {
      let data = await getData(`/user/index?page=${this.page}`, '')
      if (data.error_code === 10000) {
        this.data = data.data.data.map((item) => {
          item.create_time = item.create_time.substring(0, 10)
          return item
        })
        this.total = data.data.total
      }
    },
    async _delete (id, key) {
      let res = await getData(`/user/delete/id/${id}`)
      if (res.error_code === 10000) {
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.data.split(key, 1)
      } else {
        this.$message({
          type: 'error',
          message: '操作失败!'
        });
      }
    },
    update (id) {
      store.commit('setid', id)
      store.commit('add_tabs', { path: 'edit-user', name: '编辑员工' })
    },
    create () {
      store.commit('add_tabs', { path: 'add-user', name: '添加员工' })
    },
    remove (id, key) {
      let title = '确认删除该信息'
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delete(id, key)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    look (src) {
      this.$alert(`<img src="${src}">`, '', {
        dangerouslyUseHTMLString: true
      });
    },
    change (e) {
      this.page = e
      this._getData()
    }
  }

}
</script>

<style scoped>
</style>