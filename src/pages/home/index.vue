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
            <div class="type-item" v-for="(item,i) in typeInfoList" :key="i" @click="handleClickGo(i,item.path,item.param)">
              <div class="type-item-t"><img :src="item.img_src" :style="'box-shadow: 0rpx 10rpx 20rpx ' + item.shadow_color "></div>
              <div class="type-item-t">{{item.ad_name}}</div>
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
      <section class="jr-tp"  v-if="regiment">
        <header class="ban-header">{{regiment.title}}</header>
        <block v-for="(item,i) in regiment.list" :key="i">
          <pruduct-item
            :itemTpye="regiment.type"
            :goods_data="item"
          ></pruduct-item>
        </block>
      </section>
      <div style="height: 20rpx;"></div>
      <section class="tomorrow-img">
        <img @click="handleToTomorrowPage" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1533275126,1287779573&fm=26&gp=0.jpg" />
      </section>
      <section class="hw-pt">
        <header class="ban-header">{{group.title}}</header>
        <block v-for="(item,i) in group.list" :key="i">
          <pruduct-item
            :itemTpye="group.type"
            :goods_data="item"
          ></pruduct-item>
        </block>
      </section>
      <section class="yl-tg">
        <header class="ban-header">{{special.title}}</header>
        <block v-for="(item,i) in special.list" :key="i">
          <pruduct-item
            :itemTpye="special.type"
            :goods_data="item"
          ></pruduct-item>
        </block>
      </section>
      <section class="bp-fc">
        <header class="ban-header">
          {{encore.title}}
          <span class="tip">所投票商品将于 <span class="time">2019年4月16日</span> 返场</span>
        </header>
        <section class="bp-fc-img">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1996499788,3346940487&fm=26&gp=0.jpg" />
        </section>
        <block v-for="(item,i) in encore.list" :key="i">
          <pruduct-item
            :itemTpye="encore.type"
            :goods_data="item"
            :subIndex="i"
          ></pruduct-item>
        </block>
      </section>
    </section>
    <section class="kong"></section>
    <!--开店礼包按钮，如果用户是会员则不需要显示-->
    <kaidian-youli-btn></kaidian-youli-btn>
  </section>
</template>

<script>
  import TdsHeader from '@/components/tds-header/tds-header'
  import LunboImages from '@/components/lunboImages/LunboImages.vue'
  import ActiveLunboMsg from '@/components/activeLunboMsg/ActiveLunboMsg.vue'
  import PruductItem from '@/components/productItem/ProductItem.vue'
  import KaidianYouliBtn from '@/components/kaidianYouliBtn/KaidianYouliBtn.vue'

  export default {
    components: {
      TdsHeader,
      LunboImages,
      ActiveLunboMsg,
      PruductItem,
      KaidianYouliBtn
    },
    data () {
      return {
        // 顶部轮播图数据数组
        linkImgUrls: [],
        // 商品分类按钮信息
        typeInfoList: [],
        // 引流特供数据
        special: {},
        // 今日团品数据
        regiment: {},
        // 好物拼团
        group: {},
        // 爆品返场
        encore: { }
      }
    },
    methods: {
      // 板块分类点击响应
      handleClickGo (i, path, param) {
        // type== 1：引流，2,：团品，3：拼团，4：返场
        if (i === 2 || i === 3) {
          mpvue.showToast({
            title: '此功能未开通',
            icon: 'none'
          })
          return
        }
        let url = path + '?' + param;
        console.log(url)
        mpvue.navigateTo({url: url})
      },
      // 商品点击跳转到详情响应
      handleGoDetail (i) {
        console.log('跳转到详情')
        mpvue.navigateTo({
          url: '#?id=' + i
        })
      },
      // 跳转到明日预告页面响应
      handleToTomorrowPage () {
        mpvue.navigateTo({
          url: '../tomorrowProducts/main'
        })
      },
      // 获取商品列表数据
      getAllPruductsData () {
        this.$http.get('goods/list')
          .then(res => {
            // console.log('返回的数据：');
            // console.log(res);
            // 数据替换
            this.special = res.resource.special;
            this.regiment = res.resource.regiment;
            this.group = res.resource.group;
            this.encore = res.resource.encore;
            // console.log('替换的数据：')
            // console.log(this.regiment);
          })
      },
      // 获取首页配置项：轮播图，分类按钮信息
      getHomePageSetting () {
        this.$http.get('conf/getIndexConf')
          .then(res => {
            // console.log('首页设置信息：：');
            // console.log(res);
            this.linkImgUrls = res.resource.banner;
            this.typeInfoList = res.resource.lead;
          })
      }
    },
    onShow () {
      console.log('home 页面 onShow 读取 token 和用户数据 ：')
      console.log(this.$store.state.token)
      console.log(this.$store.state.userInfo)
    },
    onLoad () {
      this.getHomePageSetting();
      this.getAllPruductsData();
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

    .tomorrow-img{
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
      }
    }

  }


</style>
