<template>
  <section class="container">
    <lunbo-images swiperH="500rpx"></lunbo-images>
    <section class="main">
      <section class="content">
        <header class="d-head">ins风全棉纯棉床上用品四件套宿舍床单人3三件套儿童网红被套床笠</header>
        <div class="d-price">
          <span class="n"><span>￥</span>36.00</span>
          <span class="o"><span>￥</span>59.00</span>
          <span class="sale-num">已售 5124 件</span>
        </div>
        <div class="d-discounts">
          <span class="d-d-msg">立省30元</span>
          <span class="d-d-msg">全场包邮</span>
        </div>
        <div class="d-sale-time">
          <span class="des">今日团品限时购：</span>
          <span class="time">10</span>:
          <span class="time">32</span>:
          <span class="time">52</span>
        </div>
        <div class="d-type-selecte" @click="handleShowProductType">
          <span class="d-tpye-s-l">选择</span>
          <span class="d-tpye-s-r">规格选择 ></span>
        </div>
        <header class="ban-header">商品详情</header>
        <div class="img-list">
            <image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2273502388,3322259604&fm=11&gp=0.jpg" mode="widthFix" /><image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1323345190,1226122086&fm=27&gp=0.jpg" />
            <image src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=353153124,1043237645&fm=27&gp=0.jpg" />
            <image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1253085446,1898506634&fm=26&gp=0.jpg" />
            <image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2052142394,3437240018&fm=26&gp=0.jpg" />
        </div>
      </section>
    </section>
    <section class="hw-pt">
      <header class="ban-header">热门拼团</header>
      <block v-for="i in 6" :key="i">
        <pruduct-item
          :itemTpye="3"
        ></pruduct-item>
      </block>
    </section>

    <!--商品规格选择上拉菜单-->
    <van-action-sheet
      :show="productTypeShow"
      :close-on-click-overlay="true"
      @close="handleCloseProductType"
      >
      <div style="height: 500rpx;">商品规格内容</div>
    </van-action-sheet>
    <!--底部固定按钮栏-->
    <section class="fixld-bottom">
      <van-goods-action style="z-index: 19999;">
        <van-goods-action-icon
          icon="wap-home"
          text="首页"
          @click="handleGoHome"
        />
        <van-goods-action-icon
          icon="chat-o"
          text="客服"
          info="5"
          @click="handleServiceCall"
        />
        <van-goods-action-icon
          v-if="!isManager"
          disabled
        />
        <van-goods-action-button
          v-else
          text="立即分享"
          type="warning"
          @click="handleGoShare"
        />
        <van-goods-action-button
          text="立即购买"
          @click="handleGoBuy"
        />
      </van-goods-action>
    </section>
  </section>
</template>

<script>
  import LunboImages from '@/components/lunboImages/LunboImages.vue'
  import PruductItem from '@/components/productItem/ProductItem.vue'
  export default {
    components: {
      LunboImages,
      PruductItem
    },
    data () {
      return {
        // 判断是否为掌柜、团长
        isManager: true,
        // 商品规格上拉弹窗是否显示
        productTypeShow: false
      }
    },
    methods: {
      handleGoHome () {
        console.log('返回首页')
        mpvue.reLaunch({
          url: '../home/main'
        })
      },
      handleServiceCall () {
        console.log('联系客服')
      },
      handleGoShare () {
        console.log('前往分享')
      },
      handleGoBuy () {
        console.log('前往付款')
      },
      handleShowProductType () {
        this.productTypeShow = true
      },
      handleCloseProductType () {
        this.productTypeShow = false
      }
    },

    created () {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  .ban-header{
    margin-top: 10rpx;
    font-size: 44rpx;
    line-height: 130rpx;
    font-weight: bold;
    border-top: 1px solid transparent;
  }

  .main{
    width: 100%;
    height: auto;
    background: #fff;
    padding-bottom: 50rpx;
    padding-top: 30rpx;
    .content{
      @include common-width;

      .d-head{
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
      }

      .d-price{
        color: #A5A5A5;
        line-height: 60rpx;
        .n{
          font-weight: bold;
          font-size:40rpx;
          color:rgba(255,10,10,1);
          margin-right: 20rpx;
          span{
            font-size: 28rpx;
          }
        }
        .o{
          font-weight: bold;
          text-decoration: line-through;
          font-weight: bold;
          color:rgba(177,177,177,1);
          span{
            font-size: 23rpx;
          }
        }
        .sale-num{
          float: right;
        }
      }

      .d-discounts{
        margin: 25rpx 0rpx;
        .d-d-msg{
          display: inline-block;
          font-size: 24rpx;
          padding: 5rpx 25rpx;
          background:rgba(255,102,102,.1);
          color:#FF0A0A;
          margin-right: 20rpx;
          -webkit-border-radius: 12rpx;
          -moz-border-radius: 12rpx;
          border-radius: 12rpx;
          margin-bottom: 15rpx;
        }
      }

      .d-sale-time{
        height: 70rpx;
        color:rgba(40,40,40,1);
        margin-bottom:20rpx;
        .des{
          font-weight: bold;
        }
        .time{
          display: inline-block;
          height: 45rpx;
          width: 45rpx;
          line-height: 45rpx;
          font-weight: 100;
          text-align: center;
          background:rgba(255,102,102,1);
          -webkit-border-radius: 14rpx;
          -moz-border-radius: 14rpx;
          border-radius: 14rpx;
          margin-right: 8rpx;
          font-size: 24rpx;
          color: #fff;
        }
      }

      .d-type-selecte{
        height: 88rpx;
        background:rgba(246,248,250,1);
        -webkit-border-radius: 10rpx;
        -moz-border-radius: 10rpx;
        border-radius: 10rpx;
        line-height: 88rpx;
        font-weight: bold;
        padding: 0 4%;
        .d-tpye-s-l{
        }
        .d-tpye-s-r{
          float: right;
          color: #B1B1B1;
        }
        &:hover{
           background: rgba(236,238,240,1);
         }
      }

      .img-list{
        width: 100%;
        image{
          width: 100%;
        }
      }

    }
  }
  .hw-pt{
    @include common-width;
    margin-top: 20rpx;
  }
  .btn-class{
    margin-left: 50rpx;
  }
</style>
