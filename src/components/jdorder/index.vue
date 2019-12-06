<template>
  <div class="main">
    <div class="router">
      <div class="card">
        <div class="card-header">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>京东账单</el-breadcrumb-item>
            <el-breadcrumb-item>京东账单列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--添加-->
        <div class="create">
          <span>共有数据: {{total}} 条</span>
          <span>当前余额: {{price}}</span>
        </div>

        <!--数据-->
        <div class="card-body text">
          <el-table :data="data"
                    style="width: 100%">
            <el-table-column prop="id"
                             label="ID"
                             width="120">
            </el-table-column>
            <el-table-column prop="amount" width="140"
                             label="消费金额">
            </el-table-column>
            <el-table-column prop="notePub"
                             label="账单备注">
            </el-table-column>
            <el-table-column prop="tradeTypeName" width="180"
                             label="消费信息">
            </el-table-column>
            <el-table-column prop="createdDate"
                             label="创建时间">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--分页-->
      <div class="page">
        <el-pagination @current-change="next"
                       background
                       layout="prev, pager, next"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "../../untils/js/request"

export default {
  name: "jdorder",
  data () {
    return {
      data: [],
      layer: { 'order': false, 'status': true },
      form: {},
      price: 0,
      total: 0
    }
  },
  created () {
    this._getData()
  },
  methods: {
    async _getData () {
      let data = await getData(`/order/jdorder`, '')
      if (data.error_code === 10000) {
        this.data = data.data.data
        this.price = data.price
        this.total = data.data.total
      }
    },
    async _sumbit () {
      let data = await getData(`/order/update/id/${this.form}`, this.form)
      if (data.error_code === 10000) {
        this.$message({
          type: 'success',
          message: '已发货!'
        })
        this.layer.order = false
      }
    },
    async _del (id, key) {
      let data = await getData(`order/delete?id=${id}`, {}, 'delete')
      if (data.error_code === 10000) {
        this.data.splice(key, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    },
    next (e) {
      this.page = e
      this._getData()
    }
  }

}
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-form-item__label {
  width: 70px;
}
.el-input {
  width: 200px;
}
</style>