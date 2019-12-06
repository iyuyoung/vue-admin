<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>砍价列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--搜索-->
        <div class="search"
             style="display:flex;">
          <el-input placeholder="请输入商品标题"
                    v-model="title"
                    class="input-with-select">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="search">搜索</el-button>
          </el-input>
        </div>
        <!--添加-->
        <div class="create">
          <div>
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="create">添加</el-button>
            <el-button type="danger"
                       icon="el-icon-remove"
                       @click="remove">移除</el-button>
          </div>
          <span>共有数据: {{total}} 条</span>
        </div>

        <el-dialog title="添加到砍价"
                   :visible.sync="layer.add"
                   :append-to-body="isBody">
          <el-button type="primary"
                     icon="el-icon-edit"
                     @click="createGoods">添加到砍价</el-button>
          <div class="search"
               style="display:flex">
            <el-input placeholder="请输入商品标题"
                      v-model="goodsTitle"
                      class="input-with-select"></el-input>
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="searchTitle">搜索</el-button>
          </div>
          <el-table :data="lists"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column property="title"
                             label="商品标题"></el-table-column>
          </el-table>
          <div class="page">
            <el-pagination @current-change="handleChange"
                           background
                           page-size=20
                           layout="prev, pager, next"
                           :total="layer.total">
            </el-pagination>
          </div>
        </el-dialog>

        <!--数据-->
        <div class="card-body text">
          <el-table :data="data"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column prop="id"
                             label="ID"
                             width="80">
            </el-table-column>
            <el-table-column prop="title"
                             label="标题">
            </el-table-column>
            <el-table-column prop="attr[0].price"
                             width="80"
                             label="参考价">
            </el-table-column>
            <el-table-column class="danger"
                             prop="attr[0].cprice"
                             width="80"
                             label="当前价">
            </el-table-column>
            <el-table-column prop="attr[0].jdprice"
                             width="80"
                             label="京东价">
            </el-table-column>
            <el-table-column prop="brand"
                             width="80"
                             label="品牌">
            </el-table-column>
            <el-table-column label="操作"
                             width="180">
              <template slot-scope="scope">
                <el-button size="mini"
                           type="primary"
                           icon="el-icon-top"
                           v-if="!scope.row.status"
                           title="上架"
                           @click="change(scope.row.id,scope.$index,1)">
                </el-button>
                <el-button size="mini"
                           type="info"
                           title="下架"
                           icon="el-icon-bottom"
                           v-else
                           @click="change(scope.row.id,scope.$index,0)">
                </el-button>
                <el-button size="mini"
                           type="success"
                           icon="el-icon-edit"
                           @click="_edit(scope.row.id)">
                </el-button>
                <el-button @click="del(scope.row.id,scope.$index)"
                           type="danger"
                           icon="el-icon-delete"
                           size="mini">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination @current-change="handleCurrentChange"
                       background
                       layout="prev, pager, next"
                       :page-size=20
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "../../untils/js/request"
import store from '../../store'

export default {
  name: "index",
  data () {
    return {
      data: [],
      lists: [],
      cate: 1,
      layer: { 'add': false, 'page': 0, 'total': 0, 'look': false },
      look: { data: [], 'page': 0, 'total': 0, 'title': '' },
      isBody: true,
      checkAll: false,
      isIndeterminate: true,
      goodsTitle: '',
      cateTitle: '添加砍价',
      types: 0,
      idAll: [],
      title: '',
      page: 1,
      total: 0
    }
  },
  created () {
    this._getData()
    this._getLists()
  },
  methods: {
    async _getData () {
      let res = await getData(`/category/index?page=1&title=&cate=0&id=9`, '')
      if (res.error_code === 10000) {
        this.data = res.data.data
        this.total = res.data.total
        this.page = res.data.current_page
      }
    },
    async _getLists () {
      let res = await getData(`/goods/index?page=${this.layer.page}&title=${this.goodsTitle}`, '')
      if (res.error_code === 10000) {
        this.lists = res.data.data
        this.layer.page = res.data.current_page
        this.layer.total = res.data.total
      }
    },
    async _getLook () {
      let res = await getData(`/goods?page=${this.look.page}&pid=${this.id}&title=${this.look.title}`, '')
      if (res.error_code === 10000) {
        this.look.data = res.data.data
        this.look.page = res.data.current_page
        this.look.total = res.data.total
      }
    },
    create () {
      this.layer.add = true
    },
    remove () {
      if (!this.idAll.length) {
        this.$message.error('请选择商品')
      } else {
        this._createGoods(0)
      }
    },
    async _change (id, key, status) {
      let res = await getData(`/goods/update/id/${id}`, { 'form': { 'status': status } }, 'POST')
      if (res.error_code === 10000) {
        this.data[key]['status'] = status
        this.$message('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    async _createGoods (status) {
      let res = await getData(`goods/updateHotAll`, { 'status': status, 'all': this.idAll }, 'POST')
      if (res.error_code === 10000) {
        this.$message.success('操作成功')
      }
    },
    async _updateGoods () {
      let res = await getData(`goods/update/id/${this.id}`, { 'all': this.idAll }, 'POST')
      if (res.error_code === 10000) {
        this.$message.success('修改成功')
      }
    },
    handleSelectionChange (e) {
      this.idAll = []
      e.map((item) => {
        this.idAll.push(item.id)
      })
    },
    searchTitle () {
      if (this.goodsTitle) {
        this._getLists()
      } else {
        this.$message.error('商品标题不能为空')
      }
    },
    createGoods () {
      if (!this.idAll.length) {
        this.$message.error('请选择商品')
      } else {
        this._createGoods(1)
      }
    },
    removeGoods () {
      if (!this.idAll.length) {
        this.$message.error('请选择商品')
      } else {
        this._updateGoods()
      }
    },
    async _detele (id, key) {
      let res = await getData(`/goods/delete/id/${id}`)
      if (res.error_code === 10000) {
        this.$message('删除成功')
        this.data.splice(key, 1)
      }
    },
    change (id, key, status) {
      this.$confirm('此操作将更改商品状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._change(id, key, status)
      })
    },
    del (id, key) {
      this.$confirm('此操作将删除商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._detele(id, key)
      })
    },
    _edit (id) {
      store.commit('setid', id)
      store.commit('add_tabs', { path: 'edit-goods', name: '编辑商品' })
    },
    handleCurrentChange (e) {
      this.page = e
      this._getData()
    },
    handleChange (e) {
      this.layer.page = e
      this._getLists()
    },
    search () {
      if (this.title || this.cate) {
        this._getData()
      } else {
        this.$message('分类标题不能为空')
      }
    }
  }

}
</script>

<style scoped>
</style>