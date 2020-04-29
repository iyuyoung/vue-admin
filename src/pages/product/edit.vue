<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增商品
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="商品类型"
            prop="exchange"
            :rules="[{ required: true, message: '商品类型不能为空' }]"
          >
            <el-select v-model="form.exchange" placeholder="请选择商品类型">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="标题"
            prop="title"
            :rules="[{ required: true, message: '商品标题不能为空' }]"
          >
            <el-input
              placeholder="请输入商品标题"
              v-model="form.title"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品描述"
            prop="describe"
            :rules="[{ required: true, message: 'describe不能为空' }]"
          >
            <el-input
              type="textarea"
              placeholder="请输入商品描述"
              v-model="form.describe"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品价格"
            prop="price"
            :rules="[{ required: true, message: '商品价格不能为空' }]"
          >
            <el-input
              placeholder="请输入商品价格"
              v-model="form.price"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品分类"
            prop="category"
            :rules="[{ required: true, message: '商品分类不能为空' }]"
          >
            <el-select v-model="form.category" placeholder="请选择商品分类">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="商品库存"
            prop="number"
            :rules="[{ required: true, message: '商品库存不能为空' }]"
          >
            <el-input
              placeholder="请输入商品库存"
              v-model="form.number"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="缩略图"
            prop="image"
            :rules="[{ required: true, message: '图片不能为空' }]"
          >
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :file-list="image"
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
          <el-form-item
            label="商品详情"
            prop="content"
            :rules="[{ required: true, message: '文章内容不能为空' }]"
          >
            <quill-editor
              :options="editor"
              v-model="form.content"
            ></quill-editor>
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

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import store from '../../store'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  components: {
    quillEditor,
  },
  name: 'edit-product',
  data() {
    return {
      data: [],
      id: 0,
      action: this.Base + '/upload',
      headers: { token: '' },
      image: [{ name: 'logo', url: '' }],
      editor: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            action: this.Base + '/upload',
            response: (res) => {
              return this.Base + res.data
            },
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id)
              },
            },
          },
        },
      },
      form: {},
      option: [{label:'购买商品',value:0},{label:'兑换商品',value:1}],
      options: [],
    }
  },
  mounted() {
    this.id = store.state.id
    this.headers.token = localStorage.getItem('token')
    this._getCategory()
    this._getOne()
  },
  methods: {
    async _getCategory() {
      let res = await getData(`/category?pid=1`, '')
      if (res.error_code === 10000) {
        res.data.map((item) => {
          this.options.push({
            value: item.value,
            label: item.label,
          })
        })
      }
    },
    async _getOne() {
      let res = await getData(`/product/${this.id}`, '')
      if (res.error_code === 10000) {
        this.form = res.data
        this.image[0]['url'] = res.data.image
      }
    },
    async _create() {
      let data = await getData(`/product/${this.id}`, this.form, 'PUT')
      if (data.error_code === 10000) {
        this.$message.success('修改成功')
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
