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
            <div class="receiver-icon"></div>
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
            <div class="no-address-icon"></div>
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
                :auto-focus="remarkAutoFocus"
                :placeholder="placeholder"
                :contenteditable="true"
                v-if="isInputRemark"
                :value="remark"
                @blur="(ev)=>{remark = ev.target.value; isInputRemark = false; remarkAutoFocus = false;}"
                name="textarea"
              />
              <text class='remark' @click="()=>{ isInputRemark = true; remarkAutoFocus = true;}" v-else>{{remark || placeholder}}</text>
              </div>
            </div>
        </div>
      </div>
    </div>
    <!-- 悬浮 -->
    <div class="unpaid-fixed">
      <!-- 提示时间 -->
      <div class="unpaid-timer" v-if="isOrder">
        <div v-if="isExpire" class="unpaid-txt">商品已下架</div>
        <div v-else class="unpaid-txt">剩余支付时间</div> <div class="unpaid-strong">{{surplusTime}}</div>
      </div>
      <!-- 支付 -->
      <div class="unpaid-footer">
        <div class="footer-cout">
          <div class="cout-key">合计</div>
          <div class="cout-money-key">￥</div>
          <div class="cout-money">{{orderData.amount}}</div>
        </div>
        <div
          :class="['footer-btn',{'noClick':orderData.noDelivery}]"
          @click="handleGotoBuy"
        >立即支付</div>
      </div>
    </div>

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
      orderData: {
        postage: 0,
        noDelivery: ''
      },
      remark: '',
      // 地址信息
      addressData: {
        consignee: '',
        consignee_mobile: '',
        consignee_address: '',
        area: [],
        address: ''
      },
      // 剩余支付时间
      surplusTime: '00:00:00',
      // 单位
      unit: '',
      // 是否下架
      isExpire: false,
      // 输入框
      placeholder: '请输入你的备注信息',
      isInputRemark: false,
      remarkAutoFocus: false
    }
  },
  onLoad(options) {
    // 传入商品信息(未生成订单)
    console.log(options)
    if (options.orders) {
      let orders = JSON.parse(options.orders);
      console.log('传递过来的参数：')
      console.log(orders)
      console.log('orders必须传入goods_image_url，goods_name，spec_attr，num，amount，unit等参数')
      this.isOrder = false;
      // 如果未生成订单不获取订单详情，使用传入的orders
      this.orderData = orders;
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
  },
  mounted() {
    if (this.isOrder) {
      console.log('已生成订单')
      // 如果生成订单获取订单详情，使用传入的orderId
      this.getOrderDetail(this.orderId).then(() => {
        // 获取详情后计算地址邮费情况
        const { goods_id, num, consignee_address } = this.orderData; // eslint-disable-line
        this.getPostage({
          id: goods_id,
          num,
          consignee_address
        })
        // 获取成功后开启剩余支付时间倒计时
        this.countTimer()
      });
    } else {
      console.log('未生成订单')
      // 如果未生成订单获取默认地址
      this.getAddressList().then(() => {
        // 获取详情后计算地址邮费情况
        const { goods_id, num } = this.orderData; // eslint-disable-line
        this.getPostage({
          id: goods_id,
          num,
          consignee_address: this.addressData.consignee_address
        })
      });
    }
  },
  onShow() {
    let _that = this;
    // 获取selAddress
    mpvue.getStorage({
      key: 'selAddress',
      success(res) {
        // 重置
        _that.orderData.amount = _that.orderData.oldAmount || _that.orderData.amount;
        _that.orderData.postage = 0;
        _that.orderData.noDelivery = '';

        // 获取详情后计算地址邮费情况
        _that.addressData = res.data;
        const { goods_id, num } = _that.orderData; // eslint-disable-line
        _that.getPostage({
          id: goods_id,
          num,
          consignee_address: res.data.consignee_address
        })
        // 移除缓存selAddress
        mpvue.removeStorage({
          key: 'selAddress'
        })
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
          // 商品单位
          this.orderData.unit = resource.goods.unit;
          // 备注
          this.remark = resource.order.remark || '';
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
     * @description: 获取邮费接口
     * @param {Object} params 参数
     * @return: undefined
     * @Date: 2019-05-07 17:16:29
     */
    getPostage(params = {}) {
      if (this.isOrder) {
        this.orderData.amount = (Number(this.orderData.amount) - Number(this.orderData.postage)).toFixed(2);
      } else {
        this.orderData.amount = Number(this.orderData.amount).toFixed(2);
      }
      this.$set(this.orderData, 'noDelivery', '')
      this.$set(this.orderData, 'postage', 0)
      // 保存商品价格
      this.orderData.oldAmount = this.orderData.amount;
      return this.$http.request('get', 'logistics/getCharge', params).then(({ code, resource, message }) => {
        console.log(resource)
        if (code === 200) {
          this.orderData.postage = resource;
          this.orderData.amount = (Number(this.orderData.amount) + Number(resource)).toFixed(2);
        } else if (code === 10403) {
          console.log(message)
          // 地区不支持配送
          this.orderData.noDelivery = message;
        } else {
          mpvue.showToast({
            title: message,
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
          if (resource) {
            // 有默认地址
            this.addressData = resource;
            // 拼接地址
            this.addressData.consignee_address = resource.area.join(' ') + ' ' + resource.address;
          }
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
      let that = this;
      mpvue.navigateTo({
        url: '../my_address/main?use=select&id=' + that.addressData.id // use=select 选择
      })
    },

    /**
     * @description: 立即支付
     * @Date: 2019-04-27 19:51:38
     */
    handleGotoBuy() {
      // 如果该地区不配送，事件阻止
      if (this.orderData.noDelivery) {
        mpvue.showToast({
          title: this.orderData.noDelivery,
          icon: 'none',
          duration: 2000
        })
        return;
      }
      console.log(this.remark)
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
        // console.log('提交信息：')
        // console.log(goodsData);

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
                  duration: 2000,
                  success() {
                    mpvue.navigateTo({
                      url: '../my_order/main?current=unpaid'
                    })
                  }
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
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
      console.log('调起支付接口')
    },

    /**
     * @description: 计时器
     * @Date: 2019-05-08 20:28:35
     */
    countTimer() {
      this.timer = setTimeout(() => {
        let timeArr = countDownTime(this.endTime);
        if (!timeArr) {
          // 设置过期，清除定时器
          this.isExpire = true;
          clearTimeout(this.timer)
          this.timer = null;
        } else {
          // 设置时间展示
          this.surplusTime = timeArr[0] + ':' + timeArr[1] + ':' + timeArr[2];
          this.countTimer();
        }
      }, 1000)
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    mpvue.stopPullDownRefresh()
  },

  onUnload() {
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
    z-index: 999;
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
        background: url('../../../../static/images/Dingwei_iCon.png') no-repeat;
        background-size: 100% 100%;
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
    .box-label {
      font-size: 15px;
      color: #282828;
      line-height: 1.4;
    }
    .box-value {
      margin-left: 15px;
      flex: 1;
      height: 45px;
      overflow: hidden;
      textarea {
        line-height: 1.4;
        width: 100%;
        height: 100%;
        font-size: 15px;
        color: #282828;
      }
      .remark {
        display: block;
        line-height: 1.4;
        width: 100%;
        height: 100%;
        font-size: 15px;
        color: #282828;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
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
      background: url('../../../../static/images/add.png') no-repeat;
      background-size: 100% 100%;
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
    background-color: #ffefef;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .unpaid-txt {
      font-size: 16px;
      color: #282828;
    }
    .unpaid-strong {
      font-size: 16px;
      color: #ff6666;
      margin-left: 5px;
      overflow: initial;
    }
  }

  // zhifu
  .unpaid-footer {
    display: flex;
    .footer-cout {
      flex: 1;
      height: 49px;
      line-height: 49px;
      display: flex;
      align-items: center;
      padding-left: 15px;
      background-color: #ffffff;
      .cout-key {
        font-size: 12px;
        color: #ff0a0a;
        margin-right: 5px;
      }

      .cout-money-key {
        font-size: 14px;
        color: #ff0a0a;
        margin-right: 2px;
      }
      .cout-money {
        font-size: 22px;
        color: #ff0a0a;
        font-weight: bold;
        overflow: initial;
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
      &.noClick {
        background-color: #dfdfdf;
        color: #656565;
      }
    }
  }
}
</style>
