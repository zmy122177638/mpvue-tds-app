<template>
  <section
    class="item"
    @click="handleGoDetail(itemData.goods_id)"
  >
    <section class="c-1">
      <div class="left">
        <img class="custom-bg-img" :src="itemData.goods_image_url"/>
      </div>
      <div class="right">
        <div class="t">{{itemData.goods_name}}</div>
        <div class="b">
          <span class="n"><span>￥</span>{{itemData.goods_price}}</span>
          <span class="o"><span>￥</span>{{itemData.market_price}}</span>
        </div>
      </div>
    </section>
    <section
      v-if="type == 2 || type == 3"
      class="c-2"
    >
      <span class="c-2-l">{{itemData.tip_bar}}</span>
      <span class="c-2-r">{{itemData.share_desc}}</span>
    </section>
    <section
      v-if="type == 2"
      class="c-3"
    >
      <span class="c-3-l" v-if="timeOut">
       <span class="des">剩余时间：</span>
        <span class="time">{{p_h}}</span>:
        <span class="time">{{p_m}}</span>:
        <span class="time">{{p_s}}</span>
      </span>
      <span v-else>商品已过期</span>
      <span class="c-3-r">{{itemData.sales_desc}}</span>
    </section>
    <section
      v-if="type == 4"
      class="c-4"
    >
      <span class="c-4-l">
        <span
          v-if="i==0"
          class="num"
          style="color: #FF0A0A;"
        >No.1</span>
        <span
          v-else-if="i==1"
          class="num"
          style="color: #FFCA00;"
        >No.2</span>
        <span
          v-else-if="i==2"
          class="num"
          style="color: #57A5FF"
        >No.3</span>
        <!--<span v-else class="num">No.{{i+1}}</span>-->
        <span class="des">已有<span>5327人</span>为它投票</span>
      </span>
      <span v-if="VoteStatus == 0" class="c-4-r" @click.stop="handleNetworkVote">让他返场</span>
      <span v-if="VoteStatus == 1" class="c-4-r" @click.stop="">投票中 ...</span>
      <span v-if="VoteStatus == 2" class="c-4-r disable-click">已投票</span>
    </section>
    <section
      v-if="type == 3"
      class="pos-box"
    >两人团</section>
  </section>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    itemTpye: {
      type: Number,
      default: 1
    },
    goods_data: {
      type: Object,
      required: true
    },
    subIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // type表示不同类型显示的商品信息，type：1：引流，2,：团品，3：拼团，4：返场
      type: this.itemTpye,
      // itemData 表示列表项数据
      itemData: this.goods_data,
      // i表示下标，用于区分前三排名
      i: this.subIndex,
      // 投票状态:0--未投票，1--投票中，2--已投票
      VoteStatus: 0,
      // 商品是否还有倒计时以及时分秒设置
      timeOut: true,
      p_h: '',
      p_m: '',
      p_s: ''
    }
  },
  computed: {
    // 用户是否为VIP
    userInfoType () {
      return this.$store.state.userInfo.type;
    }
  },
  methods: {
    // 设置倒计时
    setEndTime () {
      let endTime = new Date(this.itemData.end_time).getTime();
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
    // 商品点击跳转到详情响应
    handleGoDetail(id) {
      console.log('跳转到详情');
      // 判断是否有权限跳转到详情购买商品
      if (this.$store.state.userInfo.type) {
        if (this.$store.state.userInfo.id === this.$store.state.sharerInfo.id) {
          // 分享人是自己，即在自己的小店中，则可以进入
          mpvue.navigateTo({
            // url: '../productDetail/main?goods_id=' + id
            url: '/pages/productDetail/main?goods_id=' + id
          })
        } else {
          // 分享人是其他人，则不能进入
          mpvue.showToast({
            title: '请回到自己的小店或重新扫码进入',
            icon: 'none'
          })
        }
      } else {
        mpvue.showModal({
          title: '提示',
          content: '先成为会员，点击确定去到充值页面',
          success: function (res) {
            if (res.confirm) {
              // 弹出提示跳转到会员充值页面
              mpvue.navigateTo({
                url: '/pages/openShop/main'
              })
            }
          }
        })
      }
    },
    // 返场投票点击
    handleNetworkVote () {
      console.log('返场投票点击')
      this.VoteStatus = 1;
      setTimeout(function () {
        this.VoteStatus = 2;
      }.bind(this), 3000)
    }
  },
  watch: {
    itemTpye: function (nVal, oVal) {
      this.type = nVal
    },
    goods_data: function (nVal, oVal) {
      this.itemData = nVal;
    },
    subIndex: function (nVal, oVal) {
      this.i = nVal
    }
  },
  mounted () {
    // 只有团品才需要倒计时
    if (this.type == 2) {
      // console.log('根据商品结束时间，开始商品倒计时')
      this.setEndTime();
      this.timeIntval = setInterval(function () {
        this.setEndTime();
      }.bind(this), 1000);
    }
  }
  // 组件销毁时，清除计时器
  // destroyed () {
  //   console.log('销毁')
  //   clearInterval(this.timeIntval);
  // }

}
</script>

