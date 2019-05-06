<template>
  <section class="my-container">
    <!-- 开店 -->
    <kaidianYouliBtn
      :isYqylShow="true"
      :userIsVip="userInfo.type"
      @click-btn="handleClickBtn"
    >
    </kaidianYouliBtn>
    <!-- 用户信息 -->
    <div :class="['my-info-box',{'vip':userInfo.vip_level}]">
      <div :class="['my-info',{'vip':userInfo.vip_level}]">
        <div class="my-info-left">
          <img
            :src="userInfo.headimgurl"
            class="my-img"
            alt=""
          >
          <div class="my-show">
            <div class="my-name">{{userInfo.nickname}}</div>
            <div
              class="my-status"
              v-if="!userInfo.vip_level"
            >普通用户</div>
            <div
              :class="['my-status-icon','vip0'+userInfo.vip_level]"
              v-else
            ></div>
          </div>
        </div>
      </div>
      <!-- 升级 -->
      <div
        class="my-upgrade"
        v-if="!infoData.vip_level"
      >
        <div class="upgrade-left">
          <img
            class="my-upgrade-icon"
            src="../../../static/images/LOGO3.png"
          />
          <div class="my-upgrade-ct">
            <div class="my-upgrade-t">成为团大师尊享团长</div>
            <div class="my-upgrade-f">自购省钱，开团赚钱</div>
          </div>
        </div>
        <div
          class="my-upgrade-btn"
          @click="navigateToGift"
        >立即开通</div>
      </div>
      <!-- progress -->
      <div
        class="progress-container"
        v-else
      >
        <div class="progress-assert">
          <div class="progress-count">上月店铺等级<span class="progress-grade">{{infoData.current_month_shop.level}}</span></div>
        </div>
        <div class="progress-box">
          <div class="progress-pack">
            <div
              class="progress-active"
              :style="'width:'+infoData.current_month_shop.level_current_percent+'%'"
            >
              <img
                :src="infoData.headimgurl"
                class="user-avator"
                alt=""
              >
              <div class="user-money">￥{{infoData.current_month_shop.amount}}</div>
            </div>
            <div class="progress-grade-item">
              <div class="grade-txt">Lv.1</div>
            </div>
            <div class="progress-grade-item">
              <div class="grade-txt">Lv.2</div>
            </div>
            <div class="progress-grade-item">
              <div class="grade-txt">Lv.3</div>
            </div>
            <div class="progress-grade-item">
              <div class="grade-txt">Lv.4</div>
            </div>
            <div class="progress-grade-item">
              <div class="grade-txt">Lv.5</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <scroll-view
      scroll-y
      class="scroll-content"
    >
      <!-- 活动 -->
      <div class="my-activity">
        <div
          class="my-activity-item"
          @click="handlePoint()"
        >
          <img
            class="item-icon"
            src="../../../static/images/Qiandao_iCon.png"
          >
          <div class="item-cont">
            <div class="item-title">签到有奖</div>
            <div class="item-point">签到赚积分</div>
          </div>
        </div>
        <div
          class="my-activity-item"
          @click="handlePoint()"
        >
          <img
            class="item-icon"
            src="../../../static/images/Jifen_iCon.png"
          >
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
            @click="navigaToOrder('all')"
          >查看全部订单</div>
        </div>
        <div class="my-order-model">
          <div
            class="my-order-item"
            @click="navigaToOrder('unpaid')"
          >
            <div class="img-figure">
              <span
                class="item-num"
                v-if="infoData.order_pending.unpaid"
              >{{infoData.order_pending.unpaid}}</span>
              <img
                class="item-icon"
                src="../../../static/images/Pay_iCon.png"
              >
            </div>

            <div class="item-name">待付款</div>
          </div>
          <div
            class="my-order-item"
            @click="navigaToOrder('paid')"
          >
            <div class="img-figure">
              <span
                class="item-num"
                v-if="infoData.order_pending.paid"
              >{{infoData.order_pending.paid}}</span>
              <img
                class="item-icon"
                src="../../../static/images/Shipment_iCon.png"
              >
            </div>
            <div class="item-name">待发货</div>
          </div>
          <div
            class="my-order-item"
            @click="navigaToOrder('shipped')"
          >
            <div class="img-figure">
              <span
                class="item-num"
                v-if="infoData.order_pending.shipped"
              >{{infoData.order_pending.shipped}}</span>
              <img
                class="item-icon"
                src="../../../static/images/Collection_iCon.png"
              >
            </div>
            <div class="item-name">待收货</div>
          </div>
          <div
            class="my-order-item"
            @click="navigaToOrder('finish')"
          >
            <div class="img-figure">
              <!-- <span class="item-num">{{infoData.order_pending.finish}}</span> -->
              <img
                class="item-icon"
                src="../../../static/images/Completed_iCon.png"
              >
            </div>
            <div class="item-name">已完成</div>
          </div>
          <div
            class="my-order-item"
            @click="navigaToOrder('refund')"
          >
            <div class="img-figure">
              <span
                class="item-num"
                v-if="infoData.order_pending.refund"
              >{{infoData.order_pending.refund}}</span>
              <img
                class="item-icon"
                src="../../../static/images/Refund_iCon.png"
              >
            </div>
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
        <div
          class="my-nav-item"
          @click="handlePoint()"
        >
          <div class="item-left">
            <img
              class="item-icon"
              src="../../../static/images/WodePintuan_iCon.png"
            >
            <div class="item-title">我的拼团</div>
          </div>
        </div>
        <div
          class="my-nav-item"
          @click="navigaToAddress()"
        >
          <div class="item-left">
            <img
              class="item-icon"
              src="../../../static/images/Address_iCon.png"
            >
            <div class="item-title">收货地址</div>
          </div>
        </div>
        <button
          class="my-nav-item"
          open-type="contact"
        >
          <div class="item-left">
            <img
              class="item-icon"
              src="../../../static/images/ContactUs_iCon.png"
            >
            <div class="item-title">在线客服</div>
          </div>
        </button>
        <div
          class="my-nav-item"
          @click="navigaToSetting()"
        >
          <div class="item-left">
            <img
              class="item-icon"
              src="../../../static/images/Setting_iCon.png"
            >
            <div class="item-title">系统设置</div>
          </div>
        </div>
      </div>
    </scroll-view>
    <!-- 认证弹窗 -->
    <Tds-attestation-popup v-model="isShowAttestPopup"></Tds-attestation-popup>
  </section>
