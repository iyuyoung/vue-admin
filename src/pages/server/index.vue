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
            <td width="30%" v-text="key"></td>
            <td width="70%" v-text="val"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { request } from '../../untils/js/request'
import { timestamp } from '../../untils/js/common'
export default {
  name: 'index',
  data() {
    return {
      data: [],
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let data = await request('/console')
      if (data.error_code === 10000) {
        this.data = data.data
        var bj = this.data['北京时间']
        var server = this.data['服务器时间']
        setInterval(() => {
          this.data['北京时间'] = timestamp(bj++)
          this.data['服务器时间'] = timestamp(server++)
        },1000)
      }
    },
  },
}
</script>

<style scoped></style>