<style scoped lang="scss">
.item {
  position: relative;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: 15rpx;
  -moz-border-radius: 15rpx;
  border-radius: 15rpx;
  padding: 16px 4%;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30rpx;

  .c-1 {
    display: -webkit-flex;
    display: flex;
    height: 180rpx;
    .left {
      -webkit-flex: 1;
      flex: 1;
      img {
        width: 180rpx;
        height: 180rpx;
        -webkit-border-radius: 15rpx;
        -moz-border-radius: 15rpx;
        border-radius: 15rpx;
        background: url("../../../static/images/CommodityNull.png");
        background-size: 100% 100%;
      }
    }
    .right {
      -webkit-flex: 2;
      flex: 2;
      /*background: #e64340;*/
      .t {
        font-family: PingFang SC;
        font-size: 32rpx;
        line-height: 50rpx;
        height: 100rpx;
        overflow: hidden;
        color: #3e3e3e;
        /*text-align: justify;*/
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: rgba(40, 40, 40, 1);
      }
      .b {
        /*font-size: .9rem;*/
        color: #a5a5a5;
        padding-top: 15rpx;
        .n {
          font-weight: bold;
          font-size: 40rpx;
          color: rgba(255, 10, 10, 1);
          margin-right: 20rpx;
          span {
            font-size: 28rpx;
          }
        }
        .o {
          font-weight: bold;
          text-decoration: line-through;
          font-weight: bold;
          color: rgba(177, 177, 177, 1);
          span {
            font-size: 23rpx;
          }
        }
      }
    }
  }

  .c-2 {
    margin-top: 20rpx;
    min-height: 55rpx;
    line-height: 55rpx;
    text-align: right;
    .c-2-l {
      background: rgba(255, 102, 102, 0.1);
      -webkit-border-radius: 30rpx;
      -moz-border-radius: 30rpx;
      border-radius: 30rpx;
      display: inline-block;
      height: 55rpx;
      padding: 0 30rpx;
      color: rgba(255, 10, 10, 1);
      float: left;
    }
    .c-2-r {
      display: inline-block;

      color: rgba(177, 177, 177, 1);
    }
  }

  .c-3 {
    margin-top: 20rpx;
    height: 55rpx;
    line-height: 55rpx;
    .c-3-l {
      color: rgba(40, 40, 40, 1);
      .des {
        font-weight: bold;
      }
      .time {
        display: inline-block;
        height: 45rpx;
        width: 45rpx;
        line-height: 45rpx;
        font-weight: 100;
        text-align: center;
        background: rgba(255, 102, 102, 1);
        -webkit-border-radius: 14rpx;
        -moz-border-radius: 14rpx;
        border-radius: 14rpx;
        margin-right: 8rpx;
        font-size: 24rpx;
        color: #fff;
      }
    }
    .c-3-r {
      float: right;
      color: rgba(177, 177, 177, 1);
    }
  }

  .c-4 {
    margin-top: 25rpx;
    height: 65rpx;
    .c-4-l {
      line-height: 65rpx;
      .num {
        font-family: Avenir Next;
        font-size: 38rpx;
        font-weight: bold;
        font-style: italic;
        color: rgba(255, 10, 10, 1);
        margin-right: 25rpx;
      }
      .des {
        color: rgba(40, 40, 40, 1);
        span {
          color: rgba(255, 10, 10, 1);
        }
      }
    }
    .c-4-r {
      float: right;
      padding: 10rpx 30rpx;
      background: rgba(255, 102, 102, 1);
      color: #fff;
      -webkit-border-radius: 14rpx;
      -moz-border-radius: 14rpx;
      border-radius: 14rpx;
      &.disable-click{
        background: #F6F8FA;
        color: #B1B1B1;
      }
    }
  }

  /*多人团定位*/
  .pos-box {
    position: absolute;
    top: 160rpx;
    right: 0rpx;
    height: 45rpx;
    line-height: 45rpx;
    background: rgba(255, 102, 102, 1);
    border-radius: 20px 0px 0px 20px;
    color: #fff;
    padding: 0 20rpx 0 25rpx;
    font-size: 22rpx;
  }
}
</style>
