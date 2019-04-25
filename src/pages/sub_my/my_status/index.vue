<template>
  <section class="status-container">

    <div class="status-content">

      <!-- 商品信息 -->
      <Layout-goods-item></Layout-goods-item>
      <Layout-buyer-item @setAddress="handleAddress"></Layout-buyer-item>
      <Layout-logistics-item @onService="handleService"></Layout-logistics-item>

    </div>

    <!-- 修改收货 -->
    <Tds-address-popup :isShow.sync="isShow" :data.sync="formData"></Tds-address-popup>
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
      orderId: 0,
      // 是否显示弹窗
      isShow: false,
      formData: { name: '132', tag: '', isNormal: '', phone: 18588419510, address: 'wwww' }
    }
  },
  onLoad(options) {
    // 接受orderId参数
    this.orderId = options.orderId
  },

  methods: {
    /**
     * @description: 申请售后
     * @Date: 2019-04-19 11:01:46
     */
    handleService() {
      mpvue.navigateTo({ url: '../my_service/main' })
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