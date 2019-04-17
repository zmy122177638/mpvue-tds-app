<template>
  <section class="order-container">
    <div class="nav-list">
      <div
        :class="['nav-item',{on:index === currentIndex}]"
        v-for="(item,index) in navList"
        @click="currentIndex = index"
        :key="index"
        :skip-hidden-item-layout="true"
      >{{item}}</div>
    </div>
    <swiper
      class="order-swiper"
      :current="currentIndex"
      :duration="350"
      @change="handleSwiperChange"
    >
      <swiper-item
        v-for="(item,index) in navList"
        :key="index"
      >
        <scroll-view
          scroll-y
          class="scroll-view"
          @scrolltolower="handleScrollTolower"
        >
          <div class="order-list">
            <Layout-order-item
              v-for="(item,key) in orderList"
              :key="key"
              :item="item"
              @click="handleSelChange"
            ></Layout-order-item>
          </div>
          <div class="scroll-point">没有更多数据了</div>
        </scroll-view>
      </swiper-item>
    </swiper>
  </section>
</template>

<script>
import LayoutOrderItem from '@/components/tds-layout/layout-order-item.vue'
export default {
  components: {
    LayoutOrderItem
  },
  data () {
    return {
      params: {},
      navList: ['全部', '待付款', '待发货', '待收货', '已完成', '退货退款'],
      currentIndex: 0,
      orderList: [
        { order_id: 1, order_num: 2018284658126516, status_str: '待付款', status: 1, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 },
        { order_id: 1, order_num: 2018284658126516, status_str: '待付款', status: 1, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 },
        { order_id: 1, order_num: 2018284658126516, status_str: '待付款', status: 1, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 },
        { order_id: 1, order_num: 2018284658126516, status_str: '待付款', status: 1, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 },
        { order_id: 1, order_num: 2018284658126516, status_str: '待付款', status: 1, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 }
      ]
    }
  },
  onShow (options) {
    this.params = options
  },
  mounted () {

  },
  onPullDownRefresh () {
    // console.log(wx)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 2000)
  },
  methods: {
    /**
     * @description: 切换swiper
     * @Date: 2019-04-17 16:27:17
     */
    handleSwiperChange (event) {
      this.currentIndex = event.target.current
    },

    /**
     * @description: 点击item
     * @param {Object} item 订单
     * @Date: 2019-04-17 16:27:58
     */
    handleSelChange (item) {
      console.log(item)
    },

    /**
     * @description: 上拉加载
     * @param {type}
     * @return: undefined
     * @Date: 2019-04-17 17:13:38
     */
    handleScrollTolower () {
      console.log('加载中...')
    }
  }

}
</script>

<style scoped lang="scss">
.order-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  // nav-header
  .nav-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 7px 0 15px;
    background-color: #ffffff;
    border-bottom: 1px solid #f5f5f5;
    .nav-item {
      font-size: 14px;
      color: #b1b1b1;
      text-align: center;
      padding: 12px 0;
      transition: all 0.3s;
      &:nth-last-child(1) {
        margin-right: 0;
      }
      &::after {
        content: '';
        width: 0px;
        height: 2px;
        background-color: transparent;
        position: absolute;
        bottom: 0;
        left: 50%;
        transition: all 0.3s ease-out;
        transform: translate3d(-50%, 0, 0);
      }
      &.on {
        font-size: 14px;
        color: #282828;
        position: relative;
        font-weight: bold;
        &::after {
          content: '';
          width: 18px;
          background-color: #ff6666;
        }
      }
    }
  }
  // order swiper
  .order-swiper {
    flex: 1;
  }
  // scroll-view
  .scroll-view {
    height: 100%;
  }
  // order
  .order-list {
    margin: 0 15px;
    overflow: hidden;
  }
  .scroll-point {
    font-size: 14px;
    color: #b1b1b1;
    text-align: center;
    padding: 30px 0;
  }
}
</style>
