<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增规则
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="标题"
            prop="title"
            :rules="[{ required: true, message: '规则标题不能为空' }]"
          >
            <el-input v-model="form.title" placeholder="请输入规则标题"></el-input>
          </el-form-item>
          <el-form-item
            label="规则描述"
            prop="describe"
            :rules="[{ required: true, message: '规则描述不能为空' }]"
          >
            <el-input type="textarea" placeholder="请输入规则描述"  v-model="form.describe"  :autosize="{ minRows: 8, maxRows: 8}"></el-input>
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

export default {
  components: {
    // quillEditor
  },
  name: 'add-rule',
  data() {
    return {
      form: {
        title: '',
        dscribe: '',
      },
    }
  },
  mounted() {},
  methods: {
    async _create() {
      let data = await request('rule', this.form, 'POST')
      if (data.error_code === 10000) {
        this.$message.success('添加成功')
      }
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
