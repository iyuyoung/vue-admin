<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        编辑员工
      </div>
      <div class="main">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="姓名"
                        prop="name"
                        :rules="[{ required: true, message: '姓名不能为空'}]">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号"
                        prop="username"
                        :rules="[{ required: true, message: '登陆账号不能为空'}]">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码"
                        prop="password"
                        :rules="[{ required: true, message: '登陆密码不能为空'}]">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="职位"
                        prop="position"
                        :rules="[{ required: true, message: '职位标题不能为空'}]">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="积分"
                        prop="number"
                        :rules="[{ required: true, message: '积分不能为空'}]">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="选择车间"
                        prop="pid"
                        :rules="[{ required: true, message: '车间不能为空'}]">
            <el-select v-model="form.pid"
                       placeholder="请选择归属车间">
              <el-option v-for="item in data"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="upload-demo"
                       :action="action"
                       :headers="headers"
                       :file-list="avatar"
                       :on-success="handleAvatarSuccess"
                       :on-remove="handleRemove"
                       list-type="picture">
              <el-button size="small"
                         type="primary">点击上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注"
                        prop="remarks">
            <el-input type="textarea"
                      v-model="form.remarks"></el-input>
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
import { request } from "../../untils/js/request"
import store from '../../store';


export default {
  components: {

  },
  name: "add-user",
  data () {
    return {
      status: false,
      action: this.Base + '/admin/tools/uploads',
      headers: { 'token': '' },
      id: 0,
      data: [],
      avatar: [],
      form: {
        'pid': '',
        'name': '',
        'username': '',
        'number': '',
        'password': '',
        'avatar': '',
        'remarks': '',
        'position': '',
      }
    }
  },
  mounted () {
    this.id = store.state.id
    this.headers.token = localStorage.getItem('token')
    this._getWorkshop()
    this._request()
  },
  methods: {
    async _getWorkshop () {
      let res = await request('/workshop/index')
      if (res.error_code === 10000) {
        this.data = res.data.data
      }
    },
    async _request () {
      let res = await request(`/user/read/id/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
        this.avatar = [{ name: '用户头像', url: res.data.avatar }]
      }
    },
    async _create () {
      let data = await request(`/user/update/id/${this.id}`, this.form, 'POST')
      if (data.error_code === 10000) {
        this.$message('修改成功')
      }
    },
    _isNull (text) {
      if (!text || text === null || text === '' || typeof (text) === 'undefined' || !text.trim().length || text === 'null') {
        return true
      }
    },
    handleAvatarSuccess (e) {
      this.form.avatar = e.url
    },
    handleRemove () {
      this.form.avatar = ''
      this.avatar = []
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