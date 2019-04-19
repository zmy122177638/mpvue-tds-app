<template>
  <section class="unpaid-container">
    <scroll-view
      scroll-y
      class="scroll-view"
    >
      <div class="unpaid-content">
        <!-- 商品信息 -->
        <Layout-goods-item></Layout-goods-item>
        <!-- <Layout-buyer-item></Layout-buyer-item>
        <Layout-logistics-item></Layout-logistics-item> -->

        <div class="section-item">
          <div class="section-title">
            <div class="title-left">收货信息</div>
          </div>
          <div class="receiver-info">
            <div class="receiver-icon"></div>
            <div class="receiver-name">薛之谦&nbsp;&nbsp;&nbsp;13013240009</div>
            <div class="receiver-location">上海市徐汇区华山路1954号（上海交通)上海市徐汇区华山路1954号（上海交通)</div>
          </div>
        </div>

        <div class="section-item">
          <div class="remarks-box">
            <div class="box-label">备注</div>
            <div class="box-value">请放到小区丰巢快递柜！巢快递柜！谢谢！请放到小区丰巢快递柜！谢谢！</div>
          </div>
        </div>

      </div>
    </scroll-view>
    <!-- 提示时间 -->
    <div class="unpaid-timer">剩余支付时间 <span class="unpaid-strong">03:18:32</span></div>
    <!-- 支付 -->
    <div class="unpaid-footer">
      <div class="footer-cout">
        <span class="cout-key">合计</span>
        <span class="cout-value">￥ <span>49.00</span></span>
      </div>
      <div class="footer-btn">立即支付</div>
    </div>
  </section>
</template>

<script>
import LayoutGoodsItem from '@/components/tds-layout/layout-goods-item'
import LayoutBuyerItem from '@/components/tds-layout/layout-buyer-item'
import LayoutLogisticsItem from '@/components/tds-layout/layout-logistics-item'
export default {
  components: {
    LayoutGoodsItem,
    LayoutBuyerItem,
    LayoutLogisticsItem
  },
  data () {
    return {}
  },

  methods: {}
}
</script>

<style scoped lang="scss">
.unpaid-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  .scroll-view {
    flex: 1;
    overflow: scroll;
  }
  .unpaid-content {
    flex: 1;
    padding: 0 15px 30px;
  }

  .section-item {
    margin-top: 15px;
    padding: 15px;
    background-color: #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    .section-title {
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
    // 信息
    .receiver-info {
      padding-left: 30px;
      position: relative;
      .receiver-icon {
        width: 15px;
        height: 15px;
        background-color: rgb(233, 174, 14);
        position: absolute;
        left: 0;
        top: 4px;
      }
      .receiver-name {
        font-size: 15px;
        color: #282828;
      }
      .receiver-location {
        font-size: 15px;
        color: #282828;
      }
    }
  }

  .remarks-box {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #282828;
    .box-value {
      margin-left: 15px;
      flex: 1;
    }
  }

  // 剩余时间
  .unpaid-timer {
    height: 44px;
    line-height: 44px;
    background-color: #ffefef;
    font-size: 16px;
    color: #282828;
    text-align: center;
    .unpaid-strong {
      color: #ff6666;
    }
  }

  // zhifu
  .unpaid-footer {
    display: flex;
    .footer-cout {
      flex: 1;
      height: 49px;
      line-height: 49px;
      padding-left: 15px;
      background-color: #ffffff;
      .cout-key {
        font-size: 12px;
        color: #ff0a0a;
      }
      .cout-value {
        font-size: 14px;
        color: #ff0a0a;
        span {
          font-size: 22px;
          font-weight: bold;
        }
      }
    }
    .footer-btn {
      height: 49px;
      line-height: 49px;
      width: 154px;
      text-align: center;
      background-color: #ff6666;
      color: #ffffff;
      font-size: 18px;
    }
  }
}
</style>
