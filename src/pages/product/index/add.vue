<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增商品
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-alert
            class="alert-info"
            title="基本信息"
            type="success"
            :closable="false"
          ></el-alert>
          <el-form-item
            label="商品品牌"
            prop="brand_id"
            :rules="[{ required: true, message: '商品品牌不能为空' }]"
          >
            <el-select v-model="form.brand_id" placeholder="请选择商品品牌">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="商品分类"
            prop="category_id"
            :rules="[{ required: true, message: '商品分类不能为空' }]"
          >
            <el-select v-model="form.category_id" placeholder="请选择商品分类">
              <el-option
                v-for="item in options"
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
              v-model="form.title"
              placeholder="请输入商品标题"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品描述"
            prop="describe"
            :rules="[{ required: true, message: '商品描述不能为空' }]"
          >
            <el-input
              placeholder="请输入商品描述"
              v-model="form.describe"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品备注"
            prop="remark"
            :rules="[{ required: true, message: '商品备注不能为空' }]"
          >
            <el-input
              v-model="form.remark"
              placeholder="请输入商品备注"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品排序"
            prop="sort"
            :rules="[{ required: true, message: '商品排序不能为空' }]"
          >
            <el-input
              v-model="form.sort"
              placeholder="请输入商品排序,数值越小越靠前"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品销量" prop="number">
            <el-input
              placeholder="设置默认销量,可以不填写"
              v-model="form.number"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="市场价"
            prop="market_price_fee"
            :rules="[{ required: true, message: '商品市场价不能为空' }]"
          >
            <el-input
              placeholder="请输入商品市场价"
              v-model="form.market_price_fee"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="当前价格"
            prop="price_fee"
            :rules="[{ required: true, message: '商品价格不能为空' }]"
          >
            <el-input
              placeholder="请输入商品价格"
              v-model="form.price_fee"
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
            label="banner"
            prop="banner"
            :rules="[{ required: true, message: '图片不能为空' }]"
          >
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :on-success="bannerSuccess"
              :on-remove="bannerRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>

          <el-alert
            title="价格库存"
            class="alert-info"
            type="success"
            :closable="false"
          ></el-alert>

          <el-form-item label="商品规格">
            <div class="sku">
              <div class="sku-group" v-for="(val, key) in attr" :key="key">
                <div class="group-title">
                  <div class="group-title-label">
                    规格名：
                  </div>
                  <div class="group-wrapper">
                    <input
                      class="input"
                      :data-key="key"
                      :value="val"
                      @change="changeSku"
                      placeholder="请输入规格名称"
                    />
                  </div>
                  <div class="group-title-close">
                    <i class="el-icon-close" @click="removeSku(key)"></i>
                  </div>
                </div>
                <div class="group-container">
                  <div class="group-title-label">
                    规格值：
                  </div>
                  <div class="sku-list">
                    <div
                      class="sku-item"
                      v-for="(v, k) in attr_value[key]"
                      :key="k"
                    >
                      <div class="sku-item-input">
                        <input
                          class="input"
                          :value="v"
                          :data-key="key"
                          :data-k="k"
                          @change="changeValue"
                          placeholder="请输入规格名称"
                        />
                      </div>
                      <span class="item-remove">
                        <i
                          class="el-icon-close"
                          @click="removeValue(key, k)"
                        ></i>
                      </span>
                    </div>
                    <a class="sku-add" @click="addValue(key)">添加规格值</a>
                  </div>
                </div>
              </div>
              <!-- 添加规格 -->
              <div class="add-button" :class="{ no_active: attr.length === 3 }">
                <span @click="addSuk">添加规格项目</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="规格明细">
            <div class="card">
              <el-table
                :data="sku"
                style="width: 100%"
              >
                <el-table-column
                  :label="val"
                  width="130"
                  v-for="(val, key) in attr"
                  :key="key"
                >
                  <template slot-scope="scope" style="background:#e6e6e6">
                    <span v-text="scope.row[key]"></span>
                  </template>
                </el-table-column>

                <el-table-column label="价格" width="150">
                  <template slot-scope="scope">
                    <input
                      disabled
                      v-model="scope.row.price_fee"
                      class="input"
                      placeholder="请输入售价"
                    />
                  </template>
                </el-table-column>

                <el-table-column label="市场价" width="150">
                  <template slot-scope="scope">
                    <input
                      v-model="scope.row.market_price_fee"
                      class="input"
                      placeholder="请输入市场价"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="重量(kg)" width="150">
                  <template slot-scope="scope">
                    <input
                      v-model="scope.row.weight"
                      class="input"
                      placeholder="请输入重量"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="库存" width="150">
                  <template slot-scope="scope">
                    <input
                      v-model="scope.row.quantity"
                      class="input"
                      placeholder="请输入库存"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="销量" width="150">
                  <template slot-scope="scope">
                    <input
                      v-model="scope.row.number"
                      class="input"
                      placeholder="请输入销量"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
              >立即创建</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import { request } from '../../../untils/js/request'
