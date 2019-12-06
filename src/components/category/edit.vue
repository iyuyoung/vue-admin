<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        编辑分类
      </div>
      <div class="main">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="猫狗分类"
                        prop="pid"
                        :rules="[{ required: true, message: '猫狗分类不能为空'}]">
            <el-select v-model="form.pid"
                       placeholder="猫狗分类">
              <el-option v-for="item in optionDog"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择归属"
                        prop="types"
                        :rules="[{ required: true, message: '归属不能为空'}]">
            <el-select v-model="form.types"
                       placeholder="请选择归属">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题"
                        prop="title"
                        :rules="[{ required: true, message: '分类标题不能为空'}]">
            <el-input placeholder="请输入分类标题"
                      v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="分类图标"
                        prop="icon">
            <el-upload class="upload-demo"
                       :action="action"
                       :headers="headers"
                       :file-list="[{'name':'分类图标','url':form.icon}]"
                       :on-success="iconSuccess"
                       :on-remove="iconRemove"
                       list-type="picture">
              <el-button size="small"
                         type="primary">点击上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类封面"
                        prop="image">
            <el-upload class="upload-demo"
                       :action="action"
                       :headers="headers"
                       :on-success="imageSuccess"
                       :file-list="[{'name':'分类封面','url':form.image}]"
                       :on-remove="imageRemove"
                       list-type="picture">
              <el-button size="small"
                         type="primary">点击上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注信息"
                        prop="remark">
            <el-input placeholder="请输入备注信息"
                      v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit('form')">立即修改</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "../../untils/js/request"
import store from '../../store'


export default {
  components: {
  },
  name: "add-category",
  data () {
    return {
      options: [{
        value: 0,
        label: '活动分类'
      }, {
        value: 1,
        label: '商品分类'
      }, {
        value: 2,
        label: '品牌分类'
      }],
      optionDog: [{
        value: 0,
        label: '其他用品'
      }, {
        value: 1,
        label: '猫用品'
      }, {
        value: 2,
        label: '狗用品'
      }],
      id: 0,
      action: this.Base + '/admin/tools/upload',
      headers: { 'token': '' },
      images: [],
      form: {
        'types': 0,
        'title': '',
        'icon': '',
        'image': '',
        'remark': ''
      }
    }
  },
  mounted () {
    this.id = store.state.id
    this.headers.token = localStorage.getItem('token')
    this._getData()
  },
  methods: {
    async _getData () {
      let res = await getData(`/category/read/id/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
      }
    },
    async _create () {
      let data = await getData(`/category/update/id/${this.id}`, this.form, 'POST')
      if (data.error_code === 10000) {
        this.$message('修改成功')
      }
    },
    imageSuccess (e) {
      this.form.image = e.url
    },
    imageRemove () {
      this.form.image = ''
    },
    iconSuccess (e) {
      this.form.icon = e.url
    },
    iconRemove () {
      this.form.icon = ''
    },
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
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