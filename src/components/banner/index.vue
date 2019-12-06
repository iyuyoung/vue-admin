<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>设置</el-breadcrumb-item>
            <el-breadcrumb-item>广告设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--添加-->
        <div class="create">
          <el-button type="primary"
                     icon="el-icon-edit"
                     @click="create">添加</el-button>
          <span>共有数据: {{total}} 条</span>
        </div>
        <!--数据-->
        <div class="card-body text">
          <el-table :data="data"
                    style="width: 100%">
            <el-table-column prop="id" width="50"
                             label="ID">
            </el-table-column>
            <el-table-column prop="title"
                             label="标题">
            </el-table-column>
            <el-table-column prop="url"
                             label="广告地址">
            </el-table-column>
            <el-table-column prop="sort" width="180" label="排序">
              <template slot-scope="scope">
                <el-input
                  title="排序越大越靠前"
                  placeholder="排序越大越靠前"
                  v-model="scope.row.sort"
                  @blur="changeSort(scope.row.id, scope.row.sort)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.category===0">宠物名片广告</span>
                <span v-if="scope.row.category===1">弹出式海报</span>
                <span v-if="scope.row.category===2">捡便箱广告</span>
                <span v-if="scope.row.category===3">商城banner</span>
                <span v-if="scope.row.category===4">抢购banner</span>
                <span v-if="scope.row.category===5">活动历史</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time"
                             label="添加时间">
            </el-table-column>
            <el-table-column label="操作"
                             width="120">
              <template slot-scope="scope">
                <el-button style="color:#409EFF;"
                           type="text"
                           size="small"
                           @click="openEdit(scope.row.id)">
                  编辑
                </el-button>
                <el-button style="color:#F56C6C;"
                           @click="del(scope.row.id,scope.$index)"
                           type="text"
                           size="small">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination @current-change="next"
                       background
                       layout="prev, pager, next"
                       page-size=20
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
      password: { 'new': '', 'old': '' },
      data: [],
      page:1,
      total: 0
    }
  },
  created () {
    this._getData()
  },
  methods: {
    async _getData () {
      let data = await getData(`/banner/index?page=${this.page}`, '')
      if (data.error_code === 10000) {
        this.data = data.data.data
        this.total=data.data.total
      }
    },
    look (src) {
      this.$alert(`<img src="${src}">`, '', {
        dangerouslyUseHTMLString: true
      });
    },
    async _del (id, key) {
      let data = await getData(`banner/delete?id=${id}`, {}, 'delete')
      if (data.error_code === 10000) {
        this.data.splice(key, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }
    },
    async _changeSort(id, sort) {
      let res = await getData(
        `/banner/update/id/${id}`,
        { sort: sort },
        'POST'
      )
      if (res.error_code === 10000) {
        this.$message.success('修改成功')
      }
    },
    changeSort(id, val) {
      this._changeSort(id, val)
    },
    //  删除
    del (id, key) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._del(id, key)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 修改
    openEdit (id) {
      store.commit('setid', id)
      store.commit('add_tabs', { path: 'edit-banner', name: '编辑banner' })
    },
    create () {
      store.commit('add_tabs', { path: 'add-banner', name: '添加banner' })
    },
    next (e) {
      this.page = e
      this._getData()
    }
  }

}
</script>

<style scoped>
</style>