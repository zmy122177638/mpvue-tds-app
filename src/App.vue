<script>

export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
  },
  onLaunch(options) {
    // console.log('APP onLaunch 中打印token 和 userInfo:');
    // console.log(this.$store.state.token);
    // console.log(this.$store.state.userInfo);
    // 如果token
    // if (this.$store.state.token) {
    //   this.$http.token = this.$store.state.token;
    //   console.log(this.$store.state.userInfo);
    // }
    // mpvue.checkSession({
    //   success: function () {
    //     console.log('App.vue session_key 有效')
    //   },
    //   fail: function () {
    //     console.log('App.vue session_key 有效')
    //   }
    // });
  },
  onShow(options) {
    // console.log('app onShow');
    // console.log('小程序进入前台')
    // console.log(options)
  },
  onHide() {
    // console.log('小程序进入后台')
  },
  onError(msg) {
    // console.log(msg)
  }
}
</script>
<style lang="scss">
page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  color: #282828;
  font-family: PingFang SC;
  background: rgba(246, 248, 250, 1); /*所有页面初始背景颜色*/
  font-size: 28rpx;
}
// 去除滚动条
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
  display: none;
}
// vip等级公用
.my-status-icon {
  width: 82px;
  height: 24px;
  display: block;
  &.vip01 {
    background: url('../static/images/VIP_1.png') no-repeat;
    background-size: 100% 100%;
  }

  &.vip02 {
    background: url('../static/images/VIP_2.png') no-repeat;
    background-size: 100% 100%;
  }

  &.vip03 {
    background: url('../static/images/VIP_3.png') no-repeat;
    background-size: 100% 100%;
  }

  &.vip04 {
    background: url('../static/images/VIP_4.png') no-repeat;
    background-size: 100% 100%;
  }

  &.vip05 {
    background: url('../static/images/VIP_5.png') no-repeat;
    background-size: 100% 100%;
  }
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
