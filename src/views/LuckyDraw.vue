<template>
  <div class="p-lucky-draw">
    <div class="banner">
      <div class="title">这里是大标题</div>
      <p>已有9999人参与活动</p>
    </div>
    <div class="main">
      <van-swipe class="my-swipe" autoplay="3000" :show-indicators="false" :touchable="false" vertical>
        <van-swipe-item v-for="item in info.winning" :key="item.id">
          <span>恭喜</span>&nbsp;
          <span>{{item.id}}</span>&nbsp;
          <span>抽中</span>&nbsp;
          <span>{{item.prizeName}}</span>
        </van-swipe-item>
      </van-swipe>
      <div
        :key="index"
        class="prize-wrap"
        :class="{'active-prize': index === activeIndex}"
        v-for="(item, index) in info.prizes"
      >
        <div class="prize-img" :style="{backgroundImage: `url(${item.imgUrl})`}"></div>
        {{item.name}}
      </div>
      <div class="lucky-btn" @click="handleStart">
        <span class="start">开始</span>
        <span class="start">抽奖</span>
        <span class="text">今日抽奖次数</span>
        <span class="count">{{info.num}}</span>
      </div>
    </div>
    <div class="footer">
      <div class="btn" @click="showPopub('rule')">活动规则</div>
      <div class="btn" @click="showPopub('winning')">中奖纪录</div>
    </div>
    <div class="rule-popup">
      <van-popup v-model="show" duration="0.2">
        <div class="rule">
          <template v-if="showType === 'rule'">
            <h1>活动规则</h1>
            <div class="rule-content" v-html="info.detailMessage"></div>
          </template>
          <template v-else>
            <h1>中奖纪录</h1>
            <div class="winning-content">
              <template v-if="info.winningRecord.length">
                <div class="item" v-for="(item) in info.winningRecord" :key="item.id">
                  <span>抽中{{item.prizeName}}</span>
                  <span>{{item.time}}</span>
                </div>
              </template>
              <p class="empty" v-else>暂无中奖纪录</p>
            </div>
          </template>
          <div class="btn-wrap">
            <div class="btn cancel" @click="hiddenPopup">我知道了</div>
            <div class="btn" v-if="info.winningRecord.length" @click="goToAddress">填写地址</div>
          </div>
        </div>
        <div class="close-wrap" @click="hiddenPopup">
          <div class="close-btn" v-if="showType === 'rule'"></div>
        </div>
      </van-popup>
    </div>
    <div class="win-popup">
      <van-popup v-model="winShow" duration="0.1" @click-overlay="hiddenWinPopup">
        <p class="title1">恭喜您获得</p>
        <p class="title2">{{prizeDetail.name}}</p>
        <div class="coloured-ribbon">
          <div class="img" :style="{ backgroundImage: `url(${prizeDetail.img})` }"></div>
        </div>
        <div class="btn-wrap">
          <div class="btn cancel" @click="hiddenWinPopup">我知道了</div>
          <div class="btn" @click="goToAddress">填写地址</div>
        </div>
      </van-popup>
    </div>
    <div class="not-win-popup">
      <van-popup v-model="notWinShow" duration="0.2">
        <h1>很遗憾，您未中奖</h1>
        <img src="../assets/luckyDraw/cry.png" />
        <div class="btn" @click="hiddenNotWinPopup">好吧下次再来</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { NoticeBar, Swipe, SwipeItem, Popup } from 'vant'

