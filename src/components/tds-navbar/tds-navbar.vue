<template>
  <section class="navbar-container">
    <div
      class="navbar-status-box"
      :style="'height:' + statusHeight + 'px;'"
    ></div>
    <div
      class="navbar-title-box"
      :style="'height:' + 44 + 'px;'"
    >
      <div
        class="page-goBack"
        @click="goBack"
      ></div>
      <div class="page-title">{{title}}</div>
    </div>
  </section>
</template>

<script>
// 自定义头部组件
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    isGoBack: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    statusHeight() {
      return this.$store.state.systemInfo.statusBarHeight
    },
    titleHeight() {
      let menu = mpvue.getMenuButtonBoundingClientRect();
      console.log(this.$store.state.systemInfo)
      console.log(menu)
      return this.$store.state.systemInfo.screenWidth * 88 / 750;
    }
  },
  methods: {
    goBack() {
      if (this.isGoBack) {
        mpvue.navigateBack({ delta: 1 })
      } else {
        mpvue.switchTab({ url: '../../pages/home/main' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  background-color: #ffffff;
  position: sticky;
  .navbar-status-box {
    width: 100%;
    background-color: transparent;
  }
  .navbar-title-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    box-sizing: border-box;
    position: relative;
    .page-title {
      font-size: 19px;
      color: #282828;
      font-weight: bold;
    }
    .page-goBack {
      width: 10px;
      height: 18px;
      background: url('../../../static/images/Return_iCon.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      z-index: 99;
      top: 50%;
      left: 11.5px;
      cursor: pointer;
      transform: translateY(-50%);
    }
  }
}
</style>
