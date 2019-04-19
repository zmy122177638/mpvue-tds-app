<template>
  <section>
    <swiper
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
        <swiper-item :item-id="i" catchtouchmove="stopSwiper">
          <p class="row"><span class="name">{{item.name}}</span><span>{{item.des}}</span></p>
        </swiper-item>
      </block>
    </swiper>
  </section>
</template>

<script>
  export default {
    name: 'ActiveLunboMsg',
    props: {
    },
    data () {
      return {
        messageList: [
          {
            name: '唐伯虎点蚊香',
            des: '过会儿过去而各大水电费好气哦让单反噶水电费噶的说法大声地'
          },
          {
            name: '嘎达是打芬',
            des: '会玩儿童玩儿过水电费感受到法国'
          },
          {
            name: '课题研究儿童画',
            des: '开始是大法官杀人放火委托函胜多负少的，阿哈尔'
          },
          {
            name: '我听不出v',
            des: '将儿童房VB百度翻译而体育课'
          },
          {
            name: '金田一做',
            des: '红烧豆腐给我讨厌你收到货'
          }
        ],
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
        interval: 5000,
        // 滑动动画时长
        duration: 1000,
        // 是否采用衔接滑动
        circular: true,
        // 滑动方向是否为纵向
        vertical: true,
        // 同时显示的滑块数量
        displayMultipleItems: 2,
        // 前边距，可露出前一项的一小部分，px或rpx
        previousMargin: '0rpx',
        // 后边距，可露出后一项的一小部分，px或rpx
        nextMargin: '0rpx'
      }
    },
    methods: {
      handleTouchMove () {
        return false
      }
    },
    stopSwiper () {

    }
  }
</script>

<style scoped lang="scss">
  .row{
    width: 100%;
    line-height: 60rpx;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    .name{
      color: #FF6666;
      margin-right: 20rpx;
    }
  }
</style>
