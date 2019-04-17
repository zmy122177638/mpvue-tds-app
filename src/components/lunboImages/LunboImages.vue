<template>
    <section  class="child-container">
      <swiper
        :style="'height:'+swiperHeight"
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
        <block v-for="(item,i) in imgUrls" :key="i">
          <swiper-item :item-id="i">
            <image :src="item" class="slide-image" style="width: 100%;height: 100%;"/>
          </swiper-item>
        </block>
      </swiper>
    </section>
</template>

<script>
  export default {
    name: 'LunboImages',
    props: {
      swiperH: {
        type: String,
        default: '300rpx'
      }
    },
    data () {
      return {
        // 设置swiper的高度
        swiperHeight: this.swiperH,
        imgUrls: [
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3069259875,1190326871&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1496232587,926948844&fm=27&gp=0.jpg',
          'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
          'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
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
        interval: 3000,
        // 滑动动画时长
        duration: 1000,
        // 是否采用衔接滑动
        circular: true,
        // 滑动方向是否为纵向
        vertical: false,
        // 同时显示的滑块数量
        displayMultipleItems: 1,
        // 前边距，可露出前一项的一小部分，px或rpx
        previousMargin: '-1rpx',
        // 后边距，可露出后一项的一小部分，px或rpx
        nextMargin: '-1rpx'
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
