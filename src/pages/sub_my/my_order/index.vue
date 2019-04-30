<template>
  <section class="order-container">
    <div
      id="navNode"
      :style="'height:'+ fillHeight+'px'"
    >
      <div :class="['nav-list',{fixed:isFixed}]">
        <div
          :class="['nav-item',{on:item.key === currentIndex}]"
          v-for="(item,index) in navList"
          @click="currentIndex = item.key"
          :key="index"
        >{{item.val}}</div>
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
      <div class="scroll-point">{{loadingTxt}}</div>
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
      // 导航默认列表
      navList: [{
        'key': 'all',
        'val': '全部',
        'status': ''
      },
      {
        'key': 'unpaid',
        'val': '待付款',
        'status': [
          1
        ]
      },
      {
        'key': 'paid',
        'val': '待发货',
        'status': [
          3
        ]
      },
      {
        'key': 'shipped',
        'val': '待收货',
        'status': [
          5
        ]
      },
      {
        'key': 'finish',
        'val': '已完成',
        'status': [
          7,
          8,
          9,
          10
        ]
      },
      {
        'key': 'refund',
        'val': '退货退款',
        'status': [
          15
        ]
      }],
      // 加载状态
      isLoading: true,
      // 填充高度
      fillHeight: '',
      // 是否悬浮
      isFixed: false,
      // 选中导航
      currentIndex: 'all',
      // 订单列表
      orderList: [],
      // page参数 page 页码 show页码数量
      queryData: { page: 1, show: 15 }
    }
  },
  onLoad(options) {
    console.log(options)
    // 接收current参数初始化选中的导航index
    this.currentIndex = options.current || 'all'
  },
  mounted() {
    // 获取填充高度
    this.getBoundingClientRect('#navNode', (res) => {
      this.fillHeight = res[0].height;
    })
    // 获取订单列表 接收promise返回导航栏
    this.getOrderList(this.currentIndex).then((navList) => {
      this.navList = navList || this.navList;
    })
  },

  /**
   * @description: 滚动监听
   * @Date: 2019-04-27 19:11:35
   */
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

  /**
   * @description: 下拉刷新
   * @Date: 2019-04-27 19:11:00
   */
  onPullDownRefresh() {
    this.isLoading = true;
    this.queryData.page = 1;
    this.getOrderList(this.currentIndex).then(() => {
      mpvue.stopPullDownRefresh();
    })
  },

  /**
   * @description: 上拉加载
   * @Date: 2019-04-27 19:11:19
   */
  onReachBottom() {
    // （优化）如果正在努力加载中，证明后面还有数据，否则不触发接口。
    if (this.isLoading) {
      this.queryData.page++;
      this.getOrderList(this.currentIndex);
    }
  },
  watch: {
    currentIndex(currentIndex) {
      // 初始数据配置
      this.isLoading = true;
      this.orderList = []
      this.queryData.page = 1;
      // 获取数据
      this.getOrderList(currentIndex)
    }
  },
  computed: {
    loadingTxt() {
      return this.isLoading ? '正在努力加载中...' : '没有更多数据了';
    }
  },
  methods: {
    /**
     * @description: 获取订单列表
     * @param {type}
     * @return: navList
     * @Date: 2019-04-27 16:41:59
     */
    getOrderList(currentIndex) {
      return this.$http.request('get', 'orders', { ...this.queryData, status: currentIndex }).then(({ code, resource }) => {
        if (code === 200) {
          // 如果是第一页，赋值，否则合并
          this.orderList = resource.orderList.current_page === 1 ? resource.orderList.data : this.orderList.concat(resource.orderList.data);
          if (resource.orderList.data.length <= 0 || resource.orderList.data.length < this.queryData.show) { this.isLoading = false }
          console.log(this.orderList)
        } else {
          mpvue.showToast({
            title: '获取失败,请重试',
            icon: 'none',
            duration: 2000
          })
        }
        // 返回导航标签
        return resource.state
      }, () => {
        this.isLoading = false;
      })
    },

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
          url: '../my_unpaid/main?orderId=' + item.id
        })
      } else {
        mpvue.navigateTo({
          url: '../my_status/main?orderId=' + item.id
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
