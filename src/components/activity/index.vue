<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--搜索-->
        <div class="search" style="display:flex;">
          <el-input
            placeholder="请输入活动名称"
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

        <el-dialog
          :title="cateTitle"
          :visible.sync="layer.add"
          :append-to-body="isBody"
        >
          <el-button type="primary" icon="el-icon-edit" @click="createCategory"
            >添加到该活动</el-button
          >
          <div class="search" style="display:flex">
            <el-input
              placeholder="请输入商品标题"
              v-model="goodsTitle"
              class="input-with-select"
            ></el-input>
            <el-button slot="append" icon="el-icon-search" @click="searchTitle"
              >搜索</el-button
            >
          </div>
          <el-table :data="lists" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              property="title"
              label="商品标题"
            ></el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              @current-change="handleChange"
              background
              page-size="20"
              layout="prev, pager, next"
              :total="layer.total"
            >
            </el-pagination>
          </div>
        </el-dialog>

        <!-- 查看 -->
        <el-dialog
          width="70%"
          :title="cateTitle"
          :visible.sync="layer.look"
          :append-to-body="isBody"
        >
          <el-button type="primary" icon="el-icon-edit" @click="removeCategory"
            >移除</el-button
          >
          <div class="search" style="display:flex">
            <el-input
              placeholder="请输入商品标题"
              v-model="look.title"
              class="input-with-select"
            ></el-input>
            <el-button slot="append" icon="el-icon-search" @click="searchTitle"
              >搜索</el-button
            >
          </div>
          <el-table :data="look.data" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              property="title"
              label="商品标题"
            ></el-table-column>
            <el-table-column v-if="category" prop="sort" label="排序">
              <template slot-scope="scope">
                <el-input
                  title="商品排序越大越靠前"
                  placeholder="商品排序越大越靠前"
                  v-model="scope.row.sort"
                  @blur="changeActivitySort(scope.row.tid, scope.row.sort, 1)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="category" label="开启新人" width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.new"
                  @change="changeSwith(scope.row.tid, scope.row.new)"
                  active-color="#13ce66"
                  inactive-color="#cccccc"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column v-if="category" label="参加人数">
              <template slot-scope="scope">
                <el-input
                  title="请输入最少人数"
                  placeholder="请输入最少人数"
                  v-model="scope.row.number"
                  @blur="changeActivitySort(scope.row.tid, scope.row.number, 2)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="category" label="价格">
              <template slot-scope="scope">
                <el-input
                  title="请输入商品价格"
                  placeholder="请输入商品价格"
                  v-model="scope.row.price"
                  @blur="changeActivitySort(scope.row.tid, scope.row.price, 3)"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              @current-change="handleChange"
              background
              :page-size="20"
              layout="prev, pager, next"
              :total="look.total"
            >
            </el-pagination>
          </div>
        </el-dialog>

        <!--数据-->
        <div class="card-body text">
          <el-table :data="data" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column prop="title" label="标题">
              <template slot-scope="scope">
                <span v-text="scope.row.title"></span>
                <em
                  v-if="scope.row.category"
                  class="success"
                  v-text="scope.row.category === 1 ? '砍价' : '团购'"
                ></em>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="添加时间">
            </el-table-column>
            <el-table-column prop="sort" width="180" label="商品排序">
              <template slot-scope="scope">
                <el-input
                  title="商品排序越大越靠前"
                  placeholder="商品排序越大越靠前"
                  v-model="scope.row.sort"
                  @blur="changeSort(scope.row.id, scope.row.sort)"
                ></el-input>
              </template>
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
                  size="mini"
                  type="danger"
                  icon="el-icon-view"
                  @click="_look(scope.row.id, scope.row.category)"
                >
                </el-button>
                <el-button
                  size="mini"
                  type="info"
                  icon="el-icon-plus"
                  @click="add(scope.row.id)"
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
      lists: [],
      cate: 1,
      layer: { add: false, page: 0, total: 0, look: false },
      look: { data: [], page: 0, total: 0, title: '' },
      isBody: true,
      checkAll: false,
      isIndeterminate: true,
      goodsTitle: '',
      cateTitle: '添加活动',
      category: 0,
      types: 0,
      idAll: [],
      title: '',
      page: 1,
      total: 0
    }
  },
  created() {
    this._getData()
    this._getLists()
  },
  methods: {
    async _getData() {
      let res = await getData(
        `/category/index?page=${this.page}&title=${this.title}&cate=0`,
        ''
      )
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = res.data.current_page
      }
    },
    async _getLists() {
      let res = await getData(
        `/goods/index?page=${this.layer.page}&title=${this.goodsTitle}`,
        ''
      )
      if (res.error_code === 10000) {
        this.lists = res.data.data
        this.layer.page = res.data.current_page
        this.layer.total = res.data.total
      }
    },
    async _getLook() {
      let res = await getData(
        `/activity?page=${this.look.page}&pid=${this.id}&title=${this.look.title}`,
        ''
      )
      if (res.error_code === 10000) {
        this.look.data = res.data.data
        this.look.page = res.data.current_page
        this.look.total = res.data.total
      }
    },
    create() {
      store.commit('add_tabs', { path: 'add-category', name: '添加活动' })
    },
    async _change(id, key, status) {
      let res = await getData(
        `/category/update/id/${id}`,
        { status: status },
        'POST'
      )
      if (res.error_code === 10000) {
        this.$message('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    async _createCategory() {
      let res = await getData(
        `activity/create`,
        { id: this.id, all: this.idAll },
        'POST'
      )
      if (res.error_code === 10000) {
        this.$message.success('添加成功')
      }
    },
    async _updateCategory() {
      let res = await getData(
        `activity/update/id/${this.id}`,
        { all: this.idAll },
        'POST'
      )
      if (res.error_code === 10000) {
        this.$message.success('修改成功')
      }
    },
    async _changeSort(id, sort) {
      let res = await getData(
        `/activity/updates/id/${id}`,
        { sort: sort },
        'POST'
      )
      if (res.error_code === 10000) {
        this.$message.success('修改成功')
      }
    },
    async _changeActivity(id, data) {
      let res = await getData(`/activity/updateData/id/${id}`, data, 'POST')
      if (res.error_code === 10000) {
        this.$message.success('修改成功')
      }
    },
    changeSort(id, val) {
      this._changeSort(id, val)
    },
    changeActivitySort(id, val, status) {
      if (status === 1) {
        this._changeActivity(id, { sort: val })
      } else if (status === 2) {
        this._changeActivity(id, { number: val })
      } else {
        this._changeActivity(id, { price: val })
      }
    },
    changeSwith(id, val) {
      this._changeActivity(id, { new: val ? 1 : 0 })
    },
    add(id) {
      this.cateTitle = '添加活动'
      this.id = id
      this.layer.add = true
    },
    _look(id, status) {
      this.id = id
      this.layer.look = true
      this.cateTitle = '编辑活动'
      this.category = status
      this._getLook()
    },
    handleSelectionChange(e) {
      this.idAll = []
      e.map(item => {
        this.idAll.push(item.id)
      })
    },
    searchTitle() {
      if (this.goodsTitle) {
        this._getLists()
      } else {
        this.$message.error('商品标题不能为空')
      }
    },
    createCategory() {
      if (!this.idAll.length) {
        this.$message.error('请选择商品')
      } else {
        this._createCategory()
      }
    },
    removeCategory() {
      if (!this.idAll.length) {
        this.$message.error('请选择商品')
      } else {
        this._updateCategory()
      }
    },
    async _detele(id, key) {
      let res = await getData(`/category/delete/id/${id}`)
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
      store.commit('setid', id)
      store.commit('add_tabs', { path: 'edit-category', name: '编辑分类' })
    },
    handleCurrentChange(e) {
      this.page = e
      this._getData()
    },
    handleChange(e) {
      this.layer.page = e
      this._getLists()
    },
    search() {
      if (this.title || this.cate) {
        this._getData()
      } else {
        this.$message('活动标题不能为空')
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
