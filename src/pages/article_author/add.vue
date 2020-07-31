<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增作者
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="名称"
            prop="title"
            :rules="[{ required: true, message: '作者名称不能为空' }]"
          >
            <el-input
              placeholder="请输入作者名称"
              v-model="form.title"
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
              :data="{ path: 'avatar', types: 'qiniu' }"
              :on-success="avatarSuccess"
              :on-remove="avatarRemove"
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
              :data="update_info"
              :on-success="qrcodeSuccess"
              :on-remove="qrcodeRemove"
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
import { closeTab, update_info } from '../../untils/js/common'
export default {
  components: {},
  name: 'add_article_author',
  data() {
    return {
      action: this.Base + '/upload',
      headers: { token: '' },
      update_info: update_info,
      title: '',
      form: {
        username: '',
        describe: '',
        avatar: '',
        qrcode: '',
      },
    }
  },
  mounted() {
    this.headers.token = localStorage.getItem('token')
  },
  methods: {
    async _create() {
      let res = await request('author', this.form, 'POST')
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
