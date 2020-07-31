<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
          <el-select
            v-model="category"
            placeholder="请选择"
            style="margin-right:5px;"
          >
            <el-option
              v-for="(val, key) in options"
              :key="key"
              :label="val.label"
              :value="val.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="category"
            placeholder="请选择"
            style="margin-right:5px;"
          >
            <el-option
              v-for="(val, key) in options"
              :key="key"
              :label="val.label"
              :value="val.value"
            >
            </el-option>
          </el-select>
          <el-input
            placeholder="请输入商品名称"
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
            <el-table-column prop="id" width="100" fixed="left" label="ID"></el-table-column>
            <el-table-column prop="brand_title" width="150" label="品牌">
            </el-table-column>
            <el-table-column prop="category_title" width="150" label="分类">
            </el-table-column>
            <el-table-column prop="image" width="120" label="缩略图">
              <template slot-scope="scope">
                <el-image
                  style="width: 40px; height: 40px"
                  :src="scope.row.image"
                  :preview-src-list=[scope.row.image]
                  :fit="fit"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"  width="250"> </el-table-column>
            <el-table-column prop="price_fee" label="售价"  width="120"> </el-table-column>
            <el-table-column prop="market_price_fee" label="市场价"  width="120"> </el-table-column>
            <el-table-column prop="staff" label="修改人"  width="120"> </el-table-column>
            <el-table-column prop="create_time" width="180" label="创建时间">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
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
import { request } from '../../../untils/js/request'
import store from '../../../store'
export default {
  name: 'index',
  data() {
    return {
      data: [],
      page: 1,
      options: [{ value: 0, label: '顶级分类' }],
      pagsize: 20,
      category: '',
      title: '',
      total: 0,
    }
  },
  created() {
    this._request()
    this._getCategory()
  },
  methods: {
    async _request() {
      let res = await request(
        `/product?page=${this.page}&title=${this.title}&category=${this.category}&brand=${this.category}`
      )
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = parseInt(res.data.current_page)
      } else {
        this.data = []
        this.total = 0
        this.page = 0
      }
    },
    async _getCategory() {
      this.options = [{ value: 0, label: '顶级分类' }]
      let res = await request(`/product_brand?pid=1`, '')
      if (res.error_code === 10000) {
        res.data.map((item) => {
          this.options.push({
            value: item.value,
            label: item.label,
          })
        })
      }
    },
    create() {
      store.commit('add_tabs', { path: 'add-product', name: '添加商品' })
      this.defaultTab = this.$route.path
    },
    async _change(id, key, status) {
      let res = await request(`/product_brand/${id}`, { status: status }, 'PUT')
      if (res.error_code === 10000) {
        this.data[key]['status'] = status
        this.$message('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    async _detele(id, key) {
      let res = await request(`/product_brand/${id}`, '', 'DELETE')
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
        this._change(id, key, status)
      })
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
      store.commit('set_id', id)
      store.commit('add_tabs', { path: 'edit-product', name: '编辑商品' })
    },
    handleCurrentChange(e) {
      this.page = e
      this._request()
    },
    search() {
      if (this.title || this.category) {
        this._request()
      } else {
        this.$message('商品标题不能为空')
      }
    },
    refresh() {
      Object.assign(this.$data, this.$options.data())
      this._request()
    },
  },
}
</script>

<style scoped></style>
