<template>
  <section class="container">
    <section class="top">
      <tds-header></tds-header>
    </section>
    <section class="top-kong"></section>
    <tomorrow-image></tomorrow-image>
    <section class="item-list">
      <block v-for="i in 6" :key="i">
        <pruduct-item
          :itemTpye="listTpye"
          :subIndex="i-1"
        ></pruduct-item>
      </block>
    </section>
    <section class="kong"></section>
    <!--开店礼包按钮，如果用户是会员则不需要显示-->
    <kaidian-youli-btn></kaidian-youli-btn>
  </section>
</template>

<script>
  import TdsHeader from '@/components/tds-header/tds-header'
  import TomorrowImage from '@/components/tomorrowImage/TomorrowImage.vue'
  import PruductItem from '@/components/productItem/ProductItem.vue'
  import KaidianYouliBtn from '@/components/kaidianYouliBtn/KaidianYouliBtn.vue'

  export default {
    data () {
      return {
        listTpye: 3
      }
    },

    components: {
      TdsHeader,
      TomorrowImage,
      PruductItem,
      KaidianYouliBtn
    },

    methods: {},

    created () {
    },
    onLoad (options) {
      console.log(options)
      if (options.type){
        this.listTpye = Number(options.type)
      }
      switch (options.type) {
        case '1':
          wx.setNavigationBarTitle({
            title: '引流特供'
          })
          break
        case '2':
          wx.setNavigationBarTitle({
            title: '今日团品'
          })
          break
        case '3':
          wx.setNavigationBarTitle({
            title: '好物拼团'
          })
          break
        case '4':
          wx.setNavigationBarTitle({
            title: '爆品返场'
          })
          break
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";
  .container{
    .top{
      height: 108rpx;
      width: 100%;
      /*border-bottom: 1px solid red;*/
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 1000;
    }
    .top-kong{
      height: 108rpx;
    }
    .item-list{
      @include common-width;
      margin-top: 20rpx;
    }
    .kong{
      height: 50rpx;
    }
  }

</style>
