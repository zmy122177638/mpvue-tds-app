<template>
  <section class="container">
    <img class="bg_img" src="../../../static/images/LOGIN.jpg" />
    <div class="meng-ban"></div>
    <section class="main">
      <div class="logo-box">
        <img src="../../../static/images/LOGO1.png">
      </div>
      <div class="des">团大师，您身边的好物管家</div>
      <div class="home-bnt">
        <button class="bnt-1" v-if="!hasOpenId" type="warn" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">立即登录</button>
        <button class="bnt-1" v-if="hasOpenId && !hasPhoneNumber" type="warn" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber">微信登录</button>
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
    data () {
      return {
        // 判断是否授权登录成功
        hasOpenId: false,
        // 是否已绑定手机号
        hasPhoneNumber: false
      }
    },

    components: {},

    methods: {
      // 授权完毕，跳转到首页面
      goHome () {
        const url = '../home/main'
        mpvue.reLaunch({ url })
      },

      // 监测用户信息有效性
      authorUserInfo () {
        let that = this;
        mpvue.showLoading({});
        mpvue.checkSession({
          success: function () {
            mpvue.hideLoading();
            console.log('sessionKey未过期')
            // 如果登录态未过期，还要考虑用户登录信息是否拿到，如果没有拿到，则需要重新授权登录
            if (that.$store.state.userInfo.openid) {
              that.hasOpenId = true;
              // 还需要判断用户是否已经填写手机号，这步判断是为了防止用户授权登录后退出重新登录而跳过手机验证
              if (that.$store.state.userInfo.mobile_phone) {
                // 用户手机号存在，说明用户信息完整
                mpvue.reLaunch({
                  url: '../../pages/home/main'
                })
              } else {
                console.log('11111111111')
              }
              // 如果已经授权登录但是手机号还没有，则需要将store中的token同步到http.token属性中
              that.$http.token = that.$store.state.token;
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
      handleGetUserInfo (e) {
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
            this.goHome();
          } else {
            this.hasOpenId = true;
          }
        });
      },

      // 用户点击绑定手机号事件响应
      handleGetPhoneNumber (e) {
        if (e.mp.detail.encryptedData) {
          // console.log('手机号信息：');
          // console.log(e.mp.detail);
          // this.hasPhoneNumber = true;
          // this.goHome();
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
              this.goHome();
            })
        } else {
          console.log('用户拒绝了绑定手机号');
        }
      }
    },
    onShow () {
      this.authorUserInfo();
    },
    created () {
    }
  }
</script>

<style scoped lang="scss">
  .container{
    height: 100%;
    width: 100%;
    /*background: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1138431428,3970574101&fm=26&gp=0.jpg") no-repeat;*/
    /*background: url("../../../static/images/LOGIN.png") no-repeat;*/
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position:relative;

    .bg_img{
      position: absolute;
      left: 0rpx;
      top: 0rpx;
      width: 100%;
      height: 100%;
    }

  .meng-ban{
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
  }
  .main{
    position: relative;
    width: 100%;
    height: 100%;
    border-top: 1rpx solid transparent;
    z-index:888;
    .home-bnt{
      position: absolute;
      bottom: 300rpx;
      left: 0rpx;
      right: 0rpx;
      width: 80%;
      height: 84rpx;
      margin: auto;
      .bnt-1{
        background: #FF6666;
        border-color: #ff6666;
        color: #fff;
      }
    }
    .logo-box{
      height: 158rpx;
      width: 158rpx;
      margin: 180rpx auto 40rpx;
      img{
        width: 100%;
        height: 100%;
        -webkit-border-radius: 40rpx;
        -moz-border-radius: 40rpx;
        border-radius: 40rpx;
      }
    }
    .des{
      text-align: center;
      font-size:40rpx;
      color: #fff;
      margin-bottom: 400rpx;
      letter-spacing: 8rpx;
    }
    .bottom-des{
      position: absolute;
      bottom: 80rpx;
      left: 0rpx;
      right: 0rpx;
      margin: auto;
      text-align: center;
      color: #E3E3E3;
      letter-spacing: 8rpx;
    }
  }



  }
</style>
