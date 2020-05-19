<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        <span class="tag">编辑角色</span>
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="名称"
            prop="name"
            :rules="[{ required: true, message: '角色名称不能为空' }]"
          >
            <el-input
              placeholder="请输入用户角色名称"
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
            label="邮箱"
            prop="sort"
            :rules="[{ required: true, message: '邮箱不能为空' }]"
          >
            <el-input placeholder="请输入邮箱" v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item
            label="启用"
            prop="status"
            :rules="[{ required: true, message: '性别不能为空' }]"
          >
            <el-radio-group v-model="form.status">
              <el-radio-button label="1">启用</el-radio-button>
              <el-radio-button label="0">停用</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >立即创建</el-button
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
  name: 'add-user',
  data() {
    return {
      id: 0,
      form: {
        name: '',
        desc: '',
        sort: '',
        status: 0,
      },
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this._getOne()
  },
  methods: {
    async _getOne() {
      let res = await request(`role/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
      }
    },
    async _update() {
      let res = request(`role/${this.id}`, this.form, 'PUT')
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
          this._update()
        } else {
          this.$message.error('请完善信息')
        }
      })
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
