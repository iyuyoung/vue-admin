<template>
  <div class="router">
    <div class="left">
      <!-- 数量统计 -->
      <div class="number">
        <keep-alive v-for="(val, key) in list" :key="key">
          <number
            :title="val.title"
            :tag="val.tag"
            :number="val.number"
            :color="val.color"
          ></number>
        </keep-alive>
      </div>
      <!--用户图标访问统计-->
      <keep-alive>
        <user :userData="userData"></user>
      </keep-alive>
    </div>
    <div class="right">
      <!--实时监控-->
      <keep-alive>
        <cpu></cpu>
      </keep-alive>
      <!--服务器信息统计-->
      <keep-alive>
        <Index/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Index from '../server/index'
import number from '../database/number'
import Cpu from '../server/cpu'
import User from '../charts/user'
import { request } from '../../untils/js/request'

export default {
  components: {
    User,
    Cpu,
    number,
    Index,
  },
  name: 'index',
  data() {
    return {
      list: [],
      userData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
    }
  },
  created() {
    this._request()
  },
  methods: {
    async _request() {
      let res = await request('record')
      if (res.error_code === 10000) {
        this.list = res.data
      }
    },
  },
}
</script>

<style lang="less">
.router {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    width: 60%;
    .number {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      justify-content: space-between;
      .card {
        width: 21.5%;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .right {
    width: 38%;
  }
}
</style>
