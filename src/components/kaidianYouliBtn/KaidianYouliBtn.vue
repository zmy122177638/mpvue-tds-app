<template>
  <movable-area class="movable-box" v-if="!vipLevel || isShow">
    <movable-view
      class="movable-item"
      direction="vertical"
      inertia="true"
      friction="5"
      y="900rpx"
    >
      <img
        v-if="isShow"
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
    // 是否显示
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 用户是否为会员
      vipLevel: this.$store.getters.isVip,
      // 是否要显示该组件，(该参数为用户传值，与是否为会员无关)
      isShowBox: this.isShowBox
    }
  },
  methods: {
    // 开店有礼按钮响应
    handleGotoKaidian() {
      mpvue.navigateTo({
        url: '../../pages/openShop/main'
      })
    },
    // 邀请有礼按钮响应
    handleGotoYaoqing() {
      console.log('弹出邀请有礼弹窗')
    }
  },
  watch: {
    isShow: function (val) {
      this.isShowBox = val;
    }
  },
  mounted () {
    console.log('是否为会员：');
    console.log(this.vipLevel);
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
