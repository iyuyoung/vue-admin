<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        <span class="tag">编辑角色</span>
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="角色名称"
            prop="name"
            :rules="[{ required: true, message: '角色名称不能为空' }]"
          >
            <el-input
              placeholder="请输入角色名称"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="角色描述"
            prop="desc"
            :rules="[{ required: true, message: '角色描述不能为空' }]"
          >
            <el-input
              placeholder="请输入角色描述"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="排序值"
            prop="sort"
            :rules="[{ required: true, message: '排序值不能为空' }]"
          >
            <el-input
              placeholder="请输入排序值,排序值越小越靠前"
              v-model="form.sort"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色权限" prop="auth_item_array">
            <el-cascader
              v-model="form.auth_item_array"
              :options="options"
              :props="{ multiple: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="状态"
            prop="status"
            :rules="[{ required: true, message: '状态不能为空' }]"
          >
            <el-radio-group v-model="form.status">
              <el-radio-button label="1">启用</el-radio-button>
              <el-radio-button label="0">停用</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >立即修改</el-button
            >
            <el-button type="danger" @click="reset('form')">重置数据</el-button>
            <el-button @click="close">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../untils/js/request'
import { closeTab } from '../../untils/js/common'

export default {
  components: {},
  name: 'edit-auth-role',
  data() {
    return {
      id: 0,
      options: [],
      form: {
        name: '',
        desc: '',
        sort: '',
        auth_item_set: '',
        auth_item_array: [],
        status: 1,
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getChildren()
    this._getOne()
  },
  methods: {
    async getChildren() {
      let res = await request('menu')
      if (res.error_code === 10000) {
        this.options = res.data
      }
    },
    async _getOne() {
      let res = await request(`role/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
        this.form.auth_item_array = Object.values(this.form.auth_item_array)
      }
    },
    async edit() {
      let res = await request(`role/${this.id}`, this.form, 'PUT')
      if (res.error_code === 10000) {
        this.$message.success(res.msg)
        setTimeout(() => {
          this.close()
        }, 1500)
      } else {
        this.$message.error(res.msg)
      }
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.edit()
        } else {
          this.$message.error('请完善信息')
        }
      })
    },
    handleChange(e) {
      let arr = []
      e.map((item) => {
        arr = arr.concat(item)
      })
      this.form.auth_item_set = arr.join(',')
    },
    reset(form) {
      this.$refs[form].resetFields()
    },
    close() {
      closeTab()
    },
  },
}
</script>

<style scoped>
.main {
  margin-top: 20px;
  padding: 0px 30px;
}

.add {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
}

.add-button {
  height: 36px;
  margin: auto;
}

.input {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>
