<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        <span class="tag">新增管理员</span>
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="姓名"
            prop="nickname"
            :rules="[{ required: true, message: '姓名不能为空' }]"
          >
            <el-input
              placeholder="请输入用户姓名"
              v-model="form.nickname"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="phone"
            :rules="[{ required: true, message: '手机号不能为空' }]"
          >
            <el-input
              placeholder="请输入手机号"
              v-model="form.phone"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            :rules="[{ required: true, message: '邮箱不能为空' }]"
          >
            <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item
            label="性别"
            prop="gender"
            :rules="[{ required: true, message: '性别不能为空' }]"
          >
            <el-radio-group v-model="form.gender">
              <el-radio-button label="1">男</el-radio-button>
              <el-radio-button label="2">女</el-radio-button>
              <el-radio-button label="0">未知</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="登陆密码"
            prop="password"
            :rules="[{ required: true, message: '登陆密码不能为空' }]"
          >
            <el-input
              type="password"
              placeholder="请输入登陆密码"
              v-model="form.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="pid">
            <el-cascader
              :options="options"
              v-model="value"
              :props="{ multiple: true }"
              clearable
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="用户头像">
            <el-upload
              class="upload-demo"
              :action="action"
              :data="{ path: 'avatar', types: 'qiniu' }"
              :headers="header"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
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
      status: false,
      action: this.Base + '/upload',
      header: { token: localStorage.getItem('token') },
      paths: { path: 'avatar' },
      options: [],
      value: [],
      form: {
        nickname: '',
        password: '',
        phone: '',
        email: '',
        avatar: '',
        role: '',
        gender: 1,
      },
    }
  },
  mounted() {
    this.getRole()
  },
  methods: {
    async getRole() {
      let res = await request('role')
      if (res.error_code === 10000) {
        res.data.map((item) => {
          this.options.push({ label: item.label, value: item.value })
        })
      }
    },
    async _create() {
      let res = await request('/staff', this.form, 'POST')
      if (res.error_code === 10000) {
        this.$confirm(`${res.msg}, 是否继续添加?`, '提示', {
          confirmButtonText: '继续添加',
          cancelButtonText: '关闭',
          type: 'success',
        })
          .then((res) => {
            if (res === 'confirm') {
              this.reset('form')
            }
          })
          .catch((res) => {
            if (res === 'cancel') {
              this.close()
            }
          })
      } else {
        this.$message.error(res.msg)
      }
    },
    handleAvatarSuccess(e) {
      this.form.avatar = e.data
    },
    handleRemove() {
      this.form.avatar = ''
    },
    handleChange(e) {
      let arr = []
      e.map((item) => {
        arr = arr.concat(item)
      })
      this.form.role = arr.join(',')
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this._create()
        } else {
          this.$message.error('请完善信息')
        }
      })
    },
    reset(form) {
      this.$refs[form].resetFields()
      this.handleRemove()
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
