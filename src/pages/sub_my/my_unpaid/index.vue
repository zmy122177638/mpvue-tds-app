<template>
  <section class="unpaid-container">
    <!-- 内容 -->
    <div class="unpaid-content">
      <div class="unpaid-list">
        <!-- 商品信息 -->
        <Layout-goods-item :item="orderData"></Layout-goods-item>
        <!-- 有默认地址 -->
        <div
          class="section-item"
          v-if="addressData.consignee"
        >
          <div class="section-title">
            <div class="title-left">收货信息</div>
          </div>
          <div
            class="receiver-info"
            @click="navigateToAddress()"
          >
            <img
              class="receiver-icon"
              src="../../../../static/images/Dingwei_iCon.png"
            >
            <div class="receiver-name">{{addressData.consignee}}&nbsp;&nbsp;&nbsp;{{addressData.consignee_mobile}}</div>
            <div class="receiver-location">{{addressData.consignee_address}}</div>
          </div>
        </div>
        <!-- 没有默认地址 -->
        <div
          v-else
          class="section-item"
          @click="navigateToAddress()"
        >
          <div class="no-address">
            <img
              class="no-address-icon"
              src="../../../../static/images/add.png"
            >
            <div class="no-address-txt">选择收货地址</div>
          </div>
        </div>
        <!-- 备注 -->
        <div class="section-item">
          <div class="remarks-box">
            <div class="box-label">备注</div>
            <div class="box-value">
              <textarea
                :auto-height="false"
                placeholder="请输入你的备注信息"
                :value="remark"
                @input="(ev)=>{remark = ev.target.value}"
                name="textarea"
              />
              </div>
            </div>
        </div>
      </div>
    </div>
    <!-- 悬浮 -->
    <cover-view class="unpaid-fixed">
      <!-- 提示时间 -->
      <cover-view class="unpaid-timer" v-if="isOrder">
        <block v-if="isExpire">
          <cover-view class="unpaid-txt">商品已下架</cover-view>
        </block>
        <block v-else>
          <cover-view  class="unpaid-txt">剩余支付时间</cover-view> <cover-view class="unpaid-strong">{{surplusTime}}</cover-view>
        </block>
      </cover-view>
      <!-- 支付 -->
      <cover-view class="unpaid-footer">
        <cover-view class="footer-cout">
          <cover-view class="cout-key">合计</cover-view>
          <cover-view class="cout-money-key">￥</cover-view>
          <cover-view class="cout-money">{{orderData.amount}}</cover-view>
        </cover-view>
        <cover-view
          class="footer-btn"
          @click="handleGotoBuy"
        >立即支付</cover-view>
      </cover-view>
    </cover-view>

  </section>
</template>

