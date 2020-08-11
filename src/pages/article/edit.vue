<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        编辑文章
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="文章类型"
            prop="category_id"
            :rules="[{ required: true, message: '文章类型不能为空' }]"
          >
            <el-cascader
              v-model="form.category_id"
              :options="option"
              :props="{ checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item
            label="文章作者"
            prop="author_id"
            :rules="[{ required: true, message: '文章作者不能为空' }]"
          >
            <el-select v-model="form.author_id" placeholder="请选择文章作者">
              <el-option
                v-for="item in authors"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="标题"
            prop="title"
            :rules="[{ required: true, message: '文章标题不能为空' }]"
          >
            <el-input
              placeholder="请输入文章标题"
              v-model="form.title"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="标签"
            prop="tags"
            :rules="[{ required: true, message: '标签不能为空' }]"
          >
            <el-tag
              v-for="(val, key) in tags"
              :key="key"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              >{{ val }}</el-tag
            >
            <el-input
              class="input-new-tag"
              style="width:150px"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              placeholder="请输入标签"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-form-item>
          <el-form-item
            label="关键字"
            prop="keywords"
            :rules="[{ required: true, message: '关键字不能为空' }]"
          >
            <el-input
              type="textarea"
              placeholder="请输入文章描述"
              v-model="form.keywords"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="文章描述"
            prop="describe"
            :rules="[{ required: true, message: '文章描述不能为空' }]"
          >
            <el-input
              type="textarea"
              placeholder="请输入文章描述"
              v-model="form.describe"
            ></el-input>
          </el-form-item>

          <el-form-item label="是否发布" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否推荐" prop="is_hot">
            <el-radio-group v-model="form.is_hot">
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input
              placeholder="请输入文章排序,越小越靠前"
              v-model="form.sort"
            ></el-input>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input
              placeholder="请输入文章来源"
              v-model="form.source"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="展示方式"
            prop="author_id"
            :rules="[{ required: true, message: '展示方式不能为空' }]"
          >
            <el-select v-model="form.tpl" placeholder="请选择展示方式">
              <el-option
                v-for="item in tpls"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="文章图片"
            prop="image"
            :rules="[{ required: true, message: '图片不能为空' }]"
          >
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :data="{'path':'storage','types':'qiniu'}"
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
          <el-form-item label="文章视频" prop="video">
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :on-success="videoSuccess"
              :on-remove="videoRemove"
              :file-list="videos"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="文章详情"
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
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../untils/js/request'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import store from '../../store'
import { closeTab } from '../../untils/js/common'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  components: {
    quillEditor,
  },
  name: 'add-product',
  data() {
    return {
      id: 0,
      action: this.Base + '/upload',
      headers: { token: '' },
      tags: [],
      inputVisible: false,
      inputValue: '',
      images: [],
      videos: [],
      editor: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            action: this.Base + '/upload',
            headers: (xhr) => {
              xhr.setRequestHeader('token', localStorage.getItem('token'))
            },
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
      tpls: [
        { label: '小图展示', value: 0 },
        { label: '大图展示', value: 1 },
        { label: '视频封面', value: 2 },
      ],
      option: [],
      authors: [],
    }
  },
  mounted() {
    this.headers.token = localStorage.getItem('token')
    this.id = store.state.id
    this._getArticle()
    this._getCategory()
    this._getAuthor()
  },
  methods: {
    async _getArticle() {
      let res = await request(`/article/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
        this.tags = res.data.tags.split(',')
        res.data.image.split(',').map((item) => {
          this.images.push({ name: '封面图', url: item })
        })
        this.videos = { name: '视频', url: res.data.video }
      }
    },
    async _getCategory() {
      let res = await request(`/article_category?list=1`, '')
      if (res.error_code === 10000) {
        this.option = res.data
      }
    },
    async _getAuthor() {
      let res = await request(`/article_author?list=1`, '')
      if (res.error_code === 10000) {
        this.authors = res.data
      }
    },
    async _create() {
      let res = await request(`article/${this.id}`, this.form, 'PUT')
      if (res.error_code === 10000) {
        this.$message.success(res.msg)
        setTimeout(() => {
          this.close()
        }, 1500)
      } else {
        this.$message.error(res.msg)
      }
    },
    imageSuccess(e) {
      this.form.image = e.data
    },
    imageRemove() {
      this.form.image = ''
    },
    videoSuccess(e) {
      this.form.video = e.data
    },
    videoRemove() {
      this.form.video = ''
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    close() {
      closeTab()
    },
    reset(form) {
      this.$refs[form].resetFields()
    },
    handleChange(e) {
      this.form.category_id = e[e.length - 1]
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (this.tags.indexOf(inputValue) != -1) {
        return false
      }
      if (inputValue) {
        this.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
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
