<template>
  <section class="my-container">
    <!-- 用户信息 -->
    <div class="my-info-box">
      <div class="my-info">
        <div class="my-info-left">
          <img
            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg"
            class="my-img"
            alt=""
          >
          <div class="my-show">
            <div class="my-name">王多多</div>
            <div class="my-status">普通用户</div>
          </div>
        </div>
      </div>
      <div class="my-upgrade">
        <div class="upgrade-left">
          <div class="my-upgrade-icon"></div>
          <div class="my-upgrade-ct">
            <div class="my-upgrade-t">成为团大师尊享团长</div>
            <div class="my-upgrade-f">单单享优惠，笔笔赚佣金</div>
          </div>
        </div>
        <div class="my-upgrade-btn">立即开通</div>
      </div>
    </div>

    <scroll-view
      scroll-y
      class="scroll-content"
    >
      <!-- 活动 -->
      <div class="my-activity">
        <div class="my-activity-item">
          <div class="item-icon"></div>
          <div class="item-cont">
            <div class="item-title">签到有奖</div>
            <div class="item-point">签到赚积分</div>
          </div>
        </div>
        <div class="my-activity-item">
          <div class="item-icon"></div>
          <div class="item-cont">
            <div class="item-title">我的积分</div>
            <div class="item-point">积分抽奖买买买</div>
          </div>
        </div>
      </div>

      <!-- 订单 -->
      <div class="my-order-box">
        <div class="my-order-title">
          <div class="my-order-hh">我的订单</div>
          <div
            class="my-order-all"
            @click="navigaToOrder(0)"
          >查看全部订单</div>
        </div>
        <div class="my-order-model">
          <div
            class="my-order-item"
            @click="navigaToOrder(1)"
          >
            <div class="item-icon"></div>
            <div class="item-name">代付款</div>
          </div>
          <div
            class="my-order-item"
            @click="navigaToOrder(2)"
          >
            <div class="item-icon"></div>
            <div class="item-name">代发货</div>
          </div>
          <div
            class="my-order-item"
            @click="navigaToOrder(3)"
          >
            <div class="item-icon"></div>
            <div class="item-name">代收货</div>
          </div>
          <div
            class="my-order-item"
            @click="navigaToOrder(4)"
          >
            <div class="item-icon"></div>
            <div class="item-name">已完成</div>
          </div>
          <div
            class="my-order-item"
            @click="navigaToOrder(5)"
          >
            <div class="item-icon"></div>
            <div class="item-name">退款退货</div>
          </div>
        </div>
      </div>

      <!-- 我的团队 -->
      <!-- <div class="my-team">
        <div class="my-team-title">我的团队</div>
        <div class="my-team-list">
          <div
            class="my-team-item"
            @click="navigaToTeam(0)"
          >
            <div class="item-value">36</div>
            <div class="item-key">团长数量</div>
          </div>
          <div
            class="my-team-item"
            @click="navigaToTeam(1)"
          >
            <div class="item-value">36</div>
            <div class="item-key">团队收益</div>
          </div>
        </div>
      </div> -->

      <!-- nav -->
      <div class="my-nav">
        <!-- <div class="my-nav-item">
          <div class="item-left">
            <div class="item-icon"></div>
            <div class="item-title">我的邀请码</div>
          </div>
          <div class="item-right">
            <div class="item-fn-txt">DA31EW</div>
            <div class="item-fn-icon"></div>
          </div>
        </div> -->
        <div class="my-nav-item">
          <div class="item-left">
            <div class="item-icon"></div>
            <div class="item-title">我的拼团</div>
          </div>
        </div>
        <div
          class="my-nav-item"
          @click="navigaToAddress()"
        >
          <div class="item-left">
            <div class="item-icon"></div>
            <div class="item-title">收货地址</div>
          </div>
        </div>
        <div class="my-nav-item">
          <div class="item-left">
            <div class="item-icon"></div>
            <div class="item-title">在线客服</div>
          </div>
        </div>
        <div class="my-nav-item">
          <div class="item-left">
            <div class="item-icon"></div>
            <div class="item-title">系统设置</div>
          </div>
        </div>
      </div>

    </scroll-view>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {

  },

  methods: {
    navigaToOrder(current) {
      wx.navigateTo({
        url: './../sub_my/my_order/main?current=' + current
      })
    },
    navigaToTeam(current) {
      wx.navigateTo({
        url: './../sub_my/my_team/main?current=' + current
      })
    },
    navigaToAddress() {
      wx.navigateTo({
        url: './../sub_my/my_address/main'
      })
    }
  }

}
</script>

