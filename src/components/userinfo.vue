<template>
  <el-dialog
    title="用户信息"
    :append-to-body="true"
    :visible.sync="openStatus"
    width="50%"
    @close="close()"
  >
    <div class="userinfo">
      <div class="item avatar">
        <el-avatar :size="60" :src="userinfo.avatar">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
      </div>
      <div class="item">
        <label>用户名</label>
        <span v-text="userinfo.nickname"></span>
      </div>
      <div class="item">
        <label>状态</label>
        <span v-if="userinfo.status" class="brand">已启用</span>
        <span v-else class="info">未启用</span>
      </div>
      <div class="item">
        <label>手机号</label>
        <span v-text="userinfo.phone"></span>
      </div>
      <div class="item">
        <label>邮箱</label>
        <span v-text="userinfo.email"></span>
      </div>
      <div class="item" v-if="userinfo.role">
        <label>角色</label>
        <span>
          <em
            v-for="(v, k) in userinfo.role"
            :key="k"
            class="brand"
            v-text="v.title"
          ></em>
        </span>
      </div>
      <div class="item" v-if="userinfo.create_time">
        <label>创建时间</label>
        <span v-text="userinfo.create_time"></span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    userinfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      openStatus: this.status,
    }
  },
  watch: {
    status(val) {
      this.openStatus = val
    },
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
  },
}
</script>

<style lang="less" scoped>
.userinfo {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .item {
    display: flex;
    flex-wrap: wrap;
    line-height: 50px;
    border: none;
    label {
      width: 100px;
    }
    span {
      width: 25%;
      display: flex;
      border: none;
      em {
        margin-right: 10px;
        font-style: inherit;
      }
    }
    .el-avatar {
      display: flex;
      margin: auto;
      overflow: hidden;
      border-radius: 100%;
    }
  }
}
</style>
