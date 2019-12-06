<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增商品
      </div>
      <div class="main">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="标题"
                        prop="title"
                        :rules="[{ required: true, message: '商品标题不能为空'}]">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="商品描述"
                        prop="describe"
                        :rules="[{ required: true, message: 'describe不能为空'}]">
            <el-input type="textarea"
                      v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item label="商品备注"
                        prop="remark"
                        :rules="[{ required: true, message: '商品备注不能为空'}]">
            <el-input v-model="form.remark"
                      placeholder="京东商品满99包邮"></el-input>
          </el-form-item>

          <el-form-item label="商品分类"
                        prop="category"
                        :rules="[{ required: true, message: '商品分类不能为空'}]">
            <el-select v-model="form.category"
                       placeholder="请选择商品分类">
              <el-option v-for="item in catagory"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品牌"
                        prop="brand_id"
                        :rules="[{ required: true, message: '商品品牌不能为空'}]">
            <el-select filterable v-model="form.brand_id"
                       placeholder="请选择商品品牌">
              <el-option v-for="item in brand"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品牌"
                        prop="brand"
                        :rules="[{ required: true, message: '商品品牌不能为空'}]">
            <el-input placeholder="请输入商品品牌"
                      v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item label="开启抢购">
            <el-switch v-model="isopen"
                       @change="changeOpen"></el-switch>
          </el-form-item>
          <el-form-item label="设为推荐">
            <el-switch v-model="ishot"
                       @change="changeHot"></el-switch>
          </el-form-item>
          <el-form-item label="商品库存"
                        prop="number"
                        :rules="[{ required: true, message: '商品库存不能为空'}]">
            <el-input placeholder="请输入商品库存"
                      v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="商品销量"
                        prop="sell"
                        :rules="[{ required: true, message: '商品销量不能为空'}]">
            <el-input placeholder="请输入商品销量"
                      v-model="form.sell"></el-input>
          </el-form-item>
          <el-form-item label="缩略图"
                        prop="image"
                        :rules="[{ required: true, message: '图片不能为空'}]">
            <el-upload class="upload-demo"
                       :action="action"
                       :headers="headers"
                       :on-success="imageSuccess"
                       :on-remove="imageRemove"
                       list-type="picture">
              <el-button size="small"
                         type="primary">点击上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="banner"
                        prop="banner"
                        :rules="[{ required: true, message: '图片不能为空'}]">
            <el-upload class="upload-demo"
                       :action="action"
                       :headers="headers"
                       :on-success="bannerSuccess"
                       :on-remove="bannerRemove"
                       list-type="picture">
              <el-button size="small"
                         type="primary">点击上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品规格">
            <div class="card">
              <el-table :data="attribute"
                        style="width: 100%">
                <el-table-column label="标题">
                  <template slot-scope="scope">
                    <input v-model="scope.row.title"
                           class="input"
                           placeholder="请输入标题" />

                  </template>
                </el-table-column>
                <el-table-column prop="price"
                                 label="市场价格">
                  <template slot-scope="scope">
                    <input v-model="scope.row.price"
                           class="input"
                           placeholder="请输入市场价格" />
                  </template>
                </el-table-column>
                <el-table-column label="售价">
                  <template slot-scope="scope">
                    <input v-model="scope.row.cprice"
                           class="input"
                           placeholder="请输入售价" />
                  </template>
                </el-table-column>
                <el-table-column label="进货价">
                  <template slot-scope="scope">
                    <input v-model="scope.row.jdprice"
                           class="input"
                           placeholder="请输入进货价" />
                  </template>
                </el-table-column>
                <el-table-column label="商品库存">
                  <template slot-scope="scope">
                    <input v-model="scope.row.number"
                           class="input"
                           placeholder="请输入商品库存" />
                  </template>
                </el-table-column>
                <el-table-column label="删除">
                  <template slot-scope="scope">
                    <el-button type="danger"
                               size="mini"
                               icon="el-icon-delete"
                               @click="attrDelete(scope.$index)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="add">
                <el-button class="add-button"
                           type="primary"
                           icon="el-icon-circle-plus-outline"
                           @click="attrAdd">增加规格
                </el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商品详情"
                        prop="content"
                        :rules="[{ required: true, message: '文章内容不能为空'}]">
            <quill-editor :options="editor"
                          v-model="form.content"></quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit('form')">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "../../untils/js/request"

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  components: {
    quillEditor
  },
  name: "add-article",
  data () {
    return {
      data: [],
      action: this.Base + '/admin/tools/upload',
      headers: { 'token': '' },
      images: [],
      editor: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            action: this.Base + '/admin/tools/upload',
            response: (res) => {
              return this.Base + res.url
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      },
      isopen: false,
      ishot: false,
      form: {
        'title': '',
        'category': '',
        'remark': '',
        'types': '',
        'brand_id': '',
        'brand': '',
        'image': '',
        'isopen': 0,
        'ishot': 0,
        'number': '',
        'sell': '',
        'banner': '',
        'content': ''
      },
      catagory: [],
      brand: [],
      attribute: [{ 'title': '', 'price': '', 'cprice': '','jdprice': '', 'discount': 8, 'number': 100 }],
    }
  },
  mounted () {
    this.headers.token = localStorage.getItem('token')
    this._getCategory()
  },
  methods: {
     async _getCategory () {
      let res = await getData('/category?list=1')
      if (res.error_code === 10000) {
        this.active = res.data.active
        this.catagory = res.data.category
        this.brand = res.data.brand
      }
    },
    async _create () {
      let data = await getData('/goods/save/', { 'form': this.form, 'attribute': this.attribute }, 'POST')
      if (data.error_code === 10000) {
        this.$message('添加成功')
      }
    },
    changeOpen (e) {
      this.form.isopen = e ? 1 : 0
    },
    changeHot (e) {
      this.form.ishot = e ? 1 : 0
    },
    imageSuccess (e) {
      this.form.image = e.url
    },
    imageRemove () {
      this.form.image = ''
    },
    bannerSuccess (e) {
      this.images.push(e.url)
    },
    bannerRemove (res, file) {
      this.images = []
      file.map((item) => {
        this.images.push(item.url)
      })
    },
    attrAdd () {
      this.attribute.push({ 'title': '', 'price': '', 'cprice': '', 'jprice': '', 'discount': 8, 'number': 100 })
    },
    attrDelete (key) {
      this.attribute.splice(key, 1)
    },
    onSubmit (form) {
      this.form.banner = this.images.join(',')
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.isopen = this.form.isopen ? 1 : 0
          this._create()
        } else {
          return false;
        }
      });
    }
  }
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