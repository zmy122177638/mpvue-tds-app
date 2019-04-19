<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
  },
  // 下面为小程序APP生命周期
  onLaunch (options) {
    // 获取wx系统信息
    console.log(this.$store.state.systemInfo)
    // console.log('进入小程序')
    // console.log(options)
    console.log(App)
  },
  onShow (options) {
    // console.log('小程序进入前台')
    // console.log(options)
  },
  onHide () {
    // console.log('小程序进入后台')
  },
  onError (msg) {
    console.log(msg)
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
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
