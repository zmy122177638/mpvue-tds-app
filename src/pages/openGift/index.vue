<template>
  <section class="openGift-container">
    <div class="openGift-title">选择开店礼包 ({{zhList[giftList.length-1]}}选一)</div>

    <!-- 轮播图 -->
    <div class="home_wrap">
      <swiper
        class="home_swiper"
        :previous-margin="previousMargin"
        :next-margin="nextMargin"
        :circular="circular"
        @change="handleChange($event)"
      >
        <block
          v-for="(item, index) in giftList"
          :key="index"
        >
          <swiper-item>
            <div
              :class="curIndex===index ? 'active_item' : 'item'"
              :animation="index == curIndex ? animationData : animationData2"
            >
              <img
                :src="item.goods_img_url"
                class="goods-img"
                alt=""
              >
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>

    <!-- 商品详情 -->
    <div class="openGift-content">
      <div class="openGift-goods">
        <div class="openGift-active">已选择</div>
        <div class="goods-name">
          <div>【</div>
          <div class="goods-hide">{{giftList[curIndex].goods_name}}</div>
          <div>】</div>
        </div>
        <div class="goods-detail">
          <div class="goods-absbox">
            <div class="goods-money">￥<span class="goods-m">{{giftList[curIndex].market_price}}</span></div>
            <div class="goods-txt">价值</div>
          </div>
          <!-- <p class="goods-p">{{giftList[curIndex].desc}}</p> -->
          <text class="goods-p">{{giftList[curIndex].desc}}</text>
        </div>
      </div>

      <!-- 权益 -->
      <div class="openGift-equity">
        <div class="openGift-p-title">八大特权</div>
        <div class="equity-list">
          <div
            class="equity-item"
            v-for="(item,index) in equityList"
            :key="index"
          >
            <img
              :src="item.icon"
              class="item-icon"
              alt=""
            >
            <p class="item-txt">{{item.label}}</p>
          </div>
        </div>
      </div>

      <!-- 邀请人 -->
      <div class="openGift-invite">
        <div class="openGift-p-title">我的邀请人</div>
        <div class="openGift-invite-box">

          <div
            class="invite-info"
            @click="checkoutInput"
            v-if="isShowInfo"
          >
            <img
              :src="inviteData.headimgurl"
              class="info-img"
              alt=""
            >
            <p class="info-name">{{inviteData.nickname}}</p>
          </div>

          <div
            class="invite-info"
            v-else
          >
            <input
              type="text"
              :focus="autoFocus"
              class="input-invite"
              :value="inviteNum"
              @input="(ev)=>{inviteNum = ev.target.value}"
              placeholder="请输入邀请码"
              @blur="getcodeInfo(inviteNum)"
            >
          </div>

        </div>
      </div>

      <div class="openGift-checkout">
        <img
          src="../../../static/images/check_no.png"
          class="checkout-icon"
          v-if="!isAgreement"
          @click="isAgreement = !isAgreement"
          alt=""
        >
        <img
          src="../../../static/images/check_on.png"
          class="checkout-icon"
          v-else
          @click="isAgreement = !isAgreement"
          alt=""
        >
        <p
          class="checkout-txt"
          @click="isAgreement = !isAgreement"
        >我已阅读并同意<span
            class="argument"
            @click.stop="openAgreement"
          >《团大师用户协议》</span> </p>
      </div>
    </div>
    <cover-view
      :class="['openGift-btn',{'on':isAgreement}]"
      @click="handlePayChange"
    >立即成为团长</cover-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      curIndex: 0,
      giftList: [
        {
          goods_name: '',
          desc: '',
          market_price: ''
        }
      ],
      autoFocus: false,
      circular: true, // 设置衔接滑动
      previousMargin: '60rpx',
      nextMargin: '60rpx',
      animationData: {}, // 卡片放大动画
      animationData2: {}, // 卡片缩小动画
      equityList: [
        { icon: require('../../../static/images/Tequan1.png'), label: '自购省钱' },
        { icon: require('../../../static/images/Tequan2.png'), label: '开店赚钱' },
        { icon: require('../../../static/images/Tequan3.png'), label: '邀请奖金' },
        { icon: require('../../../static/images/Tequan4.png'), label: '特供商品' },
        { icon: require('../../../static/images/Tequan5.png'), label: '全面培训' },
        { icon: require('../../../static/images/Tequan6.png'), label: '专属店铺' },
        { icon: require('../../../static/images/Tequan7.png'), label: '优质素材' },
        { icon: require('../../../static/images/Tequan8.png'), label: '低价好物' }
      ],
      zhList: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
      // 是否显示信息
      isShowInfo: false,
      // 是否同意协议
      isAgreement: false,
      // 邀请码
      inviteNum: '',
      // 邀请人信息
      inviteData: {},
      // 是否可更换邀请人
      isInputInviter: true
    }
  },
  onLoad(options) {
    console.log(options)
    // 如果携带邀请码执行
    if (options && options.inviterId) {
      // 禁止切换邀请人
      this.isInputInviter = false;
      // 获取携带人信息
      this.getcodeInfo(options.inviterId)
    }
  },
  onShow() {
    let that = this;
    // 获取selAddress
    mpvue.getStorage({
      key: 'selAddress',
      success(res) {
        // 如果地址返回成功
        if (res && res.data) {
          console.log(res.data)
          that.$http.request('put', 'upgrades/1', res.data).then(({ code, resource }) => {
            if (code === 200) {
              mpvue.showToast({
                title: '地址设置成功，礼包正在等待发货',
                icon: 'success',
                duration: 2000,
                success() {
                  mpvue.switchTab({
                    url: '../my/main'
                  })
                }
              })
            } else {
              mpvue.showToast({
                title: '礼包地址选择失败，请联系客服',
                icon: 'none',
                duration: 2000
              })
            }
            console.log(res.data)
          })
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  mounted() {
    this.getGiftList();
  },

  methods: {
    /**
     * @description: 获取开店礼包
     * @Date: 2019-04-29 19:22:55
     */
    getGiftList() {
      this.$http.request('get', 'upgrades').then(({ code, resource }) => {
        console.log(resource)
        if (code === 200) {
          this.giftList = resource.length > 0 ? resource : this.giftList;
        } else {
          mpvue.showToast({
            title: '获取失败,请重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    /**
     * @description: 获取邀请码用户信息
     * @param {String} inviteNum  邀请码
     * @Date: 2019-04-29 19:22:33
     */
    getcodeInfo(inviteNum) {
      if (inviteNum) {
        this.$http.request('get', 'upgrades/' + inviteNum).then(({ code, resource }) => {
          console.log(resource)
          if (code === 200) {
            this.inviteData = resource;
            this.isShowInfo = true;
          } else {
            mpvue.showToast({
              title: '邀请码错误',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    },
    // 切换输入
    checkoutInput() {
      // 可编辑下执行
      if (this.isInputInviter) {
        this.isShowInfo = false;
        this.autoFocus = true;
      }
    },
    // swiper切换
    handleChange(e) {
      this.curIndex = e.mp.detail.current
      this.changeActive()
      this.changeNormal()
    },
    // 收缩
    changeNormal() {
      var animation2 = mpvue.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      this.animation2 = animation2
      animation2.scale(0.9).opacity(0.6).step()
      this.animationData2 = animation2.export()
    },
    // 展开
    changeActive() {
      var animation = mpvue.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      this.animation = animation
      animation.scale(1).opacity(1).step()
      this.animationData = animation.export()
    },
    // 打开协议
    openAgreement() {
      mpvue.navigateTo({
        url: '../../pages/web-view/main?url=http://h5.tuands.cn/support/agreement-user.html'
      })
    },
    // 成为团长
    handlePayChange() {
      if (this.isAgreement) {
        if (!this.inviteNum) {
          mpvue.showToast({
            title: '请输入邀请码',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (!this.isShowInfo) {
          mpvue.showToast({
            title: '请输入正确邀请码',
            icon: 'none',
            duration: 2000
          })
          return;
        }

        this.$http.request('post', 'upgrades', { goods_id: this.giftList[this.curIndex].id, code: this.inviteNum }).then(({ code, resource }) => {
          if (code === 200) {
            mpvue.requestPayment({
              ...resource,
              success(res) {
                mpvue.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000,
                  success() {
                    // 逻辑验证
                    mpvue.showModal({
                      title: '提示',
                      content: '前往选择开店礼包收货地址',
                      confirmText: '立即前往',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          mpvue.navigateTo({
                            url: '../../pages/sub_my/my_address/main?use=select'
                          })
                          console.log('用户点击确定')
                        }
                      }
                    })
                  }
                })
              },
              fail(res) {
                mpvue.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          } else {
            mpvue.showToast({
              title: '获取签名失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
        // if(this.inviteNum)
        console.log('发起支付')
      } else {
        mpvue.showToast({
          title: '未同意团大师用户协议',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  onUnload() {
    // 移除缓存selAddress
    mpvue.removeStorage({
      key: 'selAddress'
    })
  }
}
</script>

<style scoped lang="scss">
.openGift-container {
  background-color: #ffffff;
}
.home_swiper {
  position: relative;
  width: 100%;
  height: 245px;
  swiper-item {
    overflow: initial;
  }
  .item {
    transform: scale(0.9);
    transform-origin: 50% 50% 0px;
    opacity: 0.6;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }
  .active_item {
    transform: scale(1);
    opacity: 1;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }
  .goods-img {
    width: 100%;
    vertical-align: middle;
    height: 236px;
    background: url('../../../static/images/BannerNull.png') no-repeat;
    background-size: 100% 100%;
  }
}

.openGift-title {
  padding: 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  font-family: PingFang SC;
}
.openGift-p-title {
  font-size: 18px;
  color: #282828;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
  padding-top: 15px;
}
.openGift-content {
  padding-bottom: 100px;
}
.openGift-goods {
  .openGift-active {
    margin-top: 30px;
    font-size: 18px;
    color: #282828;
    font-weight: bold;
    text-align: center;
    line-height: 1.3;
  }
  .goods-name {
    font-size: 15px;
    color: #282828;
    font-weight: bold;
    margin-top: 15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .goods-hide {
      max-width: 70%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .goods-detail {
    margin: 15px;
    padding: 15px 20px;
    background-color: #f6f8fa;
    border-radius: 6px;
    position: relative;
    min-height: 200px;
    .goods-absbox {
      display: flex;
      background-color: #ff6666;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 11.5px;
      right: 11.5px;
      .goods-money {
        font-size: 10.5px;
        color: #ffffff;
        font-weight: bold;
        line-height: 1.2;
        font-family: Avenir Next;
        .goods-m {
          line-height: 1.2;
          font-size: 16.5px;
          color: #ffffff;
          font-weight: bold;
          font-family: Avenir Next;
        }
      }
      .goods-txt {
        font-size: 14px;
        color: #ffffff;
        line-height: 1.2;
        font-weight: bold;
      }
    }
    .goods-p {
      font-size: 15px;
      color: #282828;
      display: block;
    }
  }
}
.equity-list {
  padding: 0 12.5px 15px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: center;
  .equity-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% / 4);
    margin-top: 20px;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .item-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
    }
    .item-txt {
      font-size: 15px;
      color: #282828;
      margin-top: 5px;
    }
  }
}
.openGift-invite-box {
  margin: 20px 0 30px;
  position: relative;
  .invite-reset {
    position: absolute;
    font-size: 14px;
    color: #077ddd;
    bottom: -25px;
    left: 50%;
    transform: translate(-50%);
  }
  .invite-info {
    width: 255px;
    height: 64px;
    background-color: #f6f8fa;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    .input-invite {
      padding: 0 10px;
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 15px;
    }
    .info-img {
      width: 44px;
      height: 44px;
      display: block;
      margin-right: 15px;
      border-radius: 50%;
    }
    .info-name {
      font-size: 15px;
      font-weight: bold;
      color: #282828;
    }
  }
}
.openGift-checkout {
  display: flex;
  justify-content: center;
  align-items: center;
  .checkout-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .checkout-txt {
    font-size: 15px;
    color: #282828;
    .argument {
      color: #ff6666;
    }
  }
}
.openGift-btn {
  height: 39px;
  line-height: 39px;
  text-align: center;
  background-color: #dfdfdf;
  border-radius: 22px;
  position: fixed;
  bottom: 20px;
  left: 75px;
  right: 75px;
  margin: 0 auto;
  font-size: 15px;
  color: #656565;
  &.on {
    background-color: #ff6666;
    color: #ffffff;
    box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
  }
}
</style>
