<template>
  <section class="container">
    <img
      class="bg_img"
      src="../../../static/images/LOGIN.jpg"
    />
    <div class="meng-ban"></div>
    <section class="main">
      <div class="logo-box">
        <img src="../../../static/images/LOGO1.png">
      </div>
      <div class="des">团大师，您身边的好物管家</div>
      <div class="home-bnt">
        <button
          class="bnt-1"
          v-if="!hasOpenId"
          type="warn"
          open-type="getUserInfo"
          @getuserinfo="handleGetUserInfo"
        >立即登录</button>
        <button
          class="bnt-1"
          v-else
          type="warn"
          open-type="getPhoneNumber"
          @getphonenumber="handleGetPhoneNumber"
        >微信登录</button>
      </div>
      <div class="bottom-des">
        <p>轻轻松松卖货，不费精力</p>
        <p>开开心心赚钱，不枉青春</p>
      </div>
    </section>

  </section>
</template>

<script>
export default {
  data() {
    return {
      // 判断是否授权登录成功
      hasOpenId: false,
      // 当前进入的场景值：
      scene: 1001,
      // 传入的参数,当场景值为用户分享入口进入时用到，用于判断用户登录后应该跳转的页面以及附带的页面参数
      query: {}
    }
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },

  methods: {
    // 授权完毕，跳转到首页面
    goHome() {
      const url = '../home/main'
      mpvue.reLaunch({ url })
    },
    // 判断是否从用户分享中进入小程序
    isShareInto() {
      // isShare 作为分享进入标识，传入分享goPath进入的页面
      let isShare = false;
      // switch (this.scene) {
      //   case 1007:
      //     // 单人聊天小程序分享打开
      //     isShare = true;
      //     break;
      //   case 1008:
      //     // 群聊小程序分享打开
      //     isShare = true;
      //     break;
      //   case 1044:
      //     // 群聊小程序分享打开(带shareTicket)
      //     isShare = true;
      //     break;
      //   case 1012:
      //     // 长按图片识别二维码打开小程序
      //     isShare = true;
      //     break;
      //   case 1011:
      //     // 扫描二维码打开小程序
      //     isShare = true;
      //     break;
      //   case 1047:
      //     // 扫描小程序码
      //     isShare = true;
      //     break;
      //   case 1048:
      //     // 长按图片识别小程序码
      //     isShare = true;
      //     break;
      //   default:
      //     isShare = false;
      //     break;
      // }
      // 如果带着uid(分享人id的参数)，则说明分享途径进入小程序
      if (this.query.uid) {
        isShare = true;
      }
      return isShare;
    },
    // 判断是否从分享进入小程序，再进行跳转页面,跳转到主页或根据不同条件跳转到不同页面
    goPage() {
      let that = this;
      if (this.isShareInto()) {
        console.log('分享点击进入');
        // 分享进入跳转到其他页面后，跳转的页面根据 fx 判断后退按钮操作
        let shareBack = true;
        let goPath = this.query.goPath;
        // 如果是邀请开店分享，则需要判断扫码用户是否已经为会员用户，如果是会员用户则直接跳转到主页面
        if (goPath == '/pages/openShop/main' && that.$store.state.userInfo.type) {
          // console.log('用户已经是会员，跳转到主页面')
          goPath = '/pages/home/main';
        }
        goPath = goPath + '?shareBack=' + shareBack;
        // 如果是商品分享，则带goods_id
        if (this.query.goods_id) {
          goPath = goPath + '&goods_id=' + this.query.goods_id;
        }
        // 根据分享人uid信息请求分享人信息
        this.$http.get('user/getBaseInfo', { uid: this.query.uid })
          .then(res => {
            // console.log('分享人信息');
            // console.log(res.resource);
            // 写入上级分享人信息
            that.$store.commit({
              type: 'writeSharerInfo',
              sharerInfo: res.resource
            });
            mpvue.reLaunch({
              url: goPath
            })
          })
      } else {
        console.log('非分享点击进入，跳转到主页面');
        // 当前用户信息作为上级分享人信息
        this.$store.commit({
          type: 'writeSharerInfo',
          sharerInfo: this.userInfo
        });
        // 如果该用户已成为团长但未实名的情况下，跳转至我的页面，强制实名。
        if (this.userInfo.type && !this.userInfo.is_real_check) {
          mpvue.switchTab({
            url: '../my/main'
          })
        } else {
          this.goHome();
        }
      }
    },
    // 监测用户信息有效性
    authorUserInfo() {
      let that = this;
      mpvue.showLoading({});
      mpvue.checkSession({
        success: function () {
          mpvue.hideLoading();
          // console.log('sessionKey未过期')
          // 如果登录态未过期，还要考虑用户登录信息是否拿到，如果没有拿到，则需要重新授权登录
          if (that.$store.state.token) {
            that.hasOpenId = true;
            // 还需要判断用户是否已经填写手机号，这步判断是为了防止用户授权登录后退出重新登录而跳过手机验证
            if (that.userInfo.mobile_phone) {
              // 用户手机号存在，说明用户信息完整
              that.goPage();
            }
          } else {
            console.log('sessionKey虽然没失效，但是授权登录失败,需要重新授权')
          }
        },
        fail: function () {
          mpvue.hideLoading();
          // sessionKey过期，则需要让用户重新进行登录
          console.log('sessionKey已过期')
        }
      });
    },

    // 用户点击授权按钮响应
    handleGetUserInfo(e) {
      this.$http.loginFlow().then(res => {
        console.log('async返回的内容');
        console.log(res)
        // 微信授权成功，向store写入token和用户信息
        this.$store.commit({
          type: 'writeToken',
          token: res.data.token
        });
        this.$store.commit({
          type: 'writeUserInfo',
          userInfo: res.data.user
        });
        //  判断手机号是否已经存在
        if (res.data.user.mobile_phone) {
          this.goPage();
        } else {
          this.hasOpenId = true;
        }
      });
    },

    // 用户点击绑定手机号事件响应
    handleGetPhoneNumber(e) {
      if (e.mp.detail.encryptedData) {
        // console.log('手机号信息：');
        let tempData = {};
        tempData.enc_data = e.mp.detail.encryptedData;
        tempData.iv = e.mp.detail.iv;
        this.$http.post('auth/editInfo', tempData)
          .then(res => {
            // console.log('手机号授权：');
            // console.log(res);
            // 更新store中的userInfo
            this.$store.commit({
              type: 'writeUserInfo',
              userInfo: res.data
            });
            this.goPage();
          })
      } else {
        console.log('用户拒绝了绑定手机号');
      }
    }
  },
  onShow() {

  },
  onLoad(options) {
    this.query = {};
    // console.log('start页面参数：');
    // console.log(options);
    //  获取app进入参数
    let appOption = wx.getLaunchOptionsSync();
    this.scene = appOption.scene;
    this.query = options;
    this.authorUserInfo();
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  position: relative;

  .bg_img {
    position: absolute;
    left: 0rpx;
    top: 0rpx;
    width: 100%;
    height: 100%;
  }

  .meng-ban {
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    border-top: 1rpx solid transparent;
    z-index: 888;
    .home-bnt {
      position: absolute;
      bottom: 300rpx;
      left: 0rpx;
      right: 0rpx;
      width: 80%;
      height: 84rpx;
      margin: auto;
      .bnt-1 {
        background: #ff6666;
        border-color: #ff6666;
        color: #fff;
      }
    }
    .logo-box {
      height: 158rpx;
      width: 158rpx;
      margin: 180rpx auto 40rpx;
      img {
        width: 100%;
        height: 100%;
        -webkit-border-radius: 40rpx;
        -moz-border-radius: 40rpx;
        border-radius: 40rpx;
      }
    }
    .des {
      text-align: center;
      font-size: 40rpx;
      color: #fff;
      margin-bottom: 400rpx;
      letter-spacing: 8rpx;
    }
    .bottom-des {
      position: absolute;
      bottom: 80rpx;
      left: 0rpx;
      right: 0rpx;
      margin: auto;
      text-align: center;
      color: #e3e3e3;
      letter-spacing: 8rpx;
    }
  }
}
</style>