<script>
import LayoutGoodsItem from '@/components/tds-layout/layout-goods-item'
import { countDownTime } from '../../../common/js/index'
export default {
  components: {
    LayoutGoodsItem
  },
  data() {
    return {
      // 订单ID
      orderId: '',
      // 是否未生成订单
      isOrder: false,
      // 商品信息
      orderData: {},
      remark: '',
      // 地址信息
      addressData: {
        consignee: '',
        consignee_mobile: '',
        area: [],
        address: ''
      },
      // 剩余支付时间
      surplusTime: '00:00:00',
      // 是否下架
      isExpire: false
    }
  },
  onLoad(options) {
    console.log('传递过来的参数：')
    console.log(JSON.parse(options.orders));

    // 传入商品信息(未生成订单)
    if (options.orders) {
      let orders = JSON.parse(options.orders);
      console.log('orders必须传入goods_image_url，goods_name，spec_attr，num，amount等参数')
      this.isOrder = false;
      // 如果未生成订单不获取订单详情，使用传入的orders
      this.orderData = orders
    } else if (options.orderId) {
      this.isOrder = true;
      // 传入商品订单ID(已生成订单)
      this.orderId = options.orderId;
    } else {
      mpvue.showToast({
        title: '传入options参数错误orders || orderId',
        icon: 'none',
        duration: 2000
      })
    }
    console.log(options)
  },
  mounted() {
    if (this.isOrder) {
      console.log('已生成订单')
      // 如果生成订单获取订单详情，使用传入的orderId
      this.getOrderDetail(this.orderId).then(() => {
        // 获取成功后开启剩余支付时间倒计时
        this.timer = setInterval(() => {
          let timeArr = countDownTime(this.endTime);
          if (timeArr) {
            // 设置时间展示
            this.surplusTime = timeArr[0] + ':' + timeArr[1] + ':' + timeArr[2];
          } else {
            // 设置过期，清除定时器
            this.isExpire = true;
            clearInterval(this.timer)
            this.timer = null;
          }
        }, 1000)
      });
    } else {
      console.log('未生成订单')
      // 如果未生成订单获取默认地址
      this.getAddressList();
    }
  },
  onShow() {
    let _that = this;
    // 获取selAddress
    mpvue.getStorage({
      key: 'selAddress',
      success(res) {
        _that.addressData = res.data;
        console.log(res.data)
      },
      fail(err) {
        console.log(err)
      }
    })
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
          // 备注
          this.remark = resource.order.remark;
          // 地址信息
          this.addressData = {
            consignee: resource.order.consignee,
            consignee_mobile: resource.order.consignee_mobile,
            consignee_address: resource.order.consignee_address
          }
          // 下架时间
          this.endTime = resource.goods.end_time;
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
     * @description: 获取默认地址
     * @param {type}
     * @return: undefined
     * @Date: 2019-04-28 10:51:18
     */
    getAddressList() {
      return this.$http.request('get', 'addresses/default').then(({ code, resource }) => {
        if (code === 200) {
          this.addressData = resource || {};
          // 拼接地址
          this.addressData.consignee_address = resource.area.join(' ') + ' ' + resource.address;
          console.log(resource)
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
     * @description: 选择收货地址
     * @Date: 2019-04-27 19:51:19
     */
    navigateToAddress() {
      mpvue.navigateTo({
        url: '../my_address/main?use=select' // use=select 选择
      })
    },

    /**
     * @description: 立即支付
     * @Date: 2019-04-27 19:51:38
     */
    handleGotoBuy() {
      if (this.isOrder) {
        // 已生成订单（待支付）
        this.$http.request('put', 'orders/' + this.orderData.id, { ...this.addressData, remark: this.remark }).then(({ code, resource }) => {
          if (code === 200) {
            // 发起支付
            mpvue.requestPayment({
              ...resource,
              success(res) {
                mpvue.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000,
                  success() {
                    mpvue.navigateTo({
                      url: '../my_order/main?current=paid'
                    })
                  }
                })
              },
              fail(res) {
                mpvue.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          } else {
            mpvue.showToast({
              title: '获取失败,请重试',
              icon: 'none',
              duration: 2000
            })
          }
        })
      } else {
        console.log('所有订单信息');
        console.log(this.orderData);
        // 传入 goods_id spu_id sharer_id num
        let goodsData = {}
        goodsData.goods_id = this.orderData.goods_id;
        goodsData.spu_id = this.orderData.spu.id;
        goodsData.sharer_id = this.$store.state.sharerInfo.id;
        goodsData.num = this.orderData.num;
        console.log('提交信息：')
        console.log(goodsData);

        // 未生成订单（下单中）
        this.$http.request('POST', 'orders', { ...this.addressData, remark: this.remark, ...goodsData }).then((res) => {
          console.log('成功生成订单');
          console.log(res)
          if (res.code === 200) {
            // 发起支付
            mpvue.requestPayment({
              ...res.resource,
              success(res) {
                mpvue.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000,
                  success() {
                    mpvue.navigateTo({
                      url: '../my_order/main?current=paid'
                    })
                  }
                })
              },
              fail(res) {
                mpvue.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          } else if (res.code === 10406) {
            mpvue.showModal({
              title: '提示',
              content: res.message,
              showCancel: false,
              confirmText: '确定',
              success() {
                mpvue.navigateBack({
                  delta: 1
                })
              }
            })
          } else {
            mpvue.showToast({
              title: '获取失败,请重试',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
      console.log('调起支付接口')
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    mpvue.stopPullDownRefresh()
  },

  onUnload() {
    // 移除缓存selAddress
    mpvue.removeStorage({
      key: 'selAddress'
    })
    // 设置过期，清除定时器
    this.isExpire = false;
    clearInterval(this.timer)
    this.timer = null;
  }
}
</script>

<style scoped lang="scss">
.unpaid-container {
  background-color: #f6f8fa;
  .unpaid-content {
    // flex: 1;
    // overflow: hidden;
    // overflow-y: scroll;
    padding-bottom: 93px;
    // -webkit-overflow-scrolling: touch;
  }
  .unpaid-list {
    padding: 0 15px 30px;
  }
  .unpaid-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
  .section-item {
    margin-top: 15px;
    padding: 15px;
    background-color: #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    .section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      .title-left {
        font-size: 18px;
        color: #282828;
        font-weight: bold;
      }
    }
    // 信息
    .receiver-info {
      padding-left: 30px;
      position: relative;
      .receiver-icon {
        width: 15px;
        height: 18px;
        position: absolute;
        left: 0;
        top: 4px;
      }
      .receiver-name {
        font-size: 15px;
        color: #282828;
      }
      .receiver-location {
        font-size: 15px;
        color: #282828;
      }
    }
  }

  .remarks-box {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #282828;
    .box-value {
      margin-left: 15px;
      flex: 1;
      overflow: hidden;
      textarea {
        margin-top: -5px;
        width: 100%;
        height: 52px;
        line-height: 1.2;
      }
    }
  }

  // 收货信息
  .no-address {
    display: flex;
    justify-content: center;
    align-items: center;
    .no-address-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      display: block;
    }
    .no-address-txt {
      font-size: 16px;
      color: #282828;
      font-weight: bold;
    }
  }

  // 剩余时间
  .unpaid-timer {
    height: 44px;
    line-height: 44px;
    background-color: #ffefef;
    text-align: center;
    .unpaid-txt {
      display: inline;
      font-size: 16px;
      color: #282828;
    }
    .unpaid-strong {
      display: inline;
      color: #ff6666;
      margin-left: 5px;
    }
  }

  // zhifu
  .unpaid-footer {
    display: flex;
    .footer-cout {
      flex: 1;
      height: 49px;
      line-height: 49px;
      padding-left: 15px;
      background-color: #ffffff;
      .cout-key {
        font-size: 12px;
        color: #ff0a0a;
        display: inline;
        margin-right: 5px;
      }

      .cout-money-key {
        font-size: 14px;
        color: #ff0a0a;
        display: inline;
      }
      .cout-money {
        font-size: 22px;
        color: #ff0a0a;
        font-weight: bold;
        display: inline;
      }
    }
    .footer-btn {
      height: 49px;
      line-height: 49px;
      width: 154px;
      text-align: center;
      background-color: #ff6666;
      color: #ffffff;
      font-size: 18px;
    }
  }
}
</style>
