<template>
  <section class="container">
    <section class="top">
      <tds-header></tds-header>
    </section>
    <section class="top-kong"></section>
    <tomorrow-image :imgUrl="topImg"></tomorrow-image>
    <section class="item-list">
      <block v-for="(item,i) in productsData" :key="i">
        <pruduct-item
          :itemTpye="type"
          :goods_data="item"
          :subIndex="i"
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
        type: 1,
        position: 1,
        productsData: {},
        topImg: ''
      }
    },

    components: {
      TdsHeader,
      TomorrowImage,
      PruductItem,
      KaidianYouliBtn
    },

    methods: {
      // 获取列表
      getProductsData () {
        let data = {};
        data.type = this.type;
        data.position = this.position;
        console.log(data);
        this.$http.get('goods/getTopicList', data)
          .then(res => {
            console.log('数据：：');
            console.log(res);
            this.topImg = res.resource.img_src;
            this.productsData = res.resource.list;
            // console.log(this.productsData)
          })
      }
    },

    created () {
    },
    onLoad (options) {
      console.log('有倒计时')
      // console.log(options)
      this.type = Number(options.type);
      this.position = Number(options.position);
      // 分类设置头部导航
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
    },
    onShow () {
      this.getProductsData()
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
