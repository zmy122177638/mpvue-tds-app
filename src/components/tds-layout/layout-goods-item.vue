<template>
  <div class="goods-item">

    <!-- 标题 -->
    <div class="goods-title">
      <div class="title-left">商品信息</div>
    </div>

    <!-- 订单 -->
    <div class="goods-num">订单号： 2018464654915374</div>

    <!-- 商品信息 -->
    <div class="order-goods">
      <img
        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg"
        class="goods-img"
        alt=""
      >
      <div class="goods-info">
        <div class="goods-name">ins风全棉纯棉床上用品四件套宿舍床单人三件套儿童网...</div>
        <div class="goods-type">已选：儿童床【床单款三件套】- 适用
          120×150被子</div>
      </div>
    </div>

    <!-- 流信息 -->
    <div class="goods-pipe">
      <div class="goods-pipe-item">
        <div class="item-key">购买数量</div>
        <div class="item-value">1件</div>
      </div>
      <div class="goods-pipe-item">
        <div class="item-key">配送方式</div>
        <div class="item-value">快递(包邮)</div>
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
        >￥49.00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
        color: #B1B1B1;
      }
    }
  }
}
</style>
