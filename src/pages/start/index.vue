<template>
  <section class="container">
    <img class="bg_img" src="../../../static/images/LOGIN.png" />
    <div class="meng-ban"></div>
    <section class="main">
      <div class="logo-box">
        <img src="../../../static/images/LOGO1.png">
      </div>
      <div class="des">团大师，您身边的好物管家</div>
      <div class="home-bnt">
        <button class="bnt-1" v-if="!hasOpenId" type="warn" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">立即登录</button>
        <button class="bnt-1" v-else type="warn" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber">微信登录</button>
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
        // 判断是否登录成功
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

      // 用户点击授权按钮响应
      handleGetUserInfo (e) {
        this.$http.loginFlow().then(res => {
          console.log('async返回的内容');
          console.log(res)
          // 用户ssid写入state
          this.$store.commit({
            type: 'setSsid',
            ssid: 'hqetqehqertq4r8548qwer123456789'
          });
          this.hasOpenId = true;
        });
      },
      // 用户点击绑定手机号事件响应
      handleGetPhoneNumber (e) {
        if (e.mp.detail.encryptedData) {
          console.log('手机号信息：');
          console.log(e.mp.detail);
          this.hasPhoneNumber = true;
          this.goHome();
        } else {
          console.log('用户拒绝了绑定手机号');
        }
      }
    },
    onShow () {
      // 判断openId是否存在
      if (this.$store.state.ssid) {
        this.hasOpenId = true;
      }
      // API请求示例
      // this.$http.get('goods/detail', {id: 391}).then(res => {
      //   console.log('商品信息请求成功');
      //   console.log(res);
      // }).catch(e => {
      //   console.log('商品信息请求失败');
      //   console.log(e)
      // })
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
