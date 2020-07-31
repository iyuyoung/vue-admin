<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        修改分类
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="上级分类"
            prop="pid"
            :rules="[{ required: true, message: '上级分类不能为空' }]"
          >
            <el-cascader
              v-model="form.pid"
              placeholder="请选择上级分类"
              :options="options"
              :props="{ checkStrictly: true }"
              clearable
            ></el-cascader>
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >立即修改</el-button
            >
            <el-button type="danger" @click="reset('form')">重置数据</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../../untils/js/request'
import { closeTab, update_info } from '../../../untils/js/common'
import store from '../../../store'

export default {
  components: {},
  name: 'edit-category',
  data() {
    return {
      data: [],
      id: 0,
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
      options: [{ value: 0, label: '顶级分类' }],
    }
  },
  mounted() {
    this.id = store
    this.headers.token = localStorage.getItem('token')
    this._getCategory()
  },
  methods: {
    async _getCategory() {
      let res = await request(`/product_category?pid=1`, '')
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
      let res = await request(`product_category/${this.id}`, this.form, 'PUT')
      if (res.error_code === 10000) {
        this.$message.success(res.msg)
        setTimeout(() => {
          this.close()
        }, 1500)
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
