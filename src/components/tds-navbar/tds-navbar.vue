<template>
  <section class="navbar-container">
    <div
      class="navbar-status-box"
      :style="'height:' + statusHeight + 'px;'"
    ></div>
    <div
      class="navbar-title-box"
      :style="'height:' + titleHeight + 'px;'"
    >
      <div class="page-title">自定义navbar</div>
    </div>
    <solt></solt>
  </section>
</template>

<script>
// 自定义头部组件
export default {
  computed: {
    statusHeight () {
      return this.$store.state.systemInfo.statusBarHeight
    },
    titleHeight () {
      return this.$store.state.systemInfo.screenWidth * 88 / 750
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  background-color: #ffffff;
  .navbar-status-box {
    width: 100%;
    background-color: transparent;
  }
  .navbar-title-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .page-title {
      font-size: 19px;
      color: #282828;
      font-weight: bold;
    }
  }
}
</style>
