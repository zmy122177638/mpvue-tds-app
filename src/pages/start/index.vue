<template>
  <section class="container">
    <div class="meng-ban"></div>
    <section class="main">
      <div class="logo-box">
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=434680365,2593445656&fm=26&gp=0.jpg">
      </div>
      <div class="des">团大师，您身边的好物管家</div>
      <div class="home-bnt">
        <button type="warn" @click="goHome" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">立即登录</button>
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
      return {}
    },

    components: {},

    methods: {
      goHome () {
        // console.log(111)
        // const url = '../home/main'
        // mpvue.reLaunch({ url })
      },
      handleGetUserInfo (data) {
        //检查登录状态是否有效，如果有效则不进行信息获取
        // mpvue.checkSession({
        //   success:function () {
        //     console.log('登录态有效')
        //   },
        //   fail:function () {
        //     console.log('登录态过期')
        //     mpvue.login({
        //       success:function (ress) {
        //         console.log(ress)
        //         mpvue.getUserInfo({
        //           success:function (res) {
        //             console.log(res)
        //           },
        //           fail:function (e) {
        //             console.log('0000')
        //           }
        //         })
        //       },
        //       fail:function (e) {
        //         console.log('0000')
        //       }
        //     })
        //   }
        // })
        const url = '../home/main'
        mpvue.reLaunch({ url })
      }
    },

    created () {
    }
  }
</script>

<style scoped lang="scss">
  .container{
    height: 100%;
    width: 100%;
    background: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1138431428,3970574101&fm=26&gp=0.jpg") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position:relative;

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