</template>

<script>
import kaidianYouliBtn from '@/components/kaidianYouliBtn/KaidianYouliBtn'
import TdsAttestationPopup from '@/components/tds-popup/tds-attestation-popup.vue'
export default {
  components: {
    kaidianYouliBtn,
    TdsAttestationPopup
  },
  data() {
    return {
      infoData: {
        // 订单数
        order_pending: {},
        // 本月销售数据
        current_month_shop: {}
      }
    }
  },
  onShow(options) {
    this.getMyInfo();
  },
  computed: {
    // 用户信息
    userInfo() {
      return this.$store.state.userInfo
    },
    // 分享人信息
    sharerInfo() {
      return this.$store.state.sharerInfo
    },
    // 是否完成开店任务，否则必须实名制
    isShowAttestPopup() {
      return (this.$store.state.userInfo.type && !this.$store.state.userInfo.is_real_check)
    }
  },
  methods: {
    // 点击邀请有礼按钮响应，开店有礼不响应，组件内直接跳转页面
    handleClickBtn() {
      console.log('父组件响应')
    },
    // 获取用户信息
    async getMyInfo() {
      await this.$http.request('get', 'user/userCenterWechat').then(({ code, resource }) => {
        if (code === 200) {
          this.infoData = resource;
        } else {
          mpvue.showToast({
            title: '获取失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
      await this.$http.request('get', 'user/getBaseInfo', { uid: this.infoData.id }, { ISLOADINGHIDE: true }).then(({ code, resource }) => {
        // 重新存入
        if (code === 200) {
          // 重新写入
          console.log(resource)
          // 如果分享人id和用户id是一致，同步信息
          if (this.sharerInfo.id === resource.id) {
            this.$store.commit('writeSharerInfo', { sharerInfo: { ...resource } })
          }
          this.$store.commit('writeUserInfo', { userInfo: { ...resource } })

          // 是否认证
        } else {
          mpvue.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    navigateToGift() {
      mpvue.navigateTo({
        url: '../openShop/main'
      })
    },
    navigaToOrder(current) {
      mpvue.navigateTo({
        url: './../sub_my/my_order/main?current=' + current
      })
    },
    navigaToTeam(current) {
      mpvue.navigateTo({
        url: './../sub_my/my_team/main?current=' + current
      })
    },
    navigaToAddress() {
      mpvue.navigateTo({
        url: './../sub_my/my_address/main'
      })
    },
    navigaToSetting() {
      mpvue.navigateTo({
        url: './../sub_my/my_setting/main'
      })
    },
    handlePoint() {
      mpvue.showToast({
        title: '暂未开放',
        icon: 'none',
        duration: 2000
      })
    }
  }

}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
  background-color: transparent;
}
.img-figure {
  position: relative;
}
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
  }

  // 用户信息
  .my-info-box {
    background: #ff6666;
    min-height: 160px;
    &.vip {
      background-color: #ffffff;
      position: relative;
      z-index: 12;
      border-radius: 0px 0px 12px 12px;
      box-sizing: border-box;
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.05);
    }
    .my-info {
      display: flex;
      align-items: center;
      padding: 0px 15px 20px;
      background-color: #ffffff;
      border-radius: 0 0 12px 12px;
      &.vip {
        padding: 0px 15px 0px;
      }
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
        display: block;
        background: url('../../../static/images/AvatarNull.png') no-repeat;
        background-size: 100% 100%;
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
        margin-right: 15px;
        border-radius: 50%;
        display: block;
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

  // progress
  .progress-container {
    padding: 20px 15px;
    .progress-assert {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .progress-count {
        font-size: 10px;
        color: #282828;
        font-weight: bold;
        .progress-grade {
          color: #ff6666;
          font-weight: normal;
        }
      }
    }
    .progress-box {
      padding: 22px 0;
      .progress-pack {
        height: 8px;
        background-color: #f2f2f2;
        border-radius: 4.5px;
        padding: 0 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .progress-active {
          transition: all 0.3s ease-out;
          width: 0%;
          height: 8px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-radius: 4.5px;
          background: rgba(255, 102, 102, 1);
          box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
          .user-avator {
            width: 22px;
            height: 22px;
            box-sizing: border-box;
            border: 2px solid #ffffff;
            border-radius: 50%;
            position: absolute;
            right: -11px;
            top: 50%;
            margin-top: -11px;
            box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
            background: url('../../../static/images/AvatarNull.png') no-repeat;
            background-size: 100% 100%;
          }
          .user-money {
            font-size: 10px;
            color: #ff6666;
            font-weight: bold;
            position: absolute;
            top: -28px;
            right: -14px;
          }
        }
        .progress-grade-item {
          width: 2px;
          height: 2px;
          background-color: #ffffff;
          border-radius: 50%;
          position: relative;
          .grade-txt {
            font-size: 10px;
            color: #b1b1b1;
            position: absolute;
            bottom: -28px;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
          }
        }
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
        display: block;
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
        .item-num {
          width: 15px;
          height: 15px;
          line-height: 15px;
          text-align: center;
          background-color: #ff0000;
          border-radius: 50%;
          font-size: 10px;
          color: #ffffff;
          position: absolute;
          right: -7px;
          top: -7px;
        }
        .item-icon {
          width: 22px;
          height: 22px;
          display: block;
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
      padding: 20px 15px;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      align-items: center;
      line-height: initial;
      background-color: #ffffff;
      justify-content: space-between;
      &::after {
        border: none;
      }
      .item-left {
        width: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
        .item-icon {
          width: 20px;
          height: 20px;
          display: block;
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
