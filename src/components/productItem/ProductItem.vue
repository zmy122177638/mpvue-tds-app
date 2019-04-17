<template>
  <section class="item" @click="handleGoDetail">
    <section class="c-1">
      <div class="left">
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3029925626,4050821961&fm=27&gp=0.jpg"/>
      </div>
      <div class="right">
        <div class="t">每日吃播·不能吃还不能看嘛不能吃还不能看不能吃还不能看嘛不能吃还不能看​</div>
        <div class="b">
          <span class="n"><span>￥</span>36.00</span>
          <span class="o"><span>￥</span>59.00</span>
        </div>
      </div>
    </section>
    <section v-if="type == 2 || type == 3" class="c-2">
      <span class="c-2-l">分享赚 ￥6.90， 拼成省 ￥30.00</span>
      <span class="c-2-r">679次分享</span>
    </section>
    <section v-if="type == 2" class="c-3">
      <span class="c-3-l">
        <span class="des">剩余时间：</span>
        <span class="time">10</span>:
        <span class="time">32</span>:
        <span class="time">52</span>
      </span>
      <span class="c-3-r">已售 81%</span>
    </section>
    <section v-if="type == 4" class="c-4">
      <span class="c-4-l">
        <span v-if="i==0" class="num" style="color: #FF0A0A;">No.1</span>
        <span v-else-if="i==1" class="num" style="color: #FFCA00;">No.2</span>
        <span v-else-if="i==2" class="num" style="color: #57A5FF">No.3</span>
        <!--<span v-else class="num">No.{{i+1}}</span>-->
        <span class="des">已有<span>5327人</span>为它投票</span>
      </span>
      <span class="c-4-r">让他返场</span>
    </section>
    <section v-if="type == 3" class="pos-box">两人团</section>
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
      subIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        // type表示不同类型显示的商品信息，1：引流，2,：团品，3：拼团，4：返场
        type: this.itemTpye,
        // i表示下标，用于区分前三排名
        i: this.subIndex
      }
    },
    methods: {
      // 商品点击跳转到详情响应
      handleGoDetail () {
        console.log('跳转到详情');
        mpvue.navigateTo({
          url: '../productDetail/main'
        })
      }
    }

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
    box-shadow:0px 10px 20px rgba(0,0,0,0.05);
    margin-bottom: 30rpx;

    .c-1{
      display: -webkit-flex;
      display:flex;
      height: 180rpx;
      .left{
        -webkit-flex: 1;
        flex: 1;
        img{
          width: 180rpx;
          height: 180rpx;
          -webkit-border-radius: 15rpx;
          -moz-border-radius: 15rpx;
          border-radius: 15rpx;
        }
      }
      .right{
        -webkit-flex: 2;
        flex: 2;
        /*background: #e64340;*/
        .t{
          font-family:PingFang SC;
          font-size: 32rpx;
          line-height: 50rpx;
          height: 100rpx;
          overflow:hidden;
          color: #3e3e3e;
          /*text-align: justify;*/
          display:-webkit-box;
          text-overflow:ellipsis;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          color:rgba(40,40,40,1);
        }
        .b{
          /*font-size: .9rem;*/
          color: #A5A5A5;
          padding-top: 15rpx;
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
        }
      }
    }

    .c-2{
      margin-top: 20rpx;
      height:55rpx;
      line-height: 55rpx;
      .c-2-l{
        background:rgba(255,102,102,.1);
        -webkit-border-radius: 30rpx;
        -moz-border-radius: 30rpx;
        border-radius: 30rpx;
        display: inline-block;
        height: 100%;
        padding: 0 30rpx;
        color:rgba(255,10,10,1);
      }
      .c-2-r{
        float: right;
        color:rgba(177,177,177,1);
      }
    }

    .c-3{
      margin-top: 20rpx;
      height:55rpx;
      line-height: 55rpx;
      .c-3-l{
        color:rgba(40,40,40,1);
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
      .c-3-r{
        float: right;
        color:rgba(177,177,177,1);
      }
    }

    .c-4{
      margin-top: 25rpx;
      height:65rpx;
      .c-4-l{
        line-height: 65rpx;
        .num{
          font-family:Avenir Next;
          font-size: 38rpx;
          font-weight: bold;
          font-style: italic;
          color:rgba(255,10,10,1);
          margin-right: 25rpx;
        }
        .des{
          color:rgba(40,40,40,1);
          span{
            color:rgba(255,10,10,1);
          }
        }
      }
      .c-4-r{
        float: right;
        padding: 10rpx 30rpx;
        background:rgba(255,102,102,1);
        color: #fff;
        -webkit-border-radius: 14rpx;
        -moz-border-radius: 14rpx;
        border-radius: 14rpx;
      }
    }

    /*多人团定位*/
    .pos-box{
      position: absolute;
      top:160rpx;
      right: 0rpx;
      height: 45rpx;
      line-height: 45rpx;
      background:rgba(255,102,102,1);
      border-radius:20px 0px 0px 20px;
      color: #fff;
      padding: 0 20rpx 0 25rpx;
      font-size: 22rpx;
    }

  }
</style>
