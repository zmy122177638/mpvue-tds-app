<template>
  <movable-area class="movable-box">
    <movable-view
      class="movable-item"
      direction="vertical"
      inertia="true"
      friction="5"
      y="900rpx"
    >
      <img @click="handleGotoKaidian" src="../../../static/images/kdyl.png">
    </movable-view>
  </movable-area>
</template>

<script>
  export default {
    name: 'KaidianYouliBtn',
    data () {
      return {
      }
    },
    methods: {
      handleGotoKaidian () {
        console.log('前往开店页面')
      }
    }
  }
</script>

<style scoped lang="scss">
  .movable-box{
    position: fixed;
    bottom: 0rpx;
    right: 0rpx;
    width: 218rpx;
    height: 100%;
    /*border: 1px solid red;*/
    z-index: 1000;
    pointer-events: none;
    .movable-item{
      position: relative;
      width: 188rpx;
      height: 188rpx;
      pointer-events: auto;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }

</style>
