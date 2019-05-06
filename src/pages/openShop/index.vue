<template>
  <section class="shop-container">
    <!-- 开店卡片 -->
    <div class="shop-card">
      <div class="shop-card-ct">
        <img
          class="card-bg"
          src="../../../static/images/OpenShop_iCon.png"
          alt=""
        >
        <div class="shop-card-box">
          <div class="card-ct-top">
            <div class="top-left">
              <img
                class="left-icon"
                src="../../../static/images/LOGO3.png"
                alt=""
              >
              <div class="left-name">团大师团长</div>
            </div>
            <div class="shop-rule">开店规则</div>
          </div>
          <div class="shop-money-box">￥<span class="shop-money">299.00</span></div>
          <div
            class="shop-btn"
            @click="openShopChange"
          >立即开店</div>
          <p class="shop-ponit">开通团大师团长，预计可节省 ￥1826</p>
        </div>
      </div>
    </div>
    <!-- 权益 -->
    <div class="equity-section">
      <div class="equity-title">团长特权</div>
      <ul class="equity-list">
        <li class="equity-item">
          <img
            class="item-icon"
            src="../../../static/images/Tequan9.png"
            alt=""
          >
          <div class="item-content">
            <div class="item-title">商品折扣</div>
            <p class="item-point">购买商品可享受最低<span class="item-strong">5折 - 9折</span>优惠价格</p>
          </div>
        </li>
        <li class="equity-item">
          <img
            class="item-icon"
            src="../../../static/images/Tequan9.png"
            alt=""
          >
          <div class="item-content">
            <div class="item-title">尊享团长特供商品</div>
            <p class="item-point">成为团大师团长可获得价值<span class="item-strong">精美开店礼包</span></p>
          </div>
        </li>
        <li class="equity-item">
          <img
            class="item-icon"
            src="../../../static/images/Tequan9.png"
            alt=""
          >
          <div class="item-content">
            <div class="item-title">邀请奖励</div>
            <p class="item-point">邀请好友成为团大师团长，可获得<span class="item-strong">70 - 166元</span></p>
          </div>
        </li>
        <li class="equity-item">
          <img
            class="item-icon"
            src="../../../static/images/Tequan9.png"
            alt=""
          >
          <div class="item-content">
            <div class="item-title">销售分成</div>
            <p class="item-point">销售团大师商品，可获得销售额<span class="item-strong">10% - 45%</span></p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      // 邀请码
      inviterId: ''
    }
  },
  onLoad(options) {
    // 传递邀请码参数 inviterId
    if (options && options.inviterId) {
      this.inviterId = options.inviterId;
    }
  },
  methods: {
    openShopChange() {
      mpvue.navigateTo({
        url: `../openGift/main${this.inviterId ? `?inviterId=${this.inviterId}` : ''}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.shop-container {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
}
.shop-card {
  padding: 15px;
  .shop-card-ct {
    width: 100%;
    box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
    border-radius: 6px;
    padding: 10px 15px 15px;
    position: relative;
    box-sizing: border-box;
    .card-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .shop-card-box {
      position: relative;
      z-index: 1;
    }
    .card-ct-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .top-left {
        display: flex;
        align-items: center;
        .left-icon {
          width: 29px;
          height: 29px;
          display: block;
          margin-right: 10px;
        }
        .left-name {
          font-size: 15px;
          color: #ffffff;
          font-weight: bold;
        }
      }
      .shop-rule {
        font-size: 12px;
        color: #ffffff;
      }
    }
    .shop-money-box {
      margin: 10px 0;
      text-align: center;
      font-size: 18px;
      color: #ffffff;
      font-family: Avenir Next;
      .shop-money {
        font-weight: bold;
        font-size: 30px;
        color: #ffffff;
        font-family: Avenir Next;
      }
    }
    .shop-btn {
      width: 140px;
      height: 29px;
      line-height: 29px;
      text-align: center;
      border-radius: 17px;
      background-color: #ffffff;
      font-size: 15px;
      color: #ff6666;
      margin: 0 auto 20px;
    }
    .shop-ponit {
      font-size: 12px;
      color: #ffffff;
    }
  }
}
.equity-section {
  .equity-title {
    padding: 15px 0 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #282828;
  }
  .equity-list {
    padding: 0 30px 40px;
    .equity-item {
      margin-bottom: 30px;
      display: flex;
      .item-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .item-content {
        flex: 1;
        overflow: hidden;
        .item-title {
          font-weight: bold;
          font-size: 15px;
          color: #282828;
          line-height: 20px;
        }
        .item-point {
          margin-top: 5px;
          font-size: 12px;
          color: #656565;
          .item-strong {
            font-size: 12px;
            color: #ff6666;
          }
        }
      }
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
