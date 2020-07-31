<template>
  <div class="router">
    <div class="card">
      <div class="card-header">
        <span class="tag">编辑权限菜单</span>
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
            :rules="[{ required: true, message: 'uri不能为空' }]"
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
              >立即修改</el-button
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
import { closeTab, array_chunk } from '../../untils/js/common'
import Icon from '../../components/icon'
export default {
  components: { Icon },
  name: 'edit-auth-menu',
  data() {
    return {
      id: 0,
      status: false,
      value: [0],
      options: [{ label: '顶级分类', value: 0 }],
      form: {},
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getOne()
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
    async getOne() {
      let res = await request(`/menu/${this.id}`)
      if (res.error_code === 10000) {
        this.form = res.data
        if (res.value[0].length) {
          this.value = array_chunk(res.value[0])
          this.value.push(this.id)
        } else {
          this.value = [0]
        }
      }
    },
    async edit() {
      let res = await request(`/menu/${this.id}`, this.form, 'PUT')
      if (res.error_code === 10000) {
        this.$message.success(res.msg)
        setTimeout(() => {
          this.close()
        }, 1500)
      } else {
        this.$message.error(res.msg)
      }
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.edit()
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
