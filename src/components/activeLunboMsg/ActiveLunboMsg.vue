<template>
  <section class="main">
    <div class="meng"></div>
    <swiper
      v-if="messageList.length > 0 "
      style="height: 120rpx;"
      :indicator-dots="indicatorDots"
      :indicator-color="indicatorColor"
      :indicator-active-color="indicatorActiveColor"
      :current="current"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      :vertical="vertical"
      :display-multiple-items="displayMultipleItems"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
    >
      <block v-for="(item,i) in messageList" :key="i">
        <swiper-item :item-id="i">
          <div class="content">
            <div class="row"><span class="name">{{item.name}}</span><span>{{item.desc}}</span></div>
            <div class="row"><span class="name">{{item.upper_name}}</span><span>{{item.upper_desc}}</span></div>
          </div>
        </swiper-item>
      </block>
    </swiper>
    <section class="no-data" v-else>未有最新动态</section>
  </section>
</template>

<script>
  export default {
    name: 'ActiveLunboMsg',
    props: {
      mesList: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        messageList: this.mesList,
        // 是否显示指示点
        indicatorDots: false,
        // 指示点颜色
        indicatorColor: '#ff0000',
        // 活动的指示点颜色
        indicatorActiveColor: '#00ff00',
        // 当前所在滑块
        current: 0,
        // 是否自动播放
        autoplay: true,
        // 切换间隔时间
        interval: 4000,
        // 滑动动画时长
        duration: 1000,
        // 是否采用衔接滑动
        circular: true,
        // 滑动方向是否为纵向
        vertical: true,
        // 同时显示的滑块数量
        displayMultipleItems: 1,
        // 前边距，可露出前一项的一小部分，px或rpx
        previousMargin: '0rpx',
        // 后边距，可露出后一项的一小部分，px或rpx
        nextMargin: '0rpx',
        // 判断是否执行多个滑块滑动
        twoActive: true
      }
    },
    methods: {},
    watch: {
      mesList: function (val) {
        this.messageList = val;
      }
    }
  }
</script>

<style scoped lang="scss">
  .main{
    position: relative;
    .meng{
      position: absolute;
      top: 0rpx;
      left: 0rpx;
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,0);
      z-index: 999;
    }
    .content{
      width: 100%;
      height: 100%;
      .row{
        width: 100%;
        line-height: 60rpx;
        height:60rpx;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        .name{
          color: #FF6666;
          margin-right: 20rpx;
        }
      }
    }
    .no-data{
      width: 100%;
      height: 120rpx;
      line-height: 120rpx;
      text-align: center;
      color: #BCBCBC;
      letter-spacing: 4rpx;
      font-size: 30rpx;
    }

  }

</style>
