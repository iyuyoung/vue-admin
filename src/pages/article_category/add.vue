<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增文章分类
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="上级菜单" prop="pid">
            <el-cascader
              v-model="form.pid"
              :options="options"
              :props="{ checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="名称"
            prop="title"
            :rules="[{ required: true, message: '文章分类名称不能为空' }]"
          >
            <el-input
              placeholder="请输入文章分类名称"
              v-model="form.title"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类备注" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入文章分类备注"
              v-model="form.remark"
            ></el-input>
          </el-form-item>

          <el-form-item label="分类图片" prop="image">
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :data="{'path':'category','types':'qiniu'}"
              :on-success="imageSuccess"
              :on-remove="imageRemove"
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
  name: 'add_article_category',
  data() {
    return {
      action: this.Base + '/upload',
      headers: { token: '' },
      options: [],
      form: {
        title: '',
        remark: '',
        image: '',
        sort: 50,
      },
    }
  },
  mounted() {
    this.headers.token = localStorage.getItem('token')
    this._getCategory()
  },
  methods: {
    async _getCategory() {
      let res = await request(`/article_category?list=1`, '')
      if (res.error_code === 10000) {
        this.options = res.data
      }
    },
    async _create() {
      let res = await request('article_category', this.form, 'POST')
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
          this.$message.error('请完善内容')
        }
      })
    },
    handleChange(e) {
      this.form.pid = e[e.length - 1]
    }
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
