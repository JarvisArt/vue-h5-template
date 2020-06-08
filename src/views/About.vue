<template>
  <div>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"  />
      <van-goods-action-icon icon="cart-o" text="购物车"  />
      <van-goods-action-icon icon="shop-o" text="店铺"  />
      <van-goods-action-button
        type="danger"
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
export default {
  name: 'About',
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  }
}
</script>
