<template>
  <div class="goods-item">

    <!-- 标题 -->
    <div class="goods-title">
      <div class="title-left">商品信息</div>
    </div>

    <!-- 订单 -->
    <div
      class="goods-num"
      v-if="item.order_no"
    >订单号： {{item.order_no}}</div>

    <!-- 商品信息 -->
    <div class="order-goods">
      <img
        :src="item.goods_image_url"
        class="goods-img"
        alt=""
      >
      <div class="goods-info">
        <div class="goods-name">{{item.goods_name}}</div>
        <div class="goods-type">已选：{{item.spec_attr}}</div>
      </div>
    </div>

    <!-- 流信息 -->
    <div class="goods-pipe">
      <div class="goods-pipe-item">
        <div class="item-key">购买数量</div>
        <div class="item-value">{{item.num}}{{item.unit}}</div>
      </div>
      <div class="goods-pipe-item">
        <div class="item-key">配送方式</div>

        <div
          class="item-value"
          v-if="item.noDelivery"
        >{{item.noDelivery}}</div>

        <div
          class="item-value"
          v-else-if="item.postage <= 0"
        >快递(包邮)</div>
        <div
          class="item-value"
          v-else
        >快递(<text style="color:#FF0A0A">￥{{item.postage}}</text>)</div>
      </div>
      <div class="goods-pipe-item">
        <div class="item-key">支付方式</div>
        <div class="item-value">微信支付</div>
      </div>
      <div class="goods-pipe-item">
        <div class="item-key">金额合计</div>
        <div
          class="item-value"
          style="color:#FF0A0A"
        >￥{{item.amount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-item {
  margin-top: 15px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  .goods-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .title-left {
      font-size: 18px;
      color: #282828;
      font-weight: bold;
    }
  }
  .goods-num {
    font-size: 14px;
    color: #656565;
  }

  .order-goods {
    display: flex;
    align-items: center;
    padding: 15px 0 20px;
    border-bottom: 1px solid #f6f8fa;
    .goods-img {
      width: 90px;
      height: 90px;
      border-radius: 6px;
      display: block;
      margin-right: 15px;
      background: url('../../../static/images/CommodityNull.png') no-repeat;
      background-size: 100% 100%;
    }
    .goods-info {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .goods-name {
        font-size: 16px;
        color: #282828;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .goods-type {
        margin-top: 9px;
        font-size: 12px;
        color: #656565;
      }
    }
  }

  .goods-pipe {
    .goods-pipe-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0 5px;
      .item-key {
        font-size: 15px;
        color: #282828;
      }
      .item-value {
        font-size: 15px;
        color: #b1b1b1;
      }
    }
  }
}
</style>
