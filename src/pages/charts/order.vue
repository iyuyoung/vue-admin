<template>
  <div class="card">
    <div class="card-header">订单统计</div>
    <div class="card-body text">
      <ve-line :data="chartData"
               :settings="chartSettings"></ve-line>
    </div>
  </div>
</template>

<script>
import { request } from '../../untils/js/request'

export default {
  name: 'user',
  data () {
    this.chartSettings = {
      metrics: ['订单量'],
      dimension: ['日期']
    }
    return {
      chartData: {
        columns: ['下单用户'],
        rows: [
          { '日期': '1/1', '订单量': 0 },
          { '日期': '1/2', '订单量': 0 },
          { '日期': '1/3', '订单量': 10 },
          { '日期': '1/4', '订单量': 0 },
          { '日期': '1/5', '订单量': 40 },
          { '日期': '1/6', '订单量': 0 }
        ]
      }
    }
  },
  mounted () {
    this._request()
  },
  methods: {
    async _request () {
      let data = await request(`order/read/id/1`, {}, 'GET')
      if (data.error_code === 10000) {
        this.chartData.rows = data.data
      }
    },
  }
}
</script>