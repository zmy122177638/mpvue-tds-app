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
            <img
              src="../../../static/img/user_type.png"
              class="my-status"
              alt=""
            >
          </div>
        </div>
        <div class="my-info-right">
          <div class="info-tag">店</div>
          <div class="info-status">Lv.4</div>
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
            @click="navigaToOrder()"
          >查看全部订单</div>
        </div>
        <div class="my-order-model">
          <div class="my-order-item">
            <div class="item-icon"></div>
            <div class="item-name">代付款</div>
          </div>
          <div class="my-order-item">
            <div class="item-icon"></div>
            <div class="item-name">代发货</div>
          </div>
          <div class="my-order-item">
            <div class="item-icon"></div>
            <div class="item-name">代收货</div>
          </div>
          <div class="my-order-item">
            <div class="item-icon"></div>
            <div class="item-name">已完成</div>
          </div>
          <div class="my-order-item">
            <div class="item-icon"></div>
            <div class="item-name">退款退货</div>
          </div>
        </div>
      </div>

      <!-- 我的团队 -->
      <div class="my-team">
        <div class="my-team-title">我的团队</div>
        <div class="my-team-list">
          <div class="my-team-item">
            <div class="item-value">36</div>
            <div class="item-key">团长数量</div>
          </div>
          <div class="my-team-item">
            <div class="item-value">36</div>
            <div class="item-key">团队收益</div>
          </div>
        </div>
      </div>

      <!-- nav -->
      <div class="my-nav">
        <div class="my-nav-item">
          <div class="item-left">
            <div class="item-icon"></div>
            <div class="item-title">我的邀请码</div>
          </div>
          <div class="item-right">
            <div class="item-fn-txt">DA31EW</div>
            <div class="item-fn-icon"></div>
          </div>
        </div>
        <div class="my-nav-item">
          <div class="item-left">
            <div class="item-icon"></div>
            <div class="item-title">我的拼团</div>
          </div>
        </div>
        <div class="my-nav-item">
          <div class="item-left">
            <div class="item-icon"></div>
            <div class="item-title">我的拼团</div>
          </div>
        </div>
        <div class="my-nav-item">
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
            <div class="item-title">帮助中心</div>
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
  data () {
    return {}
  },
  mounted () {

  },

  methods: {
    navigaToOrder () {
      wx.navigateTo({
        url: './../sub_my/my_order/main?type=all'
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
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  // 用户信息
  .my-info-box {
    background: linear-gradient(
      180deg,
      rgba(255, 102, 102, 1) 0%,
      rgba(255, 131, 111, 1) 100%
    );
    .my-info {
      display: flex;
      align-items: center;
      padding: 10px 20px 20px;
      .my-info-left {
        display: flex;
        flex: 1;
        align-items: center;
        overflow: hidden;
      }
      .my-img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-right: 15px;
      }
      .my-show {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .my-name {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .my-status {
          width: 82px;
          height: 24px;
        }
      }
      .my-info-right {
        width: 60px;
        height: 18px;
        border: 1px solid #ffffff;
        border-radius: 17px;
        display: flex;
        align-items: center;
        align-self: flex-end;
        .info-tag {
          border-radius: 50%;
          width: 18px;
          height: 18px;
          line-height: 18px;
          font-size: 15px;
          background-color: #ffffff;
          color: #ff6666;
        }
        .info-status {
          flex: 1;
          font-size: 15px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
    .my-upgrade {
      margin: 0 15px;
      background: linear-gradient(
        179deg,
        rgba(82, 82, 82, 1) 0%,
        rgba(48, 48, 48, 1) 100%
      );
      box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.25);
      border-radius: 6px 6px 0px 0px;
      padding: 12px 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .upgrade-left {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .my-upgrade-icon {
        width: 29px;
        height: 29px;
        border: 1px solid #ffffff;
        margin-right: 10px;
        border-radius: 50%;
      }
      .my-upgrade-ct {
        .my-upgrade-t {
          font-size: 15px;
          color: #ffffff;
        }
        .my-upgrade-f {
          font-size: 12px;
          color: #d9d9d9;
          font-weight: 300;
        }
      }
      .my-upgrade-btn {
        width: 83px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #ffffff;
        font-size: 12px;
        background-color: #ff6666;
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
