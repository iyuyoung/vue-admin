<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增管理员
      </div>
      <div class="main">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">

          <el-form-item label="姓名"
                        prop="name"
                        :rules="[{ required: true, message: '管理员姓名不能为空'}]">
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
          <el-form-item label="管理车间"
                        prop="pid"
                        :rules="[{ required: true, message: '车间不能为空'}]">
            <el-select v-model="form.pid"
                       placeholder="请选择管理车间">
              <el-option v-for="item in data"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id"></el-option>
            </el-select>
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


export default {
  components: {
    // quillEditor
  },
  name: "add-article",
  data () {
    return {
      data: {},
      form: {
        'pid': '',
        'name': '',
        'username': '',
        'password': '',
      }
    }
  },
  mounted () {
    this.getWorkshop()
  },
  methods: {
    async getWorkshop () {
      let res = await getData('workshop')
      if (res.error_code === 10000) {
        let data = res.data.data
        data.push({ 'id': 0, 'title': '全部' })
        this.data = data
      }
    },
    async _create () {
      let data = await getData('/admin/save/', this.form, 'POST')
      if (data.error_code === 10000) {
        this.$message('添加成功')
      }
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