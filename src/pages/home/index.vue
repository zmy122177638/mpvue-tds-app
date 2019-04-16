<template>
  <section>
    <h2>商城首页面</h2>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <section class="main">

    </section>
  </section>
</template>

<script>
  export default {
    data () {
      return {}
    },

    components: {},

    methods: {},

    created () {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";
  .main{
    @include common-width;
    border: 1px solid red;
    height: 200rpx;
  }

</style>
