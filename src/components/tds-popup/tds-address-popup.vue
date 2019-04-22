<template>
  <!-- 收货信息 -->
  <div
    :class="['address-popup',{on:isShow_v}]"
    v-show="isShow_v"
  >
    <div
      class="address-bg"
      @click="closePopupChange"
    ></div>
    <div class="address-popup-cont">
      <div class="address-title">{{formData_v.use === 'add' ? '新增售后地址' : '修改售后地址'}}</div>
      <div
        class="address-close"
        @click="closePopupChange"
      ></div>
      <div class="address-info-list">
        <div class="address-info-item">
          <div class="item-label">姓名</div>
          <div class="item-value">
            <input
              placeholder="请输入收货人"
              class="input-value"
              type="text"
              @input="getAddressName"
              :value="formData_v.name"
            />
          </div>
        </div>
        <div class="address-info-item">
          <div class="item-label">手机</div>
          <div class="item-value">
            <input
              placeholder="请输入收货人手机号"
              :maxlength="11"
              class="input-value"
              type="number"
              @input="getAddressPhone"
              :value="formData_v.phone"
            />
          </div>
        </div>
        <div class="address-info-item">
          <div class="item-label">地址</div>
          <div class="item-value">
            <picker
              mode="region"
              @change="bindRegionChange"
              class="input-value02"
              :value="formData_v.region"
            >
              {{ formData_v.region ? formData_v.region[0] + '-' + formData_v.region[1] + '-' + formData_v.region[2] : '请选择收货人地址'}}
            </picker>
          </div>
        </div>
        <div class="address-info-item">
          <div class="item-label">街道</div>
          <div class="item-value02">
            <textarea
              placeholder="请输入详细街道、门牌号"
              :fixed="true"
              class="input-value02"
              @input="getAddressStreet"
              :value="formData_v.address"
            />
            </div>
        </div>
        <div class="address-info-item">
          <div class="item-label">标签</div>
          <div class="item-tag-list">
            <div :class="['item-tag-item',{on:formData_v.tag === item}]" v-for="(item,index) in tagList" :key="index" @click="formData_v.tag === item?formData_v.tag = null:formData_v.tag = item">{{item}}</div>
          </div>
        </div>
      </div>
      <div class="set-normal" @click="formData_v.isNormal = !formData_v.isNormal">
        <span :class="['set-icon',{on:formData_v.isNormal}]"></span>
        <span class="set-txt">设为默认</span>
      </div>
      <div
        class="address-btn"
        @click="submit"
      >保存</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: {
        name: '',
        phone: '',
        region: '',
        address: '',
        tag: '',
        isNormal: false
      }
    }
  },
  computed: {
    isShow_v: {
      get() {
        return this.isShow
      },
      set(val) {
        this.$emit('update:isShow', val)
      }
    },
    formData_v: {
      get() {
        return this.data
      },
      set(val) {
        this.$emit('update:data', val)
      }
    }
  },
  data() {
    return {
      tagList: ['家', '公司', '学校']
    }
  },
  methods: {
    /**
     * @description: 获取收货人姓名
     * @Date: 2019-04-22 15:50:07
     */
    getAddressName(ev) {
      this.formData_v.name = ev.target.value;
    },

    /**
     * @description: 获取手机号码
     * @Date: 2019-04-22 15:52:59
     */
    getAddressPhone(ev) {
      this.formData_v.phone = ev.target.value;
    },

    /**
     * @description: 获取地址信息
     * @Date: 2019-04-22 15:56:34
     */
    bindRegionChange(e) {
      this.formData_v.region = e.target.value;
      this.formData_v.regionCode = e.target.code;
      console.log('picker发送选择改变，携带值为', e)
    },

    /**
     * @description: 获取详细地址
     * @Date: 2019-04-22 16:33:27
     */
    getAddressStreet(e) {
      this.formData_v.address = e.target.value;
    },

    /**
     * @description: 关闭
     * @Date: 2019-04-22 16:34:31
     */
    closePopupChange() {
      this.isShow_v = !this.isShow_v;
    },

    /**
     * @description: 提交
     * @Date: 2019-04-22 16:34:46
     */
    submit() {
      const { name, phone, region, address } = this.formData_v;
      if (!name) {
        wx.showToast({
          title: '请输入收货人姓名',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else if (!phone) {
        wx.showToast({
          title: '请输入收货人手机号码',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone)) {
        wx.showToast({
          title: '请输入正确手机号码',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else if (!region) {
        wx.showToast({
          title: '请选择收货人地址',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else if (!address) {
        wx.showToast({
          title: '请输入收货人详细街道、门牌号',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
      this.$emit('submit', this.formData_v)
      this.closePopupChange();
      console.log(this.formData_v)
    }
  }
}
</script>

<style lang="scss" scoped>
.address-popup {
  .address-bg {
    z-index: 99;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .address-popup-cont {
    border-radius: 6px;
    background-color: #ffffff;
    position: fixed;
    width: 90%;
    box-sizing: border-box;
    padding: 20px 30px;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate3d(-50%, -50%, 0);
    .address-title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      padding: 20px 0;
    }
    .address-close {
      width: 12px;
      height: 12px;
      background-color: #ff6666;
      position: absolute;
      right: 15px;
      top: 15px;
    }
    .address-info-list {
      .address-info-item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .item-label {
          margin-right: 15px;
        }
        .item-value {
          height: 44px;
          background-color: #f6f8fa;
          border-radius: 5px;
          flex: 1;
          overflow: hidden;
        }
        .input-value {
          font-size: 15px;
          color: #282828;
          padding: 0 15px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          display: block;
          overflow: hidden;
        }
        .item-value02 {
          height: 67px;
          background-color: #f6f8fa;
          border-radius: 5px;
          flex: 1;
          overflow: hidden;
        }
        .input-value02 {
          font-size: 15px;
          color: #282828;
          padding: 11px 15px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
        }
        .item-tag-list {
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          .item-tag-item {
            width: 54px;
            height: 29px;
            line-height: 29px;
            margin-right: 10px;
            text-align: center;
            background-color: #f6f8fa;
            border-radius: 5px;
            font-size: 14px;
            color: #b1b1b1;
            &.on {
              color: #ff6666;
              background-color: rgba(255, 102, 102, 0.3);
            }
          }
        }
      }
    }
    .set-normal {
      .set-icon {
        width: 18px;
        height: 18px;
        background-color: #cccccc;
        display: inline-block;
        vertical-align: middle;
        &.on {
          background-color: indianred;
        }
      }
      .set-txt {
        margin-left: 10px;
        font-size: 15px;
        color: #656565;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .address-btn {
      font-size: 15px;
      width: 180px;
      height: 39px;
      line-height: 39px;
      background-color: #ff6666;
      color: #ffffff;
      box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
      border-radius: 17px;
      margin: 20px auto 5px;
      text-align: center;
    }
  }
  &.on {
    .address-popup-cont {
      animation: movescale 0.35s ease-out;
    }
  }
  @keyframes movescale {
    0% {
      transform: translate3d(-50%, -50%, 0) scale(0.3);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
  }
}
</style>
