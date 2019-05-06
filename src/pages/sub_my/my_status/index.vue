<template>
  <section class="status-container">

    <div class="status-content">

      <!-- 商品信息 -->
      <Layout-goods-item :item="orderData"></Layout-goods-item>
      <Layout-buyer-item :item="orderData"></Layout-buyer-item>
      <Layout-logistics-item
        @onService="handleService"
        :status="orderData.status"
        :stateList="stateList"
      ></Layout-logistics-item>

    </div>

    <!-- 修改收货 -->
    <Tds-address-popup
      :isShow.sync="isShow"
      :data.sync="formData"
    ></Tds-address-popup>
  </section>
</template>

<script>
import LayoutGoodsItem from '@/components/tds-layout/layout-goods-item'
import LayoutBuyerItem from '@/components/tds-layout/layout-buyer-item'
import LayoutLogisticsItem from '@/components/tds-layout/layout-logistics-item'
import TdsAddressPopup from '@/components/tds-popup/tds-address-popup'
export default {
  components: {
    LayoutGoodsItem,
    LayoutBuyerItem,
    LayoutLogisticsItem,
    TdsAddressPopup
  },
  data() {
    return {
      // 订单Id
      orderId: '',
      // 是否显示弹窗
      isShow: false,
      orderData: {},
      stateList: [],
      formData: { name: '132', tag: '', isNormal: '', phone: 18588419510, address: 'wwww' }
    }
  },
  onLoad(options) {
    // 接受orderId参数
    this.orderId = options.orderId
  },
  mounted() {
    this.getOrderDetail(this.orderId)
  },
  methods: {
    /**
    * @description: 获取订单详情
    * @param {type}
    * @Date: 2019-04-27 19:54:00
    */
    getOrderDetail(id) {
      return this.$http.request('get', 'orders/' + id).then(({ code, resource }) => {
        console.log(resource)
        if (code === 200) {
          // 订单详情
          this.orderData = resource.order;
          this.stateList = resource.state;
          // 设置title
          mpvue.setNavigationBarTitle({
            title: '订单' + this.orderData.mini_status
          })
        } else {
          mpvue.showToast({
            title: '获取失败,请重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    /**
     * @description: 申请售后
     * @Date: 2019-04-19 11:01:46
     */
    handleService() {
      mpvue.showToast({
        title: '暂未开放',
        icon: 'none',
        duration: 2000
      })
      // mpvue.navigateTo({ url: '../my_service/main?orderId=' + this.orderId })
    },
    /**
     * @description: 修改收货地址
     * @Date: 2019-04-19 11:01:26
     */
    handleAddress() {
      this.isShow = !this.isShow;
    }
  }
}
</script>

<style scoped lang="scss">
.status-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  .scroll-view {
    flex: 1;
    overflow: scroll;
  }
  .status-content {
    flex: 1;
    padding: 0 15px 30px;
  }
}
</style>