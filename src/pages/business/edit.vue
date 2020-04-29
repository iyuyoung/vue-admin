<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        编辑商家
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="商家名称"
            prop="title"
            :rules="[{ required: true, message: '商家名称不能为空' }]"
          >
            <el-input
              placeholder="请输入商家名称"
              v-model="form.title"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商家logo"
            prop="logo"
            :rules="[{ required: true, message: '商家logo不能为空' }]"
          >
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :on-success="logoSuccess"
              :file-list="image"
              :on-remove="logoRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="联系方式"
            prop="phone"
            :rules="[{ required: true, message: '联系方式不能为空' }]"
          >
            <el-input
              placeholder="请输入商家联系方式"
              v-model="form.phone"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="商家描述"
            prop="describe"
            :rules="[{ required: true, message: '商家描述不能为空' }]"
          >
            <el-input
              placeholder="请输入商家描述"
              v-model="form.describe"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >立即修改</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '../../untils/js/request'
import store from '../../store'

export default {
  components: {},
  name: 'edit-business',
  data() {
    return {
      data: {},
      id: 0,
      action: this.Base + '/upload',
      headers: { token: '' },
      image: [{ name: 'logo', url: '' }],
      form: {},
    }
  },
  mounted() {
    this.id = store.state.id
    this.headers.token = localStorage.getItem('token')
    this._getOne()
  },
  methods: {
    async _getOne() {
      let res = await getData(`business/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
        this.image[0]['url'] = res.data.logo
      }
    },
    async _create() {
      let data = await getData(`business/${this.id}`, this.form, 'PUT')
      if (data.error_code === 10000) {
        this.$message.success('修改成功')
        setTimeout({}, 1000)
      }
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this._create()
        } else {
          return false
        }
      })
    },
    logoSuccess(e) {
      this.form.logo = e.data
    },
    logoRemove() {
      this.form.logo = ''
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
