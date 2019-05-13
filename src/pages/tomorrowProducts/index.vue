<template>
  <section class="container">
    <section class="top" v-if="sharerInfo.type">
      <tds-header></tds-header>
    </section>
    <section class="main">
      <section class="top-kong" v-if="sharerInfo.type"></section>
      <section class="img-list-box">
        <div class="img-list" v-if="dataList.length > 0">
          <block v-for="(item,i) in dataList" :key="i">
            <div class="goods-item">
              <image class="goods-img" :src="item.goods_image_url" mode="widthFix" />
              <p class="good-name"><span class="gou-icon"></span><span>{{item.goods_name}}</span></p>
            </div>
          </block>
        </div>
        <div class="no-data" v-else>暂无数据</div>
      </section>
    </section>

  </section>
</template>

<script>
  import TdsHeader from '@/components/tds-header/tds-header'
  export default {
    data () {
      return {
        dataList: []
      }
    },

    components: {
      TdsHeader
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

    methods: {
      // 获取列表
      getTomorrowData () {
        this.$http.get('goods/preSaleList')
          .then(res => {
            console.log('明日预告：：');
            console.log(res);
            this.dataList = res.resource;
          })
      }
    },
    created () {
    },
    onLoad (options) {
      this.getTomorrowData();
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
      .no-data{
        line-height: 200rpx;
        text-align: center;
        font-size: 30rpx;
        color: #ccc;
      }
    }

  }

</style>
