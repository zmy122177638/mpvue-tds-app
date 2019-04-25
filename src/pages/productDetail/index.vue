<template>
  <section class="container">
    <section>
      <!--<van-icon name="arrow-left" class="go-back" @click="handleGoBack" />-->
      <img src="../../../static/images/Return_iCon.png" class="go-back" @click="handleGoBack" />
    </section>
    <section class="lunbo-box">
      <lunbo-images
        swiperH="600rpx"
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
        <div class="img-list">
          <block v-for="(item,i) in productData.detail_image" :key="i">
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
        // 商品详情
        productData: {
          // tag: ['立省30元', '全场包邮', '给我而非', '立省30元', '全场包邮', '给我而非'],
          goods_id: 391,
          goods_name: '测试商品请勿下单',
          small_image: [
            '',
            'http://oss.baidichan.com/store/images/20190325/5izy0JXzXnumKgnHNK0AQIuQgLHqJYFFkDGqLavu.jpeg',
            'http://oss.baidichan.com/store/images/20190325/09AT8wCGqY2sZbeDWDuCSnPMVq6PY0IajG0ikQlw.jpeg',
            'http://oss.baidichan.com/store/images/20190325/KkuUL9uMpByx8y00iA7KzS9zRQUcTAR9yMRJI8aG.jpeg'
          ],
          detail_image: [
            'http://oss.baidichan.com/store/images/20190325/l6qf0XfRQzO9toyoprcCCQVhavZAhdUMzpAsrXhF.jpeg',
            'http://oss.baidichan.com/store/images/20190325/cravBB0nKulPSS5dc8YWUji4te2b7Jtaj73oQabd.webp',
            'http://oss.baidichan.com/store/images/20190325/4MGe7aAecg5PxY0xm6Ou0Q9Iygt0dUz1b69PjMSw.webp',
            'http://oss.baidichan.com/store/images/20190325/LI2UjHXv19smHhf8tvni6TlO9N92mNRtHMcK9vBO.webp'
          ],
          goods_price: '0.01',
          market_price: '99.00',
          stock: 100,
          unit: '台',
          weight: 250,
          goods_desc: '',
          sales_count: 3002,
          video_url: '',
          status: 1,
          end_time: '2019/04/26 14:08:00',
          limit_num: 2,
          spec: [
            {
              'spec_name': '款式',
              'spec_attr': [
                '自动款',
                '手动款'
              ],
              'params_child_has_del': true
            },
            {
              'spec_name': '颜色',
              'spec_attr': [
                '白色',
                '黄色'
              ],
              'params_child_has_del': true
            }
          ],
          spu: [
            {
              'spec_attr_arr': [],
              'spec_attr': '自动款-白色',
              'stock': 50,
              'price': 0.01,
              'goods_no': '0001',
              'item_image': 'http://oss.baidichan.com/store/images/20190325/AMoQAqePdD8oD1AkY1yM5LlVv7q4ZSRT06DrsJu7.jpeg'
            },
            {
              'spec_attr_arr': [],
              'spec_attr': '自动款-黄色',
              'stock': 20,
              'price': 0.02,
              'goods_no': '0002',
              'item_image': 'http://oss.baidichan.com/store/images/20190325/9hvuYDv2qX2Dj1VRmjDGsVBZjMBesEAiLfnF2hiG.jpeg'
            },
            {
              'spec_attr_arr': [],
              'spec_attr': '手动款-白色',
              'stock': 10,
              'price': 0.01,
              'goods_no': '0003',
              'item_image': 'http://oss.baidichan.com/store/images/20190325/PN8ZHudQRhzt3brpeGrfaF6H3vLb6YIDZzPzyMMW.jpeg'
            },
            {
              'spec_attr_arr': [],
              'spec_attr': '手动款-黄色',
              'stock': 20,
              'price': 0.04,
              'goods_no': '0004',
              'item_image': 'http://oss.baidichan.com/store/images/20190325/A3nJkwHe44mQ8XL2VTxV3i9DlpVr41S0NhOuTBO8.jpeg'
            }
          ],
          charge_zone: '',
          unshipping_zone: '',
          detail_sales_desc: '已售 3002 台',
          charge_zone: ['青海', '西藏', '甘肃'],
          // 不发货地区
          unshipping_zone: [
            '新疆',
            '内蒙古'
          ],
          user_info: {
            'id': 3,
            'uid': 1,
            'consignee': '12323',
            'consignee_mobile': '1369085077 9',
            'consignee_area_id': '1,2,3',
            'address': '广东省惠州市惠阳区世贸广场1',
            'is_default': 1,
            'tag': '',
            'created_at': '2019-04-17 14:03:10',
            'updated_at': '2019-04-17 12:03:10',
            'area': null
          },
          limit_text: '团大师价 ￥0.01'
        },
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
        posterImgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2624716811,1190583056&fm=26&gp=0.jpg',
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
        // console.log('自定义返回按钮,返回上一页，若没有上一页则返回首页')
        mpvue.navigateBack({
          delta: 1
        })
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
      // 规格选择子组件提交订单响应
      handleSubmitOrder (options) {
        console.log('子组件数据')
        console.log(options)
        this.specSelected = options
        this.productTypeShow = false
        // 跳转到未付款订单页面
        // mpvue.navigateTo({
        //   url: '../sub_my/my_unpaid/main'
        // })
      }
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

    // 页面加载监听
    onLoad (options) {
      console.log('根据传递的ID值请求商品详情：');
      console.log(options);

      // console.log('根据商品结束时间，开始商品倒计时')
      this.setEndTime();
      this.timeIntval = setInterval(function () {
        this.setEndTime();
      }.bind(this), 1000);
      // 开启群分享获取信息设置
      mpvue.showShareMenu({
        withShareTicket: true
      })
    },
    onUnload () {
      console.log('停止商品倒计时')
      clearInterval(this.timeIntval);
    },
    created () {
    },
    mounted () {

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
