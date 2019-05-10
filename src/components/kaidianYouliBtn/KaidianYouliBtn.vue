<template>
  <movable-area class="movable-box" v-if="!vipLevel || isYqylShow">
    <movable-view
      class="movable-item"
      direction="vertical"
      inertia="true"
      friction="5"
      y="900rpx"
    >
      <img
        v-if="vipLevel"
        @click="handleGotoYaoqing"
        src="../../../static/images/yqyl.png"
      >
      <img
        v-else
        @click="handleGotoKaidian"
        src="../../../static/images/kdyl1.png"
      >
    </movable-view>
  </movable-area>
</template>

<script>
export default {
  name: 'KaidianYouliBtn',
  props: {
    userIsVip: {
      type: Boolean,
      default: false
    },
    // 是否显示
    isYqylShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 用户是否为会员
      vipLevel: this.userIsVip
    }
  },
  methods: {
    // 开店有礼按钮响应
    handleGotoKaidian() {
      // 判断是否为会员(用于会员用户手机卡顿时未及时隐藏开店有礼按钮响应错误)
      if (this.$store.state.userInfo.type) {
        return;
      }
      mpvue.navigateTo({
        url: '/pages/openShop/main'
      })
    },
    // 邀请有礼按钮响应
    handleGotoYaoqing() {
      // console.log('弹出邀请有礼弹窗')
      this.$emit('click-btn');
    },
    getVip () {
      this.vipLevel = this.$store.state.userInfo.type;
    }
  },
  watch: {
    userIsVip: function (val) {
      this.vipLevel = val;
    }
  },
  mounted () {
    this.getVip();
    console.log('是否为会员：');
    console.log(this.vipLevel);
  },
  updated () {
  }
}
</script>

<style scoped lang="scss">
.movable-box {
  position: fixed;
  bottom: 0rpx;
  right: 0rpx;
  width: 218rpx;
  height: 100%;
  /*border: 1px solid red;*/
  z-index: 1000;
  pointer-events: none;
  .movable-item {
    position: relative;
    width: 188rpx;
    height: 188rpx;
    pointer-events: auto;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
