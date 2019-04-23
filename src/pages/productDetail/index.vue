<template>
  <section class="container">
    <section><van-icon name="arrow-left" class="go-back" @click="handleGoBack" /></section>
    <section class="lunbo-box">
      <lunbo-images swiperH="600rpx"></lunbo-images>
    </section>
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
          <span v-if="specSelected.num" class="d-tpye-s-r"><span class="shenglue">{{specSelected.xuanze}}</span> * {{specSelected.num}}</span>
          <span v-else class="d-tpye-s-r">规格选择 ></span>
        </div>
        <header class="ban-header">商品详情</header>
        <div class="img-list">
          <block v-for="(item,i) in desImages" :key="i">
            <image :src="item" mode="widthFix" />
          </block>
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
    <section class="kong"></section>

    <!--商品规格选择上拉菜单-->
    <van-action-sheet
      :show="productTypeShow"
      :close-on-click-overlay="true"
      @close="handleCloseProductType"
      >
      <spec-params-selected @submit-order="handleSubmitOrder"></spec-params-selected>
    </van-action-sheet>

    <!--分享响应上拉菜单-->
    <van-action-sheet
      :show="shareBoxShow"
      :close-on-click-overlay="true"
      @close="handleCloseShareBox"
    >
      <section class="share-box">
        <header class="share-header"  v-if="!showPosterImg">选择分享渠道</header>
        <div class="share-item-box" v-if="showPosterImg">
          <div class="share-item">
            <div class="share-item-t">
              <button class="share-btn"
                      :plain="true"
                      open-type="share"
                      id="productShare"
                >
                <img src="http://oss.baidichan.com/store/images/20190325/AMoQAqePdD8oD1AkY1yM5LlVv7q4ZSRT06DrsJu7.jpeg">
              </button>
            </div>
            <div class="share-item-b">保存到本地相册</div>
          </div>
          <div class="share-item">
            <div class="share-item-t">
              <button class="share-btn"
                      :plain="true"
                      @click="handleCreatePosterImg"
              >
                <img src="http://oss.baidichan.com/store/images/20190325/AMoQAqePdD8oD1AkY1yM5LlVv7q4ZSRT06DrsJu7.jpeg">
              </button>
            </div>
            <div class="share-item-b">分享微信好友</div>
          </div>
        </div>
        <div class="share-item-box" v-else>
          <div class="share-item">
            <div class="share-item-t">
              <button class="share-btn"
                      :plain="true"
                      open-type="share"
                      id="productShare"
              >
                <img src="http://oss.baidichan.com/store/images/20190325/AMoQAqePdD8oD1AkY1yM5LlVv7q4ZSRT06DrsJu7.jpeg">
              </button>
            </div>
            <div class="share-item-b">分享微信好友</div>
          </div>
          <div class="share-item">
            <div class="share-item-t">
              <button class="share-btn"
                      :plain="true"
                      @click="handleCreatePosterImg"
              >
                <img src="http://oss.baidichan.com/store/images/20190325/AMoQAqePdD8oD1AkY1yM5LlVv7q4ZSRT06DrsJu7.jpeg">
              </button>
            </div>
            <div class="share-item-b">生成分享海报</div>
          </div>
        </div>
      </section>
    </van-action-sheet>

    <!--海报缩略图-->
    <section class="haibao-img" v-if="showPosterImg">
      <img @click="handleShowPreviewPosterImg" :src="posterImgUrl">
    </section>

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
        <van-goods-action-button
          v-if="isManager"
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
  import SpecParamsSelected from '@/components/specParamsSelected/SpecParamsSelected.vue'
  export default {
    components: {
      LunboImages,
      PruductItem,
      SpecParamsSelected
    },
    data () {
      return {
        // 判断是否为掌柜、团长
        isManager: true,
        // 商品规格上拉弹窗是否显示
        productTypeShow: false,
        // 分享上拉弹窗是否显示
        shareBoxShow: false,
        // 是否显示海报缩略图
        showPosterImg: false,
        // 商品详情图列表
        desImages: [
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2273502388,3322259604&fm=11&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1323345190,1226122086&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=353153124,1043237645&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1253085446,1898506634&fm=26&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2052142394,3437240018&fm=26&gp=0.jpg'
        ],
        // 规格选择子组件传回的数据
        specSelected: {},
        // 海报图片路径
        posterImgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2624716811,1190583056&fm=26&gp=0.jpg'
      }
    },
    methods: {
      // 返回上一页按钮响应
      handleGoBack () {
        // console.log('自定义返回按钮,返回上一页，若没有上一页则返回首页')
        mpvue.navigateBack({
          delta: 1
        })
      },
      // 返回首页按钮响应
      handleGoHome () {
        console.log('返回首页')
        mpvue.reLaunch({
          url: '../home/main'
        })
      },
      // 联系客服按钮响应
      handleServiceCall () {
        console.log('联系客服')
      },
      // 分享按钮响应
      handleGoShare () {
        console.log('前往分享')
        this.shareBoxShow = true
      },
      // 关闭分享弹窗响应
      handleCloseShareBox () {
        this.shareBoxShow = false
        this.showPosterImg = false
      },
      // 立即购买按钮响应
      handleGoBuy () {
        console.log('选择规格然后跳转到订单页面')
        this.productTypeShow = true
      },
      // 规格选择按钮/立即购买按钮 响应
      handleShowProductType () {
        this.productTypeShow = true
      },
      // 规格选择弹窗关闭响应
      handleCloseProductType () {
        this.productTypeShow = false
      },
      // 生成分享海报按钮响应
      handleCreatePosterImg () {
        let that = this
        console.log('向后台请求生成海报')
        mpvue.showLoading({
          title: '正在生成海报...',
          success: function (res) {
            setTimeout(function () {
              mpvue.hideLoading()
              that.shareBoxShow = true
              that.showPosterImg = true
            }, 3000)
          }
        })
      },
      // 点击查看海报预览图
      handleShowPreviewPosterImg () {
        console.log('图片预览')
        mpvue.previewImage({
          urls: [this.posterImgUrl]
        })
      },
      // 子组件提交订单响应
      handleSubmitOrder (options) {
        console.log('子组件数据')
        console.log(options)
        this.specSelected = options
        this.productTypeShow = false
        // 跳转到未付款订单页面
        mpvue.navigateTo({
          url: '../sub_my/my_unpaid/main'
        })
      }
    },
    // 页面显示监听
    onLoad () {
      mpvue.showShareMenu({
        withShareTicket: true
      })
    },
    // 分享监听
    onShareAppMessage (res) {
      // console.log('进入分享逻辑111111111')
      // console.log(res)
      return {
        title: '转发当前商品',
        path: '/pages/productDetail/main?id=210',
        success: function (res) {
          console.log('分享成功')
          // console.log(data)
          // mpvue.getShareInfo({
          //   success: function (d) {
          //     console.log('获取到的群信息：')
          //     console.log(d)
          //   }
          // })
        },
        fail: function (e) {
          // 转发失败
        }
      }
    },
    created () {
    },
    beforeMount () {
      console.log('productDetail挂载')
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

    .kong{
    height: 100rpx;
  }
  .go-back{
    position: absolute;
    top: 60rpx;
    left: 20rpx;
    z-index: 1000;
    font-weight: bold;
    font-size: 36rpx;
    line-height: 50rpx;
    /*border: 1px solid red;*/
    padding: 5rpx 10rpx 0rpx;
  }


  .ban-header{
    margin-top: 10rpx;
    font-size: 44rpx;
    line-height: 130rpx;
    font-weight: bold;
    border-top: 1px solid transparent;
  }

  .lunbo-box{
    width: 100%;
    height: 600rpx;
  }

  .main{
    width: 100%;
    height: auto;
    background: #fff;
    padding-bottom: 20rpx;
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
          display: inline-block;
        }
        .d-tpye-s-r{
          display: inline-block;
          width: 84%;
          float: right;
          color: #B1B1B1;
          text-align: right;
          .shenglue{
            max-width: 90%;
            vertical-align: middle;
            display: inline-block;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
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
    margin-top: 10rpx;
  }

  .share-box{
    @include common-width;
    .share-header{
      text-align: center;
      font-size: 40rpx;
      font-weight: bold;
      height: 90rpx;
      line-height: 90rpx;
      margin-top: 30rpx;
    }
    .share-item-box{
      height: 180rpx;
      margin-bottom: 40rpx;
      display: -webkit-flex;
      display: flex;
      margin-top: 30rpx;
      .share-item{
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        .share-item-t{
          height: 135rpx;
          .share-btn{
            width: 60%;
            padding: 0rpx;
            border: none;
          }
          img{
            width: 100rpx;
            height: 100rpx;
            margin-top: 10rpx;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
        .share-item-b{
          font-size: 24rpx;
        }
      }
    }
  }

  .haibao-img{
    position: fixed;
    top: 100rpx;
    left: 0rpx;
    right: 0rpx;
    margin: auto;
    z-index: 1000;
    width: 76%;
    height: 70%;
    img{
      height: 100%;
      width: 100%;
      -webkit-border-radius: 12rpx;
      -moz-border-radius: 12rpx;
      border-radius: 12rpx;
    }
  }

  .btn-class{
    margin-left: 50rpx;
  }
</style>
