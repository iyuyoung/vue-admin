<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        新增广告海报
      </div>
      <div class="main">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="广告归属"
                        prop="category"
                        :rules="[{ required: true, message: '广告归属不能为空'}]">
            <el-select v-model="form.category"
                       placeholder="请选择广告归属">
              <el-option v-for="item in allCategory"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题"
                        prop="title"
                        :rules="[{ required: true, message: '标题不能为空'}]">
            <el-input v-model="form.title"
                      placeholder="广告归属为捡便箱广告时，标题为广告商名称"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        prop="describe"
                        :rules="[{ required: true, message: 'describe不能为空'}]">
            <el-input type="textarea"
                      v-model="form.describe"
                      placeholder="广告归属为捡便箱广告时，描述为广告商业务"></el-input>
          </el-form-item>

          <el-form-item label="广告类型"
                        prop="types"
                        :rules="[{ required: true, message: '广告类型不能为空'}]">
            <el-select v-model="form.types"
                       placeholder="请选择广告类型">
              <el-option v-for="item in allTypes"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告链接"
                        prop="url"
                        :rules="[{ required: true, message: '广告链接不能为空'}]">
            <el-input v-model="form.url"
                      placeholder="购买页面路径pages/detail/main?id=商品ID，活动路径：pages/search/main?id=活动ID&title=疯狂的小狗"></el-input>
          </el-form-item>
          <el-form-item label="广告图片"
                        prop="types"
                        :rules="[{ required: true, message: '广告链接不能为空'}]">
            <el-upload class="upload-demo"
                       :action="action"
                       :headers="headers"
                       :on-success="imageSuccess"
                       list-type="picture">
              <el-button size="small"
                         type="primary">点击上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，宠物名片广告:500*200 弹出海报:800*600 捡便箱广告:550*470 商城banner:750*550</div>
            </el-upload>
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
  },
  name: "add-banner",
  data () {
    return {
      data: {},
      action: this.Base + '/admin/tools/upload',
      allCategory: [{ 'id': 0, 'title': '宠物名片广告' }, { 'id': 1, 'title': '弹出海报' }, { 'id': 2, 'title': '捡便箱广告' }, { 'id': 3, 'title': '商城banner' }, { 'id': 4, 'title': '抢购banner' },{ 'id': 5, 'title': '活动历史' }],
      allTypes: [{ 'id': 0, 'title': '商品链接' }, { 'id': 1, 'title': '打开网页' }],
      form: {
        'title': '',
        'describe': '',
        'types': '',
        'category': '',
        'url': '',
        'image': ''
      }
    }
  },
  mounted () {
  },
  methods: {
    async _create () {
      let data = await getData('/banner/save/', this.form, 'POST')
      if (data.error_code === 10000) {
        this.$message('添加成功')
      }
    },
    imageSuccess (e) {
      this.form.image = e.url
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