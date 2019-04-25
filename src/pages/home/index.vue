<template>
  <section class="container">
    <section class="top">
      <tds-header></tds-header>
    </section>
    <section class="main">
      <section class="top-kong"></section>
      <section class="ban-1">
        <lunbo-images
          :hasLink="true"
          :imgArr="linkImgUrls">
        </lunbo-images>
        <div class="type-box">
            <div class="type-item" v-for="(item,i) in typeInfoList" :key="i" @click="handleClickGo(item.linkUrl)">
              <div class="type-item-t"><img :src="item.imgUrl" :style="'box-shadow: 0rpx 10rpx 20rpx ' + item.boxShadow "></div>
              <div class="type-item-t">{{item.name}}</div>
            </div>
        </div>
        <div class="active-box">
          <div class="active-left">
            <p>最新</p>
            <p>动态</p>
          </div>
          <div class="active-right">
            <active-lunbo-msg></active-lunbo-msg>
          </div>
        </div>
      </section>
      <section class="jr-tp">
        <header class="ban-header">今日团品限时购</header>
        <block v-for="i in 6" :key="i">
          <pruduct-item
            :itemTpye="2"
          ></pruduct-item>
        </block>
      </section>
      <div style="height: 20rpx;"></div>
      <tomorrow-image></tomorrow-image>
      <section class="hw-pt">
        <header class="ban-header">好物拼团</header>
        <block v-for="i in 6" :key="i">
          <pruduct-item
            :itemTpye="3"
          ></pruduct-item>
        </block>
      </section>
      <section class="yl-tg">
        <header class="ban-header">引流特供</header>
        <block v-for="i in 6" :key="i">
          <pruduct-item
            :itemTpye="1"
          ></pruduct-item>
        </block>
      </section>
      <section class="bp-fc">
        <header class="ban-header">
          爆品返场
          <span class="tip">所投票商品将于 <span class="time">2019年4月16日</span> 返场</span>
        </header>
        <section class="bp-fc-img">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1996499788,3346940487&fm=26&gp=0.jpg" />
        </section>
        <block v-for="i in 6" :key="i">
          <pruduct-item
            :itemTpye="4"
            :subIndex="i-1"
          ></pruduct-item>
        </block>
      </section>
    </section>
    <section class="kong"></section>
  </section>
</template>

<script>
  import TdsHeader from '@/components/tds-header/tds-header'
  import LunboImages from '@/components/lunboImages/LunboImages.vue'
  import ActiveLunboMsg from '@/components/activeLunboMsg/ActiveLunboMsg.vue'
  import PruductItem from '@/components/productItem/ProductItem.vue'
  import TomorrowImage from '@/components/tomorrowImage/TomorrowImage.vue'

  export default {
    components: {
      TdsHeader,
      LunboImages,
      ActiveLunboMsg,
      PruductItem,
      TomorrowImage
    },
    data () {
      return {
        // 顶部轮播图数据数组
        linkImgUrls: [
          {
            imgurl: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
            linkUrl: '../productDetail/main'
          },
          {
            imgurl: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            linkUrl: '../productList/main'
          }
        ],
        // 商品分类按钮信息
        typeInfoList: [
          {
            name: '引流特供',
            imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3029925626,4050821961&fm=27&gp=0.jpg',
            linkUrl: '../productList/main?type=1',
            boxShadow: 'rgba(255,174,77,0.35)'
          },
          {
            name: '今日团品',
            imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3029925626,4050821961&fm=27&gp=0.jpg',
            linkUrl: '../productList/main?type=2',
            boxShadow: 'rgba(255,102,102,0.35)'
          },
          {
            name: '好物拼团',
            imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3029925626,4050821961&fm=27&gp=0.jpg',
            linkUrl: '../productList/main?type=3',
            boxShadow: 'rgba(187,97,255,0.35)'
          },
          {
            name: '爆品返场',
            imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3029925626,4050821961&fm=27&gp=0.jpg',
            linkUrl: '../productList/main?type=4',
            boxShadow: 'rgba(255,116,199,0.35)'
          }
        ]
      }
    },
    methods: {
      // 板块分类点击响应
      handleClickGo (linkUrl) {
        // type== 1：引流，2,：团品，3：拼团，4：返场
        console.log(linkUrl)
        mpvue.navigateTo({url: linkUrl})
      },
      // 商品点击跳转到详情响应
      handleGoDetail (i) {
        console.log('跳转到详情')
        mpvue.navigateTo({
          url: '#?id=' + i
        })
      }
    },
    onPullDownRefresh () {
      // 需要在json中开启配置
      console.log('下拉刷新')
      setTimeout(function () {
        mpvue.stopPullDownRefresh()
      }, 1000)
    },
    onReachBottom () {
      console.log('上拉拉触底')
    },
    onShow () {
      console.log('home 页面 onShow 读取 ssid ：')
      console.log(this.$store.state.ssid)
    },
    created () {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";
  .kong{
    height: 60rpx;
  }
  .ban-header{
    margin-top: 20rpx;
    font-size: 44rpx;
    line-height: 130rpx;
    font-weight: bold;
    border-top: 1px solid transparent;
  }
  .top{
    height: 108rpx;
    width: 100%;
    /*border-bottom: 1px solid red;*/
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1000;
  }
  .main {
    border-top: 1px solid #fff;
    .top-kong{
      height: 108rpx;
    }
    .ban-1{
      width: 100%;
      height: auto;
      background: #fff;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 4%;
      padding-bottom: 30rpx;
      /*商品分类按钮样式*/
      .type-box{
        margin-top: 30rpx;
        height: auto;
        /*display: -webkit-flex;*/
        /*display: flex;*/
        .type-item{
          height: 200rpx;
          border: none;
          display: inline-block;
          width: 25%;
          text-align: center;
          .type-item-t{
            img{
              margin-top: 10rpx;
              height: 100rpx;
              width: 100rpx;
              background: url("../../../static/images/CommodityNull.png");
              background-size: 100% 100%;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
            }
          }
          .type-item-b{
            color:rgba(40,40,40,1);
          }
        }
      }

      /*动态滚动展示栏*/
      .active-box{
        height: 130rpx;
        border-left: 6rpx solid rgba(255,102,102,1);
        border-radius:6rpx 0 0 6rpx;
        display: -webkit-flex;
        display: flex;
        .active-left{
          width: 150rpx;
          text-align: center;
          p{
            font-size:40rpx;
            font-weight: bold;
            letter-spacing: 4rpx;
          }
        }
        .active-right{
          -webkit-flex: 1;
          flex: 1;
          padding-top: 8rpx;
        }
      }
    }

    .jr-tp,.hw-pt,.yl-tg,.bp-fc{
      @include common-width;
      margin-top: 20rpx;
    }
    .bp-fc{
      .ban-header{
        .tip{
          font-size: 24rpx;
          font-weight: 100;
          float: right;
          span{
            color: #FF6666;
          }
        }
      }
      .bp-fc-img{
        width: 100%;
        height: 300rpx;
        -webkit-border-radius: 15rpx;
        -moz-border-radius: 15rpx;
        border-radius: 15rpx;
        box-shadow: 0rpx 10rpx 20rpx rgba(242,182,122,0.35);
        margin-bottom: 40rpx;
        img{
          width: 100%;
          height: 100%;
          -webkit-border-radius: 15rpx;
          -moz-border-radius: 15rpx;
          border-radius: 15rpx;
        }
      }
    }
  }

</style>
