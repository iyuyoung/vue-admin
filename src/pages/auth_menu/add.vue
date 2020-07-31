<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        <span class="tag">新增权限菜单</span>
      </div>
      <div class="main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="上级菜单" prop="pid">
            <el-cascader
              v-model="value"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="菜单名称"
            prop="menu_name"
            :rules="[{ required: true, message: '菜单名称不能为空' }]"
          >
            <el-input
              placeholder="请输入菜单名称"
              v-model="form.menu_name"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="菜单描述"
            prop="menu_desc"
            :rules="[{ required: true, message: '菜单描述不能为空' }]"
          >
            <el-input
              placeholder="请输入菜单描述"
              v-model="form.menu_desc"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="uri"
            prop="menu_uri"
            :rules="[{ required: form.pid, message: 'uri不能为空' }]"
          >
            <el-input
              placeholder="请输入uri"
              v-model="form.menu_uri"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择图标">
            <el-popover
              placement="right"
              width="400"
              height="500"
              title="popover"
              visible-arrow="true"
              trigger="click"
            >
              <Icon @chooseIcon="chooseIcon"></Icon>
              <el-button class="choose" slot="reference">
                <i :class="form.icon_class"></i>
              </el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="是否显示" prop="is_show">
            <el-radio-group v-model="form.is_show">
              <el-radio-button label="1">显示</el-radio-button>
              <el-radio-button label="0">不显示</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio-button label="1">启用</el-radio-button>
              <el-radio-button label="0">不启用</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="排序值"
            prop="sort"
            :rules="[{ required: true, message: '排序值不能为空' }]"
          >
            <el-input
              placeholder="请输入排序值,越小越靠前"
              v-model="form.sort"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >立即创建</el-button
            >
            <el-button type="danger" @click="reset('form')">重置数据</el-button>
            <el-button @click="close">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../untils/js/request'
import { closeTab } from '../../untils/js/common'
import Icon from '../../components/icon'
export default {
  components: { Icon },
  name: 'add-auth-menu',
  data() {
    return {
      status: false,
      popover: false,
      options: [{ label: '顶级分类', value: 0 }],
      value: [0],
      form: {
        pid: 0,
        menu_name: '',
        sort: '',
        menu_desc: '',
        menu_uri: '',
        avatar: '',
        icon_class: 'ri-home-3-fill',
        is_show: 1,
        status: 1,
      },
    }
  },
  mounted() {
    this.getOptions()
  },
  methods: {
    async getOptions() {
      let res = await request('menu')
      if (res.error_code === 10000) {
        res.data.map((item) => {
          this.options.push(item)
        })
      }
    },
    async _create() {
      let res = await request('/menu', this.form, 'POST')
      if (res.error_code === 10000) {
        this.$confirm(`${res.msg}, 是否继续添加?`, '提示', {
          confirmButtonText: '继续添加',
          cancelButtonText: '关闭',
          type: 'success',
        })
          .then((res) => {
            if (res === 'confirm') {
              this.reset('form')
            }
          })
          .catch((res) => {
            if (res === 'cancel') {
              this.close()
            }
          })
      } else {
        this.$message.error(res.msg)
      }
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this._create()
        } else {
          this.$message.error('请完善信息')
        }
      })
    },
    reset(form) {
      this.$refs[form].resetFields()
    },
    close() {
      closeTab()
    },
    chooseIcon(e) {
      this.form.icon_class = e
      this.popover = false
    },
    handleChange(e) {
      this.form.pid = e[e.length - 1]
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
.choose {
  padding: 5px 13px;
}
.choose i {
  font-size: 24px;
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
