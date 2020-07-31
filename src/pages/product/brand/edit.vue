<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增品牌
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="上级品牌"
            prop="pid"
          >
            <el-select
              v-model="form.pid"
              placeholder="上级品牌"
              style="margin-right:5px;"
            >
              <el-option
                v-for="(val, key) in options"
                :key="key"
                :label="val.label"
                :value="val.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="标题"
            prop="title"
            :rules="[{ required: true, message: '品牌标题不能为空' }]"
          >
            <el-input
              placeholder="请输入品牌标题"
              v-model="form.title"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="品牌描述"
            prop="desc"
            :rules="[{ required: true, message: '品牌描述不能为空' }]"
          >
            <el-input
              type="textarea"
              placeholder="请输入品牌描述"
              v-model="form.desc"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="图片"
            prop="image"
            :rules="[{ required: true, message: '图片不能为空' }]"
          >
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :data="update_info"
              :on-success="imageSuccess"
              :on-remove="imageRemove"
              :file-list="images"
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
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../../untils/js/request'
import { closeTab, update_info } from '../../../untils/js/common'

export default {
  components: {},
  name: 'edit-brand',
  data() {
    return {
      data: [],
      action: this.Base + '/upload',
      headers: { token: '' },
      images: [],
      update_info: update_info,
      form: {
        pid: 0,
        title: '',
        image: '',
        desc: '',
      },
      options: [{ value: 0, label: '顶级品牌' }],
    }
  },
  mounted() {
    this.headers.token = localStorage.getItem('token')
    this._getBrand()
  },
  methods: {
    async _getBrand() {
      let res = await request(`/product_brand?pid=1`, '')
      if (res.error_code === 10000) {
        res.data.map((item) => {
          this.options.push({
            value: item.value,
            label: item.label,
          })
        })
      }
    },
    async _create() {
      let res = await request('product_brand', this.form, 'POST')
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
    imageSuccess(e) {
      this.form.image = e.data
    },
    imageRemove() {
      this.form.image = ''
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
          return false
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
