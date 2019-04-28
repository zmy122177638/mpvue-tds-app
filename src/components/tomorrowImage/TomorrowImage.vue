<template>
  <section class="mr-yg">
    <img :src="imgUrl" />
  </section>
</template>

<script>
  export default {
    name: 'TomorrowImage',
    props: {
      img_url: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        imgUrl: this.img_url
      }
    },
    watch: {
      img_url: function (val) {
        this.imgUrl = val;
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
      background: url("../../../static/images/GuanggNull.png");
      background-size: 100% 100%;
    }
  }
</style>