import { cartesian } from '../../../untils/js/common'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  components: {
    quillEditor,
  },
  name: 'add-article',
  data() {
    return {
      data: [],
      action: this.Base + '/admin/tools/upload',
      headers: { token: '' },
      images: [],
      editor: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            action: this.Base + '/admin/tools/upload',
            response: (res) => {
              return this.Base + res.url
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
      form: {
        pid: '',
        title: '',
        describe: '',
        sort: 50,
        number: '',
        cprice: '',
        price: '',
        image: '',
        banner: '',
        content: '',
      },
      catagory: [],
      attribute: [],
      attr: [],
      attr_value: [['']],
      sku: [],
      options: [],
    }
  },
  watch: {},
  mounted() {
    this.headers.token = localStorage.getItem('token')
    this._getCategory()
  },
  methods: {
    async _getCategory() {
      let res = await request()
      if (res.error_code === 10000) {
        res.data.map((item) => {
          this.options.push(item)
        })
      }
    },
    async _create() {
      let data = await request(
        '/productsubscribe/save/',
        {
          form: this.form,
          attribute: this.attribute,
          sku: this.sku,
        },
        'POST'
      )
      if (data.error_code === 10000) {
        this.$message.success('添加成功')
      }
    },
    imageSuccess(e) {
      this.form.image = e.url
    },
    imageRemove() {
      this.form.image = ''
    },
    bannerSuccess(e) {
      this.images.push(e.url)
    },
    bannerRemove(res, file) {
      this.images = []
      file.map((item) => {
        this.images.push(item.url)
      })
    },
    addSuk() {
      if (this.attr.length < 3) {
        this.attr.push('')
        this.attr_value.push([''])
      }
    },
    changeSku(e) {
      let key = parseInt(e.target.dataset.key)
      this.$set(this.attr, key, e.target.value)
    },
    removeSku(key) {
      this.attr.splice(key, 1)
      this.attr_value.splice(key, 1)
    },
    addValue(key) {
      this.attr_value[key].push('')
    },
    changeValue(e) {
      let key = parseInt(e.target.dataset.key)
      let k = parseInt(e.target.dataset.k)
      if (this.attr_value.indexOf(e.target.value) === -1) {
        this.$set(this.attr_value[key], k, e.target.value)
      }
      let data = cartesian(this.attr_value)
      this.sku = data
      console.log(this.sku)
    },
    removeValue(key, k) {
      this.attr_value[key].splice(k, 1)
    },
    dataTables() {
      return {
        rowspan: 0,
        colspan: 0,
      }
    },
    onSubmit(form) {
      this.form.banner = this.images.join(',')
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
  padding: 0 30px;
}
table {
  width: 100% !important;
}
.card {
  box-sizing: border-box;
}
.add {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
.add-button {
  display: inline-block;
  display: flex;
  margin: auto 0;
  margin-top: 15px;
  padding: 5px 15px;
  width: 100%;
  height: 40px;
  height: 32px;
  border: none;
  border-radius: 2px;
  border-radius: 4px;
  background: #f4f4f4;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
  transition: all 0.3s;
  justify-content: flex-start;
}
.add-button span {
  margin: auto 0;
  height: 27px;
  border: 1px solid #2d86d0;
  border-radius: 2px;
  color: #2d86d0;
  font-size: 13px;
  line-height: 25px;
  cursor: pointer;
  padding: 0px 6px;
}
.no_active span {
  color: #929292 !important;
  border: 1px solid #929292 !important;
}
.input-new-tag {
  width: 200px !important;
}
.el-tag {
  margin-right: 10px;
}
.input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
  height: 40px;
  outline: 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  background-image: none;
  color: #606266;
  font-size: inherit;
  line-height: 40px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.sku {
  padding: 15px 25px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
}
.sku-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.group-title {
  position: relative;
  display: flex;
  margin-bottom: 15px;
  padding: 10px 15px;
  width: 100%;
  border-radius: 4px;
  background: #f4f4f4;
  cursor: pointer;
  justify-content: flex-start;
}
.group-title:hover .group-title-close {
  display: flex;
}
.group-title-label {
  height: 30px;
  color: #333;
  line-height: 30px;
  min-width: 65px;
}
.group-wrapper {
  display: flex;
  height: 30px;
}
.group-wrapper input {
  width: 150px;
  height: 30px;
}
.group-title-close {
  position: absolute;
  top: 15px;
  right: 15px;
  display: none;
  width: 20px;
  height: 20px;
  border: 1px solid #929292;
  border-radius: 100%;
  cursor: pointer;
}
.group-title-close i {
  margin: auto;
}
.group-container {
  position: relative;
  display: flex;
  padding: 5px 15px;
  width: 100%;
}
.sku-list {
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
}
.sku-item {
  position: relative;
}
.sku-item:hover .item-remove {
  display: flex;
}
.sku-item-input {
  display: flex;
  height: 30px;
  line-height: 30px;
  margin-bottom: 12px;
  margin-right: 15px;
}
.sku-item-input input {
  display: flex;
  margin: auto;
  width: 150px;
  height: 30px;
  margin-right: 10px;
  margin-bottom: 7px;
}
.item-remove {
  position: absolute;
  top: -10px;
  right: 16px;
  display: none;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.item-remove i {
  margin: auto;
}
.sku-add {
  color: #0a86d0;
  line-height: 30px;
}
</style>
