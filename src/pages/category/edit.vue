<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增分类
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="上级分类"
            prop="pid"
            :rules="[{ required: true, message: '上级分类不能为空' }]"
          >
            <el-select v-model="form.pid" placeholder="上级分类">
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
            :rules="[{ required: true, message: '分类标题不能为空' }]"
          >
            <el-input
              placeholder="请输入分类标题"
              v-model="form.title"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="排序"
            prop="sort"
            :rules="[{ required: true, message: '分类标题不能为空' }]"
          >
            <el-input
              placeholder="分类排序数字越小越靠前"
              v-model="form.sort"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类图标" prop="image">
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
          <el-form-item label="备注信息" prop="remark">
            <el-input
              placeholder="请输入备注信息"
              v-model="form.remark"
            ></el-input>
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
import { request } from '../../untils/js/request'
import store from '../../store'

export default {
  components: {},
  name: 'add-category',
  data() {
    return {
      action: this.Base + '/upload',
      headers: { token: '' },
      images: [],
      id: 0,
      options: [
        {
          value: 0,
          label: '顶级分类',
        },
      ],
      form: {
        pid: 0,
        sort: 50,
        title: '',
        image: '',
        remark: '',
      },
    }
  },
  mounted() {
    this.id = store.state.id
    this.headers.token = localStorage.getItem('token')
    this._getOne()
    this._request()
  },
  methods: {
    async _getOne() {
      let res = await request(`/category/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
      }
    },
    async _request() {
      let res = await request('/category?pid=0')
      if (res.error_code === 10000) {
        res.data.map((item) => {
          this.options.push(item)
        })
      }
    },
    async _create() {
      let data = await request(`/category/${this.id}`, this.form, 'PUT')
      if (data.error_code === 10000) {
        this.$message.success('修改成功')
        setTimeout(() => {
          store.commit('add_tabs', { path: 'category', name: '分类管理' })
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
