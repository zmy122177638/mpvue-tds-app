<template>
  <section class="container">
    <section class="top">
      <tds-header></tds-header>
    </section>
    <section class="main">
      <section class="top-kong"></section>
      <section class="img-list-box">
        <div class="img-list">
          <block v-for="(item,i) in dataList" :key="i">
            <div class="goods-item">
              <image class="goods-img" :src="item.imgUrl" mode="widthFix" />
              <p class="good-name"><span class="gou-icon"></span><span>{{item.goods_name}}</span></p>
            </div>
          </block>
        </div>
      </section>
    </section>

  </section>
</template>

<script>
  import TdsHeader from '@/components/tds-header/tds-header'
  export default {
    data () {
      return {
        dataList: [
          {
            goods_name: '全自动雨伞女韩国小清新晴雨两用折叠遮阳防晒防紫外线黑胶太阳伞',
            imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg'
          },
          {
            goods_name: '全自动雨伞女韩国小清新晴雨两用折叠遮阳防晒防紫外线黑胶太阳伞',
            imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3464499095,1074840881&fm=27&gp=0.jpg'
          },
          {
            goods_name: '全自动雨伞女韩国小清新晴雨两用折叠遮阳防晒防紫外线黑胶太阳伞',
            imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg'
          },
          {
            goods_name: '全自动雨伞女韩国小清新晴雨两用折叠遮阳防晒防紫外线黑胶太阳伞',
            imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3464499095,1074840881&fm=27&gp=0.jpg'
          }
        ]
      }
    },

    components: {
      TdsHeader
    },

    methods: {},

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
    line-height: 110rpx;
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

    .top-kong {
      height: 108rpx;
    }

    .img-list-box{
      padding: 60rpx 4%;
      min-height: 200rpx;
      background: #fff;
      margin-top: 20rpx;
      .img-list{
        @include common-width;
        .goods-item{
          margin-bottom: 60rpx;
          .goods-img{
            width: 100%;
            background: url("../../../static/images/GuanggNull.png");
            background-size: 100% 100%;
            margin-bottom: 20rpx;
            -webkit-border-radius: 12rpx;
            -moz-border-radius: 12rpx;
            border-radius: 12rpx;
          }
          .good-name{
            font-size: 34rpx;
            line-height: 50rpx;
            .gou-icon{
              display: inline-block;
              height: 36rpx;
              width: 36rpx;
              background: url("../../../static/images/LOGO2.png");
              background-size: 100% 100%;
              margin-right: 12rpx;
              vertical-align: middle;
              margin-top: -8rpx;
            }
          }
        }
      }
    }

  }

</style>