export default {
  name: 'LuckyDraw',
  components: {
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Popup.name]: Popup
  },
  data () {
    return {
      show: false,
      showType: '',
      winShow: false,
      notWinShow: false,
      activeIndex: -1,
      winIndex: 5,
      prizeDetail: {
        name: '100M云空间',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
      },
      info: {
        num: 6,
        detailMessage: '<p>1、 如您成功中奖,请务必在24小时内点击“立即领取”,并填写联系人、手机号、邮寄地址等信息,以便统计发奖；</p><p>若不在规定时间内点击领奖并填写信息,则视为自动放弃该奖项；</p><p>2、奖品发放：所有奖品的发放都将以您抽奖后填写的邮寄信息为依据,请确保填写无误。</p><p>(1)精美课件包:系统将在活动结束后的7个工作日内,将课件获取链接通过希沃学院站内信发送至您的账号;</p><p>3、点击这里下载希沃白板5进行高效备课 规则活动规</p><p>1、 如您成功中奖,请务必在24小时内点击“立即领取”,并填写联系人、手机号、邮寄地址等信息,以便统计发奖；</p><p>若不在规定时间内点击领奖并填写信息,则视为自动放弃该奖项；</p><p>2、奖品发放：所有奖品的发放都将以您抽奖后填写的邮寄信息为依据,请确保填写无误。</p><p>(1)精美课件包:系统将在活动结束后的7个工作日内,将课件获取链接通过希沃学院站内信发送至您的账号;</p><p>3、点击这里下载希沃白板5进行高效备课 规则活动规</p>',
        prizes: [
          {
            name: '100M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '200M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '300M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '400M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '500M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '600M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '700M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '800M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '900M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          },
          {
            name: '1000M云空间',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591960867675&di=97b931661cf964c8f12d5ee01ab73c9d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F27%2F8f751bb65494c10cb1378282edde7599.jpg'
          }
        ],
        winning: [
          { id: '1232324341', prizeName: '100M云空间_01' },
          { id: '1232324342', prizeName: '100M云空间_02' },
          { id: '1232324343', prizeName: '100' },
          { id: '1232324344', prizeName: '100M云空间_04' },
          { id: '1232324345', prizeName: '100M云空间_05' },
          { id: '1232324346', prizeName: '100M云空间_06' }
        ],
        winningRecord: [
          { id: '1232324341', prizeName: '100M云空间_01', time: '11-07  03:08' },
          { id: '1232324342', prizeName: '100M云空间_02', time: '11-07  03:08' },
          { id: '1232324343', prizeName: '100', time: '11-07  03:08' },
          { id: '1232324344', prizeName: '100M云空间_04', time: '11-07  03:08' },
          { id: '1232324345', prizeName: '100M云空间_05', time: '11-07  03:08' },
          { id: '1232324346', prizeName: '100M云空间_06', time: '11-07  03:08' }
        ]
      }
    }
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color: #FF6412')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    handleStart () {
      if (this.timer) { return false }
      let speed = 200
      let count = 0
      const winCount = 70 + this.winIndex
      const startFn = () => {
        count++
        this.activeIndex = this.activeIndex === 9 ? 0 : this.activeIndex + 1
        if (count === winCount) {
          clearTimeout(this.timer)
          this.timer = null
          setTimeout(() => {
            this.winShow = true
          }, 500)
          return
        }
        if (count < 16) {
          speed = speed - 10
        } else if (count > 60) {
          speed = speed + 15
        }
        this.timer = setTimeout(startFn, speed)
      }
      this.timer = setTimeout(startFn, speed)
    },
    showPopub (type) {
      this.show = true
      this.showType = type
    },
    hiddenPopup () {
      this.show = false
    },
    hiddenWinPopup () {
      this.winShow = false
      this.activeIndex = -1
    },
    hiddenNotWinPopup () {
      this.notWinShow = false
    },
    goToAddress () {
      this.$router.push({ path: 'address', query: { plan: 'private' } })
    }
  }
}
</script>

