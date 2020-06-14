<template>
  <div class="p-address">
    <div class="banner">
      <p class="title1">请填写并认真核对您的收货信息</p>
      <p class="title2">实物奖品我们将通过快递的形式寄送，具体发货时间请查看活动规则。</p>
    </div>
    <van-field v-model="name" label="收件人" placeholder="请填写收件人姓名" />
    <van-field v-model="phone" type="tel" label="联系电话" placeholder="收件人电话号码" />
    <van-field
      readonly
      clickable
      is-link
      name="area"
      :value="areaValue"
      label="地区选择"
      placeholder="点击选择省市区"
      @click="showArea = true"
    />
    <van-field
      v-model="address"
      rows="1"
      autosize
      label="详细地址"
      type="textarea"
      placeholder="请输入详细地址"
    />
    <van-popup v-model="showArea" duration="0.3" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
      />
    </van-popup>
    <div class="button" @click="handleConfirm">确认</div>
  </div>
</template>

<script>
import { Field, Popup, Area, Toast } from 'vant'
import AreaList from '@/utils/area'
import { regexp } from '@/utils/utils'

Toast.setDefaultOptions({ duration: 1000 })

export default {
  name: 'Address',
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Toast.name]: Toast
  },
  data () {
    return {
      name: '',
      phone: '',
      areaValue: '',
      showArea: false,
      areaList: AreaList,
      address: ''
    }
  },
  mounted () {

  },
  methods: {
    onConfirm (values) {
      this.areaValue = values.map((item) => item.name).join('/')
      this.showArea = false
    },
    handleConfirm () {
      if (!this.name) {
        Toast('请填写收件人姓名')
      } else if (!regexp.phone.test(this.phone)) {
        Toast('请填写正确收件人电话号码')
      } else if (!this.areaValue) {
        Toast('请选择省市区')
      } else if (!this.address) {
        Toast('请填写详细地址')
      }
    }
  }
}
</script>

<style lang="less">
.p-address {
  .banner {
    width: 375px;
    height: 110px;
    color: #ffffff;
    background-image: url(../assets/luckyDraw/info-banner.png);
    background-size: 375px 110px;
    margin-bottom: 10px;
    overflow: hidden;
    .title1 {
      font-size: 18px;
      text-align: center;
      line-height: 21px;
      margin: 23px 0 9px 0;
    }
    .title2 {
      font-size: 14px;
      color: rgba(255,255,255,0.80);
      text-align: center;
      line-height: 21px;
      margin: 0 20px;
    }
  }
  .van-cell {
    padding-top: 18px;
    padding-bottom: 18px;
  }
  .van-field__label {
    font-size: 14px;
    color: #464646;
  }
  .van-cell__right-icon {
    color: #d1d1d1;
  }
  .van-picker__confirm {
    color: #3fc794;
  }
  .button {
    width: 335px;
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    background: #ff7014;
    margin: 30px auto;
    border-radius: 25px;
  }
}
</style>