<style scoped lang="scss">
img {
  display: block;
}
.my-container {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .scroll-content {
    flex: 1;
    height: 100%;
    background-color: #ffffff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  // 用户信息
  .my-info-box {
    background: #ff6666;
    .my-info {
      display: flex;
      align-items: center;
      padding: 0px 15px 20px;
      background-color: #ffffff;
      border-radius: 0 0 12px 12px;
      .my-info-left {
        display: flex;
        flex: 1;
        align-items: center;
        overflow: hidden;
      }
      .my-img {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .my-show {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .my-name {
          font-size: 16px;
          font-weight: bold;
          color: #282828;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .my-status {
          margin-top: 14.5px;
          width: 72px;
          height: 18px;
          line-height: 18px;
          background-color: #5c5050;
          border-radius: 11px;
          color: #ffffff;
          font-size: 12px;
          text-align: center;
        }
      }
    }
    .my-upgrade {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .upgrade-left {
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      .my-upgrade-icon {
        width: 34px;
        height: 34px;
        border: 1px solid #ffffff;
        margin-right: 15px;
        border-radius: 50%;
        align-self: flex-start;
      }
      .my-upgrade-ct {
        flex: 1;
        overflow: hidden;
        .my-upgrade-t {
          font-size: 18px;
          color: #ffffff;
          font-weight: bold;
        }
        .my-upgrade-f {
          margin-top: 3px;
          font-size: 12px;
          color: #ffffff;
        }
      }
      .my-upgrade-btn {
        width: 83px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #ff6666;
        font-size: 12px;
        background-color: #ffffff;
        border-radius: 12.5px;
      }
    }
  }

  // 活动
  .my-activity {
    display: flex;
    padding: 30px 0;
    align-items: center;
    .my-activity-item {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #f2f2f2;
      &:nth-last-child(1) {
        border: none;
      }
      .item-icon {
        width: 18px;
        height: 18px;
        background-color: #ff6666;
        margin-right: 15px;
      }
      .item-cont {
        .item-title {
          font-size: 15px;
          color: #282828;
        }
        .item-point {
          font-size: 12px;
          color: #b1b1b1;
        }
      }
    }
  }

  // 我的订单
  .my-order-box {
    padding: 0 15px;
    .my-order-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .my-order-hh {
        font-size: 15px;
        color: #282828;
        font-weight: bold;
      }
      .my-order-all {
        font-size: 12px;
        color: #b1b1b1;
      }
    }
    .my-order-model {
      padding: 20px 0;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      align-items: center;
      .my-order-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .item-icon {
          width: 22px;
          height: 22px;
          background-color: #ff6666;
          margin-bottom: 10px;
        }
        .item-name {
          font-size: 12px;
          color: #282828;
        }
      }
    }
  }

  // 我的团队
  .my-team {
    padding: 0 15px 30px;
    .my-team-title {
      font-size: 15px;
      color: #282828;
      font-weight: bold;
    }
    .my-team-list {
      margin-top: 15px;
      padding: 15px 0;
      display: flex;
      align-items: center;
      background-color: #f6f8fa;
      border-radius: 6px;
      .my-team-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid #dfdfdf;
        justify-content: center;
        &:nth-last-child(1) {
          border: none;
        }
        .item-value {
          font-size: 22px;
          color: #ff6666;
        }
        .item-key {
          font-size: 12px;
          color: #282828;
        }
      }
    }
  }

  // 我的导航
  .my-nav {
    padding: 0 15px;
    .my-nav-item {
      box-sizing: border-box;
      padding: 15px;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-left {
        width: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
        .item-icon {
          width: 20px;
          height: 20px;
          background-color: #ff6666;
          margin-right: 20px;
        }
        .item-title {
          font-size: 15px;
          color: #282828;
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        .item-fn-txt {
          font-size: 15px;
          color: #b1b1b1;
        }
        .item-fn-icon {
          margin-left: 10px;
          width: 14px;
          height: 15px;
          background-color: #ff6666;
        }
      }
    }
  }
}
</style>
