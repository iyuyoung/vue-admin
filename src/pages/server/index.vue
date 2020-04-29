<template>
  <div class="card">
    <div class="card-header">版本信息</div>
    <div class="card-body text">
      <colgroup>
        <col width="100" />
        <col />
      </colgroup>
      <table class="table">
        <tbody>
          <tr v-for="(val, key) in data" :key="key">
            <td v-text="key"></td>
            <td v-text="val"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getData } from '../../untils/js/request'
export default {
  name: 'index',
  data() {
    return {
      data: [],
    }
  },
  created() {
    this._getData()
  },
  methods: {
    async _getData() {
      let data = await getData('/index/console')
      if (data.error_code === 10000) {
        this.data = data.data
      }
    },
  },
}
</script>

<style scoped></style>