<style lang="less">
.p-lucky-draw {
  .button {
    color: #B0340C;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    background-image: linear-gradient(180deg, #FFE077 0%, #FFC541 100%);
  }
  .banner {
    width: 375px;
    height: 97px;
    color: #FFFCF2;
    background-image: url(../assets/luckyDraw/sweepstakes-banner.png);
    background-size: 375px 123px;
    padding-top: 26px;
    .title {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      line-height: 42px;
    }
    p {
      font-size: 16px;
      text-align: center;
      line-height: 42px;
    }
  }
  .main {
    width: 100%;
    background: #FF6412;
    width: 335px;
    height: 381px;
    overflow: hidden;
    background-image: url(../assets/luckyDraw/turntable.png);
    background-size: 335px 381px;
    margin: 0 20px;
    position: relative;
    .my-swipe {
      height: 20px;
      margin-top: 24px;
      margin-left: 64px;
      .van-swipe-item {
        height: 20px;;
        color: #FFE84C;;
        font-size: 12px;
        line-height: 20px;
        & > span:nth-child(even) {
          color: #ffffff;
        }
      }
    }
    .prize-wrap {
      width: 92px;
      height: 63px;
      font-size: 10px;
      color: #333333;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      position: absolute;
      font-weight: bold;
      border-radius: 10px;
      .prize-img {
        width: 50px;
        height: 33px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        margin-top: 7px;
        margin-bottom: 4px;
      }
    }
    .prize-position(@top, @left) {
      top: @top;
      left: @left;
    }
    .prize-wrap:nth-child(2) { .prize-position(60px, 25px); }
    .prize-wrap:nth-child(3) { .prize-position(60px, 122px); }
    .prize-wrap:nth-child(4) { .prize-position(60px, 219px); }
    .prize-wrap:nth-child(5) { .prize-position(134px, 219px); }
    .prize-wrap:nth-child(6) { .prize-position(208px, 219px); }
    .prize-wrap:nth-child(7) { .prize-position(282px, 219px); }
    .prize-wrap:nth-child(8) { .prize-position(282px, 122px); }
    .prize-wrap:nth-child(9) { .prize-position(282px, 25px); }
    .prize-wrap:nth-child(10) { .prize-position(208px, 25px); }
    .prize-wrap:nth-child(11) { .prize-position(134px, 25px); }
    .active-prize {
      color: #ffffff;
      background-image: linear-gradient(0deg, #eebd89, #d13abd);
    }
    .lucky-btn {
      width: 92px;
      height: 120px;
      position: absolute;
      top: 134px;
      left: 122px;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 16px;
      .start {
        font-size: 25px;
        font-weight: bold;
        line-height: 32px;

      }
      .text {
        font-size: 11px;
        line-height: 16px;
        margin-top: 10px;
      }
      .count {
        color: #FFE077;
        font-size: 14px;
        font-weight: bold;
        margin-top: 5px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 20px;
    .btn {
      .button;
      line-height: 50px;
      width: 160px;
      height: 50px;
      border-radius: 25px;
      margin: 0 8px;
    }
  }
  .van-popup {
    overflow: hidden;
    background: transparent;
  }
  .rule-popup {
    .van-popup {
      width: 295px;
      height: 404px;
    }
    .rule {
      width: 295px;
      height: 338px;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      h1 {
        color: #333333;
        font-size: 18px;
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
      }
      .scroll-content {
        color: #666666;
        font-size: 12px;
        line-height: 21px;
        width: 255px;
        margin: 0 auto;
        overflow: scroll;
        &::-webkit-scrollbar-track-piece {
          background-color: rgba(0, 0, 0, 0);
          border-left: 1px solid rgba(0, 0, 0, 0);
        }
        &::-webkit-scrollbar {
          width: 4px;
          height: 0px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          background-clip: padding-box;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          min-height: 28px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.1);
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
      }
      .rule-content {
        .scroll-content;
        height: 252px;
        margin-top: 28px;
      }
      .winning-content {
        .scroll-content;
        height: 196px;
        margin-top: 20px;
        padding: 0;
        .item {
          display: flex;
          justify-content: space-between;
          padding-bottom: 10px;
          &:not(:last-child)  {
            margin-bottom: 10px;
            border-bottom: 1px solid #eeeeee;
          }
        }
        .empty {
          font-size: 12px;
          line-height: 196px;
          text-align: center;
        }
      }
      .btn-wrap {
        display: flex;
        justify-content: center;
        padding-top: 20px;
        .btn {
          .button;
          width: 120px;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          margin: 0 8px;
        }
        .cancel {
          color: #666666;
          background: #eeeeee;
        }
      }
    }
    .close-wrap {
      padding-top: 30px;
      .close-btn {
        width: 34px;
        height: 34px;
        border: 1px solid #fff;
        border-radius: 100%;
        position: relative;
        margin: 0 auto;
        .btn-line(@rotate) {
          content: '';
          width: 20px;
          height: 1px;
          background: #fff;
          position: absolute;
          top: 16px;
          left: 7px;
          transform: rotate(@rotate);
        }
        &::before { .btn-line(45deg) }
        &::after { .btn-line(134deg) }
      }
    }
  }
  .win-popup {
    text-align: center;
    .title1 {
      font-size: 18px;
      line-height: 19px;
      font-weight: bold;
      color: #ffffff;
    }
    .title2 {
      font-size: 30px;
      font-weight: bold;
      color: #FFCA51;
      margin-top: 10px;
    }
    .coloured-ribbon {
      width: 280px;
      height: 280px;
      background-image: url(../assets/luckyDraw/coloured-ribbon.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: -14px;
      .img {
        width: 180px;
        height: 120px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        margin: 0 auto;
      }
    }
    .btn-wrap {
      display: flex;
      margin-top: 8px;
      .btn  {
        .button;
        width: 120px;
        height: 50px;
        line-height: 50px;
        margin: 0 8px;
        border-radius: 25px;
      }
      .cancel {
        color: #ffffff;
        box-sizing: border-box;
        border: 1px solid #ffffff;
        background: transparent;
      }
    }
  }
  .not-win-popup {
    text-align: center;
    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #FFFFFF;
    }
    img {
      width: 180px;
      height: 120px;
      margin: 30px 0;
    }
    .btn {
      .button;
      width: 255px;
      line-height: 50px;;
      height: 50px;
      border-radius: 25px;
    }
  }
}
</style>
