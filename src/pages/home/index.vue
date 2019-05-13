<template>
  <section class="container">
    <section
      class="top"
      v-if="sharerInfo.type"
    >
      <tds-header></tds-header>
    </section>
    <section class="main">
      <section
        class="top-kong"
        v-if="sharerInfo.type"
      ></section>
      <section class="ban-1">
        <lunbo-images
          :hasLink="true"
          :imgArr="linkImgUrls"
        >
        </lunbo-images>
        <div class="type-box">
          <div
            class="type-item"
            v-for="(item,i) in typeInfoList"
            :key="i"
            @click="handleClickGo(item.is_show,item.path,item.param)"
          >
            <div class="type-item-t"><img
                :src="item.img_src"
                style="box-shadow: 0rpx 5rpx 10rpx #ccc"
              ></div>
            <div class="type-item-t">{{item.ad_name}}</div>
          </div>
        </div>

        <div class="active-box">
          <div class="active-left">
            <p>最新</p>
            <p>动态</p>
          </div>
          <div class="active-right">
            <active-lunbo-msg :mesList="newActiveData"></active-lunbo-msg>
          </div>
        </div>
      </section>
      <section
        class="jr-tp"
        v-if="regiment.type && regiment.list.length > 0"
      >
        <header class="ban-header">{{regiment.title}}</header>
        <block
          v-for="(item,i) in regiment.list"
          :key="i"
        >
          <pruduct-item
            :itemTpye="regiment.type"
            :goods_data="item"
          ></pruduct-item>
        </block>
      </section>
      <div style="height: 20rpx;"></div>
      <section class="tomorrow-img">
        <img
          @click="handleToTomorrowPage"
          :src="regiment.img_src"
        />
      </section>
      <section
        class="hw-pt"
        v-if="group.type && group.list.length > 0"
      >
        <header class="ban-header">{{group.title}}</header>
        <block
          v-for="(item,i) in group.list"
          :key="i"
        >
          <pruduct-item
            :itemTpye="group.type"
            :goods_data="item"
          ></pruduct-item>
        </block>
      </section>
      <section
        class="yl-tg"
        v-if="special.type && special.list.length > 0"
      >
        <header class="ban-header">{{special.title}}</header>
        <block
          v-for="(item,i) in special.list"
          :key="i"
        >
          <pruduct-item
            :itemTpye="special.type"
            :goods_data="item"
          ></pruduct-item>
        </block>
      </section>
      <section
        class="bp-fc"
        v-if="encore.tpye && encore.list.length > 0"
      >
        <header class="ban-header">
          {{encore.title}}
          <span class="tip">所投票商品将于 <span class="time">2019年4月16日</span> 返场</span>
        </header>
        <section class="bp-fc-img">
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1996499788,3346940487&fm=26&gp=0.jpg" />
        </section>
        <block
          v-for="(item,i) in encore.list"
          :key="i"
        >
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
    <kaidian-youli-btn :userIsVip="userInfo.type"></kaidian-youli-btn>

    <!--分享页面返回之后，判断当前用户是否不等于分享人，而且当前用户是普通用户时显示 返回我的小店按钮-->
    <section
      class="back-my-shop"
      v-if="showBackMyShopBtn"
      @click="handleGoBackMyShop"
    >
      <span class="return-bg"></span>
      返回我的小店
    </section>

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
  data() {
    return {
      // 顶部轮播图数据数组
      linkImgUrls: [],
      // 商品分类按钮信息
      typeInfoList: [],
      // 最新动态氖数组
      newActiveData: [],
      // 引流特供数据
      special: {},
      // 今日团品数据
      regiment: {},
      // 好物拼团
      group: {},
      // 爆品返场
      encore: {},
      // 是否显示返回我的小店按钮
      showBackMyShopBtn: false
    }
  },
  computed: {
    // 分享人信息
    sharerInfo() {
      return this.$store.state.sharerInfo
    },
    // 用户信息
    userInfo () {
      return this.$store.state.userInfo;
    }
  },
  onShow() {
  },
  onLoad() {
    // console.log('用户登录信息--userInfo：');
    // console.log(this.$store.state.userInfo);
    // console.log('分享用户信息--sharerInfo：');
    // console.log(this.$store.state.sharerInfo);
    // console.log('用户登录信息--token：');
    // console.log(this.$store.state.token);
    // console.log('获取菜单按钮位置信息：');
    // console.log(mpvue.getMenuButtonBoundingClientRect());
  },
  onPullDownRefresh () {
    this.getHomePageSetting();
    this.getAllPruductsData();
    this.getNewActiveData();
    let t = setTimeout(function () {
      clearTimeout(t)
      mpvue.stopPullDownRefresh();
    }, 1000);
  },
  created() {
  },
  mounted () {
    this.getHomePageSetting();
    this.getAllPruductsData();
    this.getNewActiveData();
    this.isShowBackMyShopBtn();
  },
  methods: {
    // 判断是否显示返回我的小店按钮
    isShowBackMyShopBtn() {
      // 判断当前用户是否不等于分享人，而且当前用户是vip用户时显示 返回我的小店按钮
      let userIsVip = this.$store.state.userInfo.type;
      let userId = this.$store.state.userInfo.id;
      let shareId = this.$store.state.sharerInfo.id;
      // console.log('判断条件');
      // console.log(userIsVip)
      // console.log(userId)
      // console.log(shareId)
      if (userId !== shareId) {
        this.showBackMyShopBtn = userIsVip;
      } else {
        this.showBackMyShopBtn = false;
      }
    },
    // 返回我的小店
    handleGoBackMyShop () {
      // console.log('返回自己的小店')
      mpvue.showLoading({
        title: '正在返回...',
        mask: true
      })
      setTimeout(function () {
        this.$store.commit({
          type: 'writeSharerInfo',
          sharerInfo: this.$store.state.userInfo
        });
        this.isShowBackMyShopBtn()
        mpvue.hideLoading();
      }.bind(this), 600)
    },
    // 板块分类点击响应
    handleClickGo(i, path, param) {
      // type== 1：引流，2,：团品，3：拼团，4：返场
      if (i === 0) {
        mpvue.showToast({
          title: '此功能未开通',
          icon: 'none'
        })
        return
      }
      let url = path + '?' + param;
      console.log(url)
      mpvue.navigateTo({ url: url })
    },
    // 跳转到明日预告页面响应
    handleToTomorrowPage() {
      mpvue.navigateTo({
        url: '/pages/tomorrowProducts/main'
      })
    },
    // 获取商品列表数据
    getAllPruductsData() {
      this.$http.get('goods/list')
        .then(res => {
          // console.log('四种类型数据列表：');
          // console.log(res);
          // 数据替换
          this.special = res.resource.special;
          this.regiment = res.resource.regiment;
          // this.group = res.resource.group;
          // this.encore = res.resource.encore;
          // console.log('替换的数据：')
          // console.log(this.regiment);
        })
    },
    // 获取首页配置项：轮播图，分类按钮信息
    getHomePageSetting() {
      this.$http.get('conf/getIndexConf')
        .then(res => {
          // console.log('首页设置信息：');
          // console.log(res);
          this.linkImgUrls = res.resource.banner;
          this.typeInfoList = res.resource.lead;
        })
    },
    // 获取最新动态数据
    getNewActiveData() {
      this.$http.get('getReleaseInfo')
        .then(res => {
          // console.log('最新动态信息：');
          // console.log(res);
          this.newActiveData = res.resource;
        })
    },

    // 商品点击跳转到详情响应
    handleGoDetail(i) {
      // console.log('跳转到详情')
      mpvue.navigateTo({
        url: '#?id=' + i
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/scss/index.scss';

.kong {
  height: 60rpx;
}
.ban-header {
  margin-top: 20rpx;
  font-size: 44rpx;
  line-height: 110rpx;
  font-weight: bold;
  border-top: 1px solid transparent;
}
.top {
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
    background-color: #fff;
  }
  .ban-1 {
    width: 100%;
    height: auto;
    background: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 4%;
    padding-bottom: 30rpx;
    /*商品分类按钮样式*/
    .type-box {
      margin-top: 30rpx;
      height: auto;
      /*display: -webkit-flex;*/
      /*display: flex;*/
      .type-item {
        height: 200rpx;
        border: none;
        display: inline-block;
        width: 25%;
        text-align: center;
        .type-item-t {
          img {
            margin-top: 10rpx;
            height: 100rpx;
            width: 100rpx;
            background: url('../../../static/images/CommodityNull.png');
            background-size: 100% 100%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
        .type-item-b {
          color: rgba(40, 40, 40, 1);
        }
      }
    }

    /*动态滚动展示栏*/
    .active-box {
      height: 130rpx;
      border-left: 6rpx solid rgba(255, 102, 102, 1);
      border-radius: 6rpx 0 0 6rpx;
      display: -webkit-flex;
      display: flex;
      .active-left {
        width: 150rpx;
        text-align: center;
        p {
          font-size: 40rpx;
          font-weight: bold;
          letter-spacing: 4rpx;
        }
      }
      .active-right {
        -webkit-flex: 1;
        flex: 1;
        padding-top: 8rpx;
      }
    }
  }

  .jr-tp,
  .hw-pt,
  .yl-tg,
  .bp-fc {
    @include common-width;
    margin-top: 20rpx;
  }
  .bp-fc {
    .ban-header {
      .tip {
        font-size: 24rpx;
        font-weight: 100;
        float: right;
        span {
          color: #ff6666;
        }
      }
    }
    .bp-fc-img {
      width: 100%;
      height: 300rpx;
      -webkit-border-radius: 15rpx;
      -moz-border-radius: 15rpx;
      border-radius: 15rpx;
      box-shadow: 0rpx 10rpx 20rpx rgba(242, 182, 122, 0.35);
      margin-bottom: 40rpx;
      img {
        width: 100%;
        height: 100%;
        -webkit-border-radius: 15rpx;
        -moz-border-radius: 15rpx;
        border-radius: 15rpx;
      }
    }
  }

  .tomorrow-img {
    @include common-width;
    height: 300rpx;
    -webkit-border-radius: 15rpx;
    -moz-border-radius: 15rpx;
    border-radius: 15rpx;
    box-shadow: 0rpx 10rpx 20rpx rgba(255, 102, 102, 0.35);
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    img {
      width: 100%;
      height: 100%;
      -webkit-border-radius: 15rpx;
      -moz-border-radius: 15rpx;
      border-radius: 15rpx;
    }
  }
}

.back-my-shop {
  position: fixed;
  left: 0rpx;
  right: 0rpx;
  bottom: 60rpx;
  margin: 0 auto;
  width: 40%;
  height: 88rpx;
  line-height: 88rpx;
  color: #fff;
  text-align: center;
  -webkit-border-radius: 44rpx;
  -moz-border-radius: 44rpx;
  border-radius: 44rpx;
  box-shadow:0rpx 10rpx 20rpx rgba(255,102,102,0.35);
  background: #FF6666;
  .return-bg{
    display: inline-block;
    width: 48rpx;
    height: 48rpx;
    background: url("../../../static/images/Return2.png");
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 16rpx;
    margin-top: -5rpx;
  }
}

</style>
