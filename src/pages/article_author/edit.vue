<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        编辑作者
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="名称"
            prop="username"
            :rules="[{ required: true, message: '作者名称不能为空' }]"
          >
            <el-input
              placeholder="请输入作者名称"
              v-model="form.username"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="账户"
            prop="account"
            :rules="[{ required: true, message: '作者账户不能为空' }]"
          >
            <el-input
              placeholder="请输入作者账户"
              v-model="form.account"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="作者描述"
            prop="describe"
            :rules="[{ required: true, message: 'describe不能为空' }]"
          >
            <el-input
              type="textarea"
              placeholder="请输入作者描述"
              v-model="form.describe"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="作者头像"
            prop="avatar"
            :rules="[{ required: true, message: '头像不能为空' }]"
          >
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :data="{'path':'avatar','types':'qiniu'}"
              :on-success="avatarSuccess"
              :on-remove="avatarRemove"
              :file-list="[avatar]"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="二维码" prop="qrcode">
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :data="{'path':'qrcode','types':'qiniu'}"
              :on-success="qrcodeSuccess"
              :on-remove="qrcodeRemove"
              :file-list="[qrcode]"
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
import store from '../../store'
export default {
  components: {},
  name: 'edit_article_author',
  data() {
    return {
      data: [],
      action: this.Base + '/upload',
      headers: { token: '' },
      avatar: { name: '头像', url: '' },
      qrcode: { name: '二维码', url: '' },
      form: {
        username: '',
        describe: '',
        avatar: '',
        qrcode: '',
      },
    }
  },
  mounted() {
    this.id = store.state.id
    this.headers.token = localStorage.getItem('token')
    this._getOne()
  },
  methods: {
    async _getOne() {
      let res = await request(`author/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
      }
    },
    async _create() {
      let res = await request(`author/${this.id}`, this.form, 'PUT')
      if (res.error_code === 10000) {
        this.$message.success(res.msg)
        setTimeout(() => {
          this.close()
        }, 1500)
      } else {
        this.$message.error(res.msg)
      }
    },
    avatarSuccess(e) {
      this.form.avatar = e.data
    },
    avatarRemove() {
      this.form.avatar = ''
    },
    qrcodeSuccess(e) {
      this.form.qrcode = e.data
    },
    qrcodeRemove() {
      this.form.qrcode = ''
    },
    reset(form) {
      this.$refs[form].resetFields()
    },
    close() {
      closeTab()
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this._create()
        } else {
          this.$message.error('请完善内容')
        }
      })
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
