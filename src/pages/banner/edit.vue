<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        修改banner
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="链接分类"
            prop="category"
            :rules="[{ required: true, message: '链接分类不能为空' }]"
          >
            <el-select v-model="form.category" placeholder="链接分类">
              <el-option
                v-for="(val, key) in category"
                :key="key"
                :label="val.label"
                :value="val.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="标题"
            prop="title"
            :rules="[{ required: true, message: 'banner标题不能为空' }]"
          >
            <el-input
              placeholder="请输入banner标题"
              v-model="form.title"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="链接类型"
            prop="url_type"
            :rules="[{ required: true, message: '链接类型不能为空' }]"
          >
            <el-select v-model="form.url_type" placeholder="链接类型">
              <el-option v-for="(val,key) in types" :key="key" :label="val.label" :value="val.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="链接"
            prop="url"
            :rules="[{ required: true, message: '链接不能为空' }]"
          >
            <el-input placeholder="请输入链接" v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item
            label="排序"
            prop="sort"
            :rules="[{ required: true, message: '排序值不能为空' }]"
          >
            <el-input
              placeholder="排序数字越小越靠前"
              v-model="form.sort"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="image">
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :data="{ path: 'banner', types: 'qiniu' }"
              :file-list="images"
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
          <el-form-item label="描述信息" prop="describe">
            <el-input
              type="textarea"
              placeholder="请输入描述信息"
              v-model="form.describe"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >立即修改</el-button
            >
            <el-button @click="close()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../untils/js/request'
import store from '../../store'
import { closeTab } from '../../untils/js/common'

export default {
  components: {},
  name: 'edit-banner',
  data() {
    return {
      action: this.Base + '/upload',
      headers: { token: '' },
      images: [],
      id: 0,
      category: [{ label: '首页banner', value: 1 },{ label: '内容banner', value: 2 }],
      types: [{ label: '网页', value: 1 },{ label: '小程序', value: 2 }],
      form: {
        title: '',
        image: '',
        banner: '',
        sort: 50,
        url: '',
        url_type: '',
        describe: '',
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
      let res = await request(`/banner/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
        this.images.push({ name: '封面图', url: res.data.image })
      }
    },
    async _create() {
      let data = await request(`/banner/${this.id}`, this.form, 'PUT')
      if (data.error_code === 10000) {
        this.$message.success('修改成功')
        setTimeout(() => {
          closeTab()
        }, 1500)
      }
    },
    imageSuccess(e) {
      this.form.image = e.data
    },
    imageRemove() {
      this.form.image = ''
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
    close() {
      closeTab()
    },
    reset(form) {
      this.$refs[form].resetFields()
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
