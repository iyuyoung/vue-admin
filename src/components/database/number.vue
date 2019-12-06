<template>
  <div class="card">
    <div class="card-header">
      <span v-text="title"></span>
      <em v-text="tag"></em>
    </div>
    <div class="card-body">
      <div class="card-number">
        <span v-text="number"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '本周注册'
    },
    tag: {
      type: String,
      default: '周'
    },
    number: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  name: 'number'
}
</script>

<style lang="less">
.card {
  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    em {
      background: orange;
      padding: 0 6px;
      font-size: 12px;
      text-align: center;
      background-color: #ff5722;
      color: #fff;
      border-radius: 2px;
      height: 20px;
      line-height: 20px;
      font-style: initial;
    }
  }
  .card-body {
    .card-number {
      font-size: 36px;
      font-weight: bold;
      color: #666;
    }
  }
}
</style>