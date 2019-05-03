<template>
  <section class="container">
    <section>
      <!--<van-icon name="arrow-left" class="go-back" @click="handleGoBack" />-->
      <img src="../../../static/images/Return_iCon.png" class="go-back" @click="handleGoBack" />
    </section>
    <section class="lunbo-box">
      <lunbo-images
        v-if="productData.small_image && productData.small_image.length > 0"
        swiperH="562rpx"
        :imgArr="productData.small_image">
      </lunbo-images>
    </section>
    <section class="main">
      <section class="content">
        <header class="d-head">{{productData.goods_name}}</header>
        <div class="d-price">
          <span class="n"><span>￥</span>{{productData.goods_price}}</span>
          <span class="o"><span>￥</span>{{productData.market_price}}</span>
          <span class="sale-num">{{productData.detail_sales_desc}}</span>
        </div>
        <div class="d-discounts" v-if="false">
          <block v-for="(item,i) in productData.tag" :key="i">
            <span class="d-d-msg">{{item}}</span>
          </block>
        </div>
        <div class="d-sale-time" v-if="timeOut">
          <span class="des">今日团品限时购：</span>
          <span class="time">{{p_h}}</span>:
          <span class="time">{{p_m}}</span>:
          <span class="time">{{p_s}}</span>
        </div>
        <div class="d-type-selecte" @click="handleShowProductType">
          <span class="d-tpye-s-l">选择</span>
          <span v-if="specSelected.num" class="d-tpye-s-r"><span class="shenglue">{{specSelected.xuanze}}</span> * {{specSelected.num}}</span>
          <span v-else class="d-tpye-s-r">规格选择 ></span>
        </div>
        <header class="ban-header">商品详情</header>
        <div class="video-box" v-if="productData.video_url">
          <video class="video"  :src="productData.video_url"></video>
        </div>
        <div class="img-list" v-if="productData.detail_image && productData.detail_image.length > 0">
          <block v-for="(item,i) in productData.detail_image" :key="i">
            <image :src="item" mode="widthFix" />
          </block>
        </div>
      </section>
    </section>
    <section v-if="false" class="hw-pt">
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
      <spec-params-selected :pData="productData" @submit-order="handleSubmitOrder"></spec-params-selected>
    </van-action-sheet>

    <!--分享响应上拉菜单-->
    <van-action-sheet
      :show="shareBoxShow"
      :close-on-click-overlay="true"
      @close="handleCloseShareBox"
    >
      <section class="share-box">
        <header class="share-header">选择分享渠道</header>
        <div class="share-item-box">
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
    <section class="haibao-img" v-if="showPosterImg" @click="handleClosePosterImg">
      <img @click.stop="handleShowPreviewPosterImg" :src="posterImgUrl">
      <p class="haibao-img-p">点击海报 - 长按海报 - 发送给朋友</p>
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
          open-type="contact"
          @contact="handleServiceCall"
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
        // shareBack 表示是否为分享中打开登录后进入该页面,false表示正常的进入，则正常的后退
        shareBack: false,
        // 商品详情，格式如下
        productData: {},
        // 判断是否为掌柜、团长
        isManager: this.$store.getters.isVip,
        // 商品规格上拉弹窗是否显示
        productTypeShow: false,
        // 分享上拉弹窗是否显示
        shareBoxShow: false,
        // 是否显示海报缩略图
        showPosterImg: false,
        // 规格选择子组件传回的数据
        specSelected: {},
        // 海报图片路径
        posterImgUrl: '',
        // 商品是否还有倒计时以及时分秒设置
        timeOut: true,
        p_h: '',
        p_m: '',
        p_s: ''
      }
    },
    methods: {
      // 倒计时显示
      setEndTime () {
        let endTime = new Date(this.productData.end_time).getTime();
        let todayTime = new Date().getTime();
        // 获得间隔秒数
        let tempTime = (endTime - todayTime) / 1000;
        // 如果团购时间已到，则设置停止倒计时
        if (tempTime <= 0) {
          this.timeOut = false;
          clearInterval(this.timeIntval);
          return;
        }
        let h = Math.floor(tempTime / 3600);
        h = h >= 10 ? h : '0' + h;
        let m = Math.floor((tempTime % 3600) / 60);
        m = m >= 10 ? m : '0' + m;
        let s = Math.floor(tempTime - (h * 3600 + m * 60));
        s = s >= 10 ? s : '0' + s;
        // console.log(s);
        this.p_h = h;
        this.p_m = m;
        this.p_s = s;
      },
      // 顶部返回上一页按钮响应
      handleGoBack () {
        console.log('如果是分享进入，则需要点击回退按钮返回到首页中');
        if (this.shareBack) {
          mpvue.reLaunch({
            url: '../home/main'
          })
        } else {
          mpvue.navigateBack({
            delta: 1
          })
        }
      },
      // 底部返回首页按钮响应
      handleGoHome () {
        console.log('返回首页')
        mpvue.reLaunch({
          url: '../home/main'
        })
      },
      // 联系客服按钮响应
      handleServiceCall (e) {
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
          title: '正在生成海报...'
        })
        let tempData = {};
        // 海报生成 type =1 表示生成商品海报，=2 表示生成内部召集令海报，=3 表示生成我的邀请码海报
        tempData.type = 1;
        tempData.id = this.productData.goods_id;
        tempData.uid = this.$store.state.userInfo.id;
        this.$http.get('goods/getShareImage', tempData)
          .then(res => {
            console.log('获得的海报信息：');
            console.log(res);
            that.shareBoxShow = false
            that.showPosterImg = true
            that.posterImgUrl = res.resource;
            mpvue.hideLoading()
          })
      },
      // 点击查看海报预览图
      handleShowPreviewPosterImg () {
        console.log('图片预览')
        mpvue.previewImage({
          urls: [this.posterImgUrl]
        })
      },
      // 点击蒙版，关闭海报弹出层
      handleClosePosterImg () {
        console.log('关闭海报图')
        this.showPosterImg = false;
      },
      // 拼接商品订单提交
      setgoodData () {
        let that = this;
        // 拼接商品订单信息
        let goodData = {};
        //  根据用户选择，获得spu
        this.productData.spu.map(function (value, index, array) {
          if (value.spec_attr === that.specSelected.xuanze) {
            goodData.spu = value;
          }
        })
        // 商品id
        goodData.goods_id = this.productData.goods_id;
        // 商品名称
        goodData.goods_name = this.productData.goods_name;
        // 缩略图
        goodData.goods_image_url = goodData.spu.item_image;
        // 规格拼接字符串
        goodData.spec_attr = goodData.spu.spec_attr;
        // 单位
        goodData.unit = this.productData.unit;
        // 购买个数
        goodData.num = this.specSelected.num
        // 总金额
        goodData.amount = goodData.spu.price * goodData.num
        return goodData;
      },
      // 规格选择子组件提交订单响应
      handleSubmitOrder (options) {
        // console.log('子组件数据')
        // console.log(options)
        this.specSelected = options
        // 拼接的商品订单信息
        let data = JSON.stringify(this.setgoodData());
        console.log('订单信息：');
        console.log(data);
        // 跳转到未付款订单页面
        mpvue.navigateTo({
          url: '../sub_my/my_unpaid/main?orders=' + data
        })
        this.productTypeShow = false
      },
      // 根据id获得商品详情
      getProductData (id) {
        this.$http.get('goods/detail', {id})
          .then(res => {
            console.log('商品详情信息：');
            console.log(res);
            this.productData = res.resource;
            // 现有数据库详情图片数据有误，直接覆盖
            this.productData.detail_image = [
              'http://oss.baidichan.com/store/images/20190325/l6qf0XfRQzO9toyoprcCCQVhavZAhdUMzpAsrXhF.jpeg',
              'http://oss.baidichan.com/store/images/20190325/cravBB0nKulPSS5dc8YWUji4te2b7Jtaj73oQabd.webp',
              'http://oss.baidichan.com/store/images/20190325/4MGe7aAecg5PxY0xm6Ou0Q9Iygt0dUz1b69PjMSw.webp',
              'http://oss.baidichan.com/store/images/20190325/LI2UjHXv19smHhf8tvni6TlO9N92mNRtHMcK9vBO.webp'
            ];
            // console.log(this.productsData)
            this.setEndTime();
            this.timeIntval = setInterval(function () {
              this.setEndTime();
            }.bind(this), 1000);
          })
      }
    },
    // 分享监听
    onShareAppMessage (res) {
      // console.log('进入分享逻辑111111111')
      // console.log(res)
      let uid = this.$store.state.userInfo.id;
      return {
        title: this.productData.goods_name,
        // path: 'pages/productDetail/main?goods_id=' + this.productData.goods_id,
        // 如果需要登录权限才能进入到购买页面，则需要跳转到登录页面判断登录信息，然后才能跳转到商品详情页面
        path: 'pages/start/main?goPath=../productDetail/main&uid=' + uid + '&goods_id=' + this.productData.goods_id,
        imageUrl: this.productData.small_image[0],
        // 回调函数在2018.10之后的新版本中不再有任何回调
        success(res) {
          console.log('分享成功')
        },
        fail(e) {
          console.log('分享失败')
          // 转发失败
        }
      }
    },

    // 页面加载监听
    onLoad (options) {
      // 开启群分享获取信息设置，但当前页不能获得群id等信息
      // mpvue.showShareMenu({
      //   withShareTicket: true
      // })
      if (options.shareBack) {
        this.shareBack = options.shareBack;
      }

      console.log('根据传递的ID值请求商品详情：');
      console.log(options);
      let id = options.goods_id;
      // let id = 188;
      this.getProductData(id);
      // // console.log('根据商品结束时间，开始商品倒计时')

    },
    onUnload () {
      console.log('停止商品倒计时')
      clearInterval(this.timeIntval);
    },
    created () {
    },
    mounted () {
      // console.log('获取用户信息：');
      // console.log(this.$store.state.userInfo)
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
    top: 70rpx;
    left: 20rpx;
    z-index: 1000;
    font-weight: bold;
    font-size: 36rpx;
    line-height: 50rpx;
    height: 30rpx;
    width: 18rpx;
    /*border: 1px solid red;*/
    padding: 15rpx 20rpx;
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
    height: 562rpx;
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
        margin-top: 25rpx;
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
        margin-top: 25rpx;
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

      .video-box{
        width: 100%;
        /*height: 300rpx;*/
        /*height: 300rpx;*/
        /*border: 1px solid red;*/
        margin-bottom: 30rpx;
        .video{
          width: 100%;
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
    top: 0rpx;
    left: 0rpx;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    img{
      position: absolute;
      left: 0rpx;
      right: 0rpx;
      width: 80%;
      height: 80%;
      margin: 8% auto 0;
      -webkit-border-radius: 12rpx;
      -moz-border-radius: 12rpx;
      border-radius: 12rpx;
    }
    .haibao-img-p{
      position: absolute;
      left: 0rpx;
      bottom: 7%;
      width: 100%;
      text-align: center;
      color: #FFFFFF;
      font-size: 30rpx;
      letter-spacing: 4rpx;
    }
  }

  .btn-class{
    margin-left: 50rpx;
  }
</style>
