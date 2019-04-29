<template>
  <section class="service-container">

    <div class="service-content">
      <!-- 商品信息 -->
      <Layout-goods-item :item="orderData"></Layout-goods-item>

      <!-- 售后 -->
      <div class="service-list">
        <div
          class="service-item"
          v-for="(item,index) in serviceList"
          :key="index"
          @click="handleQuestChange(item)"
        >
          <img
            class="item-icon"
            :src="item.iconPath"
          />
          <div class="item-box">
            <div class="item-label">{{item.label}}</div>
            <div class="item-point">{{item.content}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <Tds-remarks-popup
      :isShow.sync="isShow"
      :title="popupProps.title"
      :placeholder="popupProps.placeholder"
      @submit="questSubmit"
    ></Tds-remarks-popup>
  </section>
</template>

<script>
import LayoutGoodsItem from '@/components/tds-layout/layout-goods-item'
import TdsRemarksPopup from '@/components/tds-popup/tds-remarks-popup'

export default {
  components: {
    LayoutGoodsItem,
    TdsRemarksPopup
  },
  data() {
    return {
      // 订单Id
      orderId: '',
      orderData: {},
      // 服务数据
      serviceList: [
        { label: '仅退款', title: '退款原因', status: 1, content: '未收到货(包含未签收)，或团大师客服协商同意', iconPath: require('../../../../static/images/Refund_iCon.png'), placeholder: '请输入不超过140字的退款说明！' },
        { label: '退货退款', title: '退货原因', status: 2, content: '已收到货，需要退换已收到的货物', iconPath: require('../../../../static/images/Tuihuo_iCon.png'), placeholder: '请输入不超过140字的退货说明！' },
        { label: '换货', title: '换货原因', status: 3, content: '商品存在质量问题，与团大师协商换货', iconPath: require('../../../../static/images/Huanhuo_iCon.png'), placeholder: '请输入不超过140字的换货说明！' },
        { label: '正在退款中...', title: '换货原因', status: 4, content: '退款将在72小时退回您的微信钱包，请耐心等待!', iconPath: require('../../../../static/images/Tuikuan_iCon.png'), placeholder: '请输入不超过140字的换货说明！' }
      ],
      // 是否显示弹窗
      isShow: false,
      // 弹窗props
      popupProps: {}
    }
  },
  onLoad(options) {
    // 接收订单Id
    this.orderId = options.orderId
    console.log(options)
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
     * @description: 售后处理选择
     * @Date: 2019-04-19 09:59:43
     */
    handleQuestChange(item) {
      this.popupProps = item;
      this.isShow = !this.isShow;
    },

    /**
     * @description: 售后问题提交
     * @param {formData} 表单数据
     * @Date: 2019-04-19 10:00:35
     */
    questSubmit(formData) {
      console.log(formData)
      mpvue.showToast({
        title: `提交成功 客服人员将在24小时内与您联系 谢谢您的理解与支持！`,
        icon: 'none',
        duration: 1500
      })
    }
  }
}
</script>

<style scoped lang="scss">
.service-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  .service-content {
    flex: 1;
    padding: 0 15px 30px;
  }

  .service-list {
    margin-top: 15px;
    padding: 0 15px;
    background-color: #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    .service-item {
      border-bottom: 1px solid #f2f2f2;
      padding: 15px 10px;
      display: flex;
      &:nth-last-child(1) {
        border: none;
      }
      .item-icon {
        width: 18px;
        height: 18px;
        display: block;
        margin-right: 10px;
      }
      .item-box {
        flex: 1;
        overflow: hidden;
        .item-label {
          line-height: 18px;
          font-size: 15px;
          color: #282828;
          font-weight: bold;
        }
        .item-point {
          margin-top: 5px;
          font-size: 12px;
          color: #b1b1b1;
        }
      }
    }
  }
}
</style>