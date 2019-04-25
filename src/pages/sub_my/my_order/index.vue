<template>
  <section class="order-container">
    <div
      id="navNode"
      :style="'height:'+ fillHeight+'px'"
    >
      <div :class="['nav-list',{fixed:isFixed}]">
        <div
          :class="['nav-item',{on:index === currentIndex}]"
          v-for="(item,index) in navList"
          @click="currentIndex = index"
          :key="index"
        >{{item}}</div>
      </div>
    </div>
    <div class="order-content">
      <div class="order-list">
        <Layout-order-item
          v-for="(item,key) in orderList"
          :key="key"
          :item="item"
          @click="handleSelChange"
        ></Layout-order-item>
      </div>
      <div class="scroll-point">没有更多数据了</div>
    </div>
  </section>
</template>

<script>
import LayoutOrderItem from '@/components/tds-layout/layout-order-item.vue'
export default {
  components: {
    LayoutOrderItem
  },
  data() {
    return {
      // 导航列表
      navList: ['全部', '待付款', '待发货', '待收货', '已完成', '退货退款'],
      // 填充高度
      fillHeight: '',
      // 是否悬浮
      isFixed: false,
      // 选中导航
      currentIndex: 0,
      // 订单列表
      orderList: [
        { order_id: 1, order_num: 2018284658126516, status_str: '待付款', status: 1, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 },
        { order_id: 1, order_num: 2018284658126516, status_str: '待发货', status: 2, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 },
        { order_id: 1, order_num: 2018284658126516, status_str: '待收货', status: 3, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 },
        { order_id: 1, order_num: 2018284658126516, status_str: '已完成', status: 4, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 },
        { order_id: 1, order_num: 2018284658126516, status_str: '退款退货', status: 5, goods_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', goods_name: '飞科电吹风机女家用可折叠大功率理发店不伤发吹风筒男...', goods_money: 55.00 }
      ]
    }
  },
  onLoad(options) {
    console.log(options)
    // 接收current参数初始化选中的导航index
    this.currentIndex = parseInt(options.current) || 0
  },
  mounted() {
    // 获取填充高度
    this.getBoundingClientRect('#navNode', (res) => {
      this.fillHeight = res[0].height;
    })
  },
  onPageScroll(ev) {
    // 监听scroll
    this.getBoundingClientRect('#navNode', (res) => {
      if (res[0].top < 0) {
        this.isFixed = true;
      } else if (res[0].bottom > 0) {
        this.isFixed = false;
      }
    })
  },
  onPullDownRefresh() {
    setTimeout(() => {
      mpvue.stopPullDownRefresh()
    }, 2000)
  },
  onReachBottom() {
    console.log(123)
  },
  methods: {
    /**
     * @description: 点击item
     * @param {Object} item 订单
     * @Date: 2019-04-17 16:27:58
     */
    handleSelChange(item) {
      console.log(item)
      // 使用订单状态判断切换不同page
      if (item.status === 1) {
        mpvue.navigateTo({
          url: '../my_unpaid/main?orderId=' + item.orderId
        })
      } else {
        mpvue.navigateTo({
          url: '../my_status/main?orderId=' + item.order_id
        })
      }
    },

    /**
     * @description: 获取节点信息 mpvueAPI
     * @param {String} node 节点选择器
     * @param {Function} cb 回调函数
     * @Date: 2019-04-22 09:23:50
     */
    getBoundingClientRect(node, cb) {
      let query = mpvue.createSelectorQuery();
      query.select(node).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        cb(res)
      })
    }
  }

}
</script>

<style scoped lang="scss">
.order-container {
  width: 100%;
  height: 100%;
  .nav-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 7px 0 15px;
    background-color: #ffffff;
    border-bottom: 1px solid #f5f5f5;
    &.fixed {
      position: fixed;
      width: 100%;
      z-index: 66;
      left: 0;
      top: 0;
      right: 0;
    }
    .nav-item {
      font-size: 14px;
      color: #b1b1b1;
      text-align: center;
      padding: 12px 0;
      position: relative;
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
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
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
