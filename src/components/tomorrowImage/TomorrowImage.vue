<template>
  <section class="mr-yg">
    <img :src="imgUrl" />
  </section>
</template>

<script>
  export default {
    name: 'TomorrowImage',
    data () {
      return {
        imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1533275126,1287779573&fm=26&gp=0.jpg'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";
  .mr-yg{
    @include common-width;
    height: 300rpx;
    -webkit-border-radius: 15rpx;
    -moz-border-radius: 15rpx;
    border-radius: 15rpx;
    box-shadow: 0rpx 10rpx 20rpx rgba(255,102,102,0.35);
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    img{
      width: 100%;
      height: 100%;
      -webkit-border-radius: 15rpx;
      -moz-border-radius: 15rpx;
      border-radius: 15rpx;
    }
  }
</style>
