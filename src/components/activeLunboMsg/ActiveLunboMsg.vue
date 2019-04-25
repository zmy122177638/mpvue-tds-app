<template>
  <section class="main">
    <div class="meng"></div>
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
      @change="handleSwiperChange"
    >
      <block v-for="(item,i) in messageList" :key="i">
        <swiper-item :item-id="i" catchtouchmove="stopSwiper" >
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
            des: '111111111111过会儿过去而各大水电费好气哦让单反噶水电费噶的说法大声地'
          },
          {
            name: '嘎达是打芬',
            des: '22222222222222会玩儿童玩儿过水电费感受到法国'
          },
          {
            name: '课题研究儿童画',
            des: '33333333333333开始是大法官杀人放火委托函胜多负少的，阿哈尔'
          },
          {
            name: '我听不出v',
            des: '444444444444444444将儿童房VB百度翻译而体育课'
          },
          {
            name: '金田一做',
            des: '55555555555555红烧豆腐给我讨厌你收到货'
          },
          {
            name: '好气儿',
            des: '666666666666666红烧豆腐给我讨厌你收到货'
          },
          {
            name: '我二姨太温柔风格',
            des: '7777777777777777777红烧豆腐给我讨厌你收到货'
          },
          {
            name: '名人堂有句话叫',
            des: '888888888888888888888红烧豆腐给我讨厌你收到货'
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
        interval: 2000,
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
        nextMargin: '0rpx',
        // 判断是否执行多个滑块滑动
        twoActive: true
      }
    },
    methods: {
      handleTouchMove () {
      //  无用
      },
      handleSwiperChange (detail) {
        let len = this.messageList.length;
        if (detail.target.current !== len - 1) {
          // console.log('进来了')
          if (this.twoActive) {
            this.current = detail.target.current + 1;
          }
        } else {
          // console.log('滑块改变的值：');
          // console.log(detail.target.current);
          // console.log(len - detail.target.current - 1)
          this.current = 0;
        }
        this.twoActive = !this.twoActive;
      }
    },
    // 禁止滑块手势滑动
    stopSwiper () {
    //  使用这种方法有缺陷：滑动手势操作时，虽然不会产生滑动效果，但是会影响到自动滑动效果
    //  所以换成了蒙版遮罩的方式实现
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
  }

</style>
