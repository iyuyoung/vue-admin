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
        <!--添加-->
        <div class="create">
          <el-button type="primary"
                     v-if="false"
                     icon="el-icon-edit"
                     @click="create">添加</el-button>
          <span>共有数据: {{total}} 条</span>
        </div>

        <!-- 查看订单 -->
        <el-dialog title="订单详情"
                   :append-to-body="layer.status"
                   :visible.sync="layer.order">
          <el-table :data="form.goods">
            <el-table-column property="goods_id"
                             label="商品ID"
                             width="150"></el-table-column>
            <el-table-column property="title"
                             label="商品标题"
                             width="150"></el-table-column>
            <el-table-column property="attr_title"
                             label="商品规格"></el-table-column>
            <el-table-column property="attr_price"
                             label="商品价格"></el-table-column>
            <el-table-column property="number"
                             label="商品数量"></el-table-column>
          </el-table>
          <el-form :model="form">
            <el-form-item label="用户姓名">
              <el-input v-model="form.name"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="form.telephone"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收货地址">
              <el-input v-model="form.content"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="form.price"
                        :disabled="true"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="付款金额">
              <el-input v-model="form.cprice"
                        :disabled="true"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="快递状态">
              <el-button style="color:#409EFF;"
                         v-if="form.status===1"
                         type="text">
                已付款
              </el-button>
              <el-button style="color:red"
                         v-if="form.status===0"
                         type="text">
                未付款——买家未付款,无法发货
              </el-button>
              <el-button style="color:#fc5350;"
                         v-if="form.status===2"
                         type="text">
                已发货
              </el-button>
            </el-form-item>
            <el-form-item label="快递信息">
              <el-select v-model="form.region"
                         placeholder="请选择快递信息">
                <el-option label="申通"
                           value="shanghai"></el-option>
                <el-option label="圆通"
                           value="beijing"></el-option>
                <el-option label="韵达"
                           value="beijing"></el-option>
                <el-option label="中通"
                           value="beijing"></el-option>
                <el-option label="顺丰"
                           value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="快递单号">
              <el-input v-model="form.number"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="layer.order = false">取 消</el-button>
            <el-button type="primary"
                       @click="sumbit"
                       v-if="form.status!==1">发 货</el-button>
            <el-button type="primary"
                       @click="layer.order = false"
                       v-else>关 闭</el-button>
          </div>
        </el-dialog>

        <!--数据-->
        <div class="card-body text">
          <el-table :data="data"
                    style="width: 100%">
            <el-table-column prop="id"
                             label="ID"
                             width="90">
            </el-table-column>
            <el-table-column prop="name"
                             label="付款人">
            </el-table-column>
            <el-table-column prop="price"
                             label="商品价格"></el-table-column>
            <el-table-column prop="cprice"
                             label="实际付款金额">
              <template slot-scope="scope">
                <span v-if="scope.row.status"
                      style="color:red"
                      v-text="scope.row.cprice"></span>
                <span v-else
                      style="color:#ccc">未付款</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time"
                             label="创建时间">
            </el-table-column>
            <el-table-column label="订单详情">
              <template slot-scope="scope">
                <el-button size="small"
                           @click="show(scope.row)">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="状态"
                             width="120">
              <template slot-scope="scope">
                <el-button style="color:#409EFF;"
                           v-if="scope.row.status===1"
                           type="text"
                           size="small">
                  已付款
                </el-button>
                <el-button style="color:#ccc;"
                           v-if="scope.row.status===0"
                           type="text"
                           size="small">
                  未付款
                </el-button>
                <el-button style="color:#fc5350;"
                           v-if="scope.row.status===2"
                           type="text"
                           size="small">
                  已发货
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="120">
              <template slot-scope="scope">
                <el-button style="color:#409EFF;"
                           type="text"
                           v-if="false"
                           size="small"
                           @click="openEdit(scope.row.id)">
                  发货
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
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router/index'
import { getData } from "../../untils/js/request"
import store from '../../store'

export default {
  name: "index",
  data () {
    return {
      data: [],
      layer: { 'order': false, 'status': true },
      form: {},
      total: 0
    }
  },
  created () {
    this._getData()
  },
  methods: {
    async _getData () {
      let data = await getData(`/order/index`, '')
      if (data.error_code === 10000) {
        this.data = data.data.data
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
    show (data) {
      this.form = data
      this.form.address = data.content + data.street
      this.layer.order = true
    },
    sumbit () {
      this.$confirm('此操作将更改订单状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._sumbit()
      }).catch(() => {

      });
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
      store.commit('add_tabs', { path: 'edit-admin', name: '编辑管理员' })
    },
    async _password (id, text) {
      let data = await getData(`/admin/update?id=${id}`, { 'password': text }, 'POST')
      if (data.error_code === 10000) {
        localStorage.removeItem('token')
        router.push({ path: '/login', name: '登录' })
        window.location.reload()
      }
    },
    _change (id, text) {
      this.$confirm('此操作将修改密码，并退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
        this._password(id, text)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    change (id) {
      this.$alert(``, `修改密码`, {
        dangerouslyUseHTMLString: true,
        showInput: true,
        inputPlaceholder: '请输入新密码',
        confirmButtonText: '确认修改',
      }).then((e) => {
        if (e.action === "confirm") {
          this._change(id, e.value)
        }
      });
      // this._password(id)
    },
    create () {
      store.commit('add_tabs', { path: 'add-admin', name: '添加管理员' })
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