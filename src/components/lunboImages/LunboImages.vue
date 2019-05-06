<template>
    <section  class="child-container">
      <block v-if="imgUrls.length > 0">
        <div class="custom-dot" v-if="hasDot">
          <span class="dot-l">{{cuttentImg}}</span>
          <span class="dot-r">/{{imgUrls.length}}</span>
        </div>
      </block>
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
        @change="handleImgChange"
      >
        <block v-if="isLink">
          <swiper-item v-for="(item,i) in imgUrls" :key="i" :item-id="i">
            <image :src="item.img_src" class="slide-image custom-bg-img" style="width: 100%;height: 100%;" @click="handleLinkPage(item.path,item.param)"/>
          </swiper-item>
        </block>
        <block v-else>
          <swiper-item v-for="(item,i) in imgUrls" :key="i" :item-id="i">
            <image :src="item" class="slide-image custom-bg-img" style="width: 100%;height: 100%;"/>
          </swiper-item>
        </block>
      </swiper>
    </section>
</template>

<script>
  export default {
    name: 'LunboImages',
    props: {
      // 设置高度
      swiperH: {
        type: String,
        default: '340rpx'
      },
      // 是否带有链接
      hasLink: {
        type: Boolean,
        default: false
      },
      // 数据数组
      imgArr: {
        type: Array,
        required: true
      },
      // 是否显示自定义指示点
      isDot: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        // 设置swiper的高度
        swiperHeight: this.swiperH,
        isLink: this.hasLink,
        imgUrls: this.imgArr,
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
        vertical: false,
        // 同时显示的滑块数量
        displayMultipleItems: 1,
        // 前边距，可露出前一项的一小部分，px或rpx
        previousMargin: '-1rpx',
        // 后边距，可露出后一项的一小部分，px或rpx
        nextMargin: '-1rpx',
        // 当前页面数字
        cuttentImg: 1,
        // 是否显示自定义指示点
        hasDot: this.isDot
      }
    },
    methods: {
      // 点击轮播图片响应
      handleLinkPage (path, param) {
        let url = path
        if (param !== '') {
          url = url + '?' + param;
        }
        console.log('点击轮播图，根据链接地址跳转到不同的页面：');
        console.log(url)
        mpvue.navigateTo({url})
      },
      // 轮播图改变响应
      handleImgChange (detail) {
        // console.log('改变');
        // console.log(detail);
        this.cuttentImg = detail.target.current + 1;
        // console.log('下标改变' + this.cuttentImg);
      }
    },
    watch: {
      imgArr: function (val) {
        this.imgUrls = val;
      }
    },
    created () {
      // console.log('aaaaaaaaaa激活')
    }
  }
</script>

<style scoped lang="scss">
  .child-container{
    position: relative;
    .custom-dot{
      position: absolute;
      bottom: 20rpx;
      right: 30rpx;
      height: 44rpx;
      line-height: 44rpx;
      width: 88rpx;
      text-align: center;
      background:rgba(0,0,0,.4);
      z-index: 1;
      -webkit-border-radius: 12rpx;
      -moz-border-radius: 12rpx;
      border-radius: 12rpx;
      color: #fff;
      letter-spacing: 6rpx;
      .dot-l{
        font-size: 30rpx;
      }
      .dot-r{
        font-size: 22rpx;
        opacity: .5;
      }
    }
    .custom-bg-img{
      background: url("../../../static/images/BannerNull.png");
      background-size: 100% 100%;
    }
  }
</style>
