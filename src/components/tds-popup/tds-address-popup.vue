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
      <div class="address-title">新增售后地址</div>
      <div class="address-close"></div>
      <div class="address-info-list">
        <div class="address-info-item">
          <div class="item-label">姓名</div>
          <div class="item-value">
            <input
              class="input-value"
              type="text"
            />
          </div>
        </div>
        <div class="address-info-item">
          <div class="item-label">手机</div>
          <div class="item-value">
            <input
              class="input-value"
              type="number"
            />
          </div>
        </div>
        <div class="address-info-item">
          <div class="item-label">地址</div>
          <div class="item-value">
            <input
              class="input-value"
              type="text"
            />
          </div>
        </div>
        <div class="address-info-item">
          <div class="item-label">姓名</div>
          <div class="item-value">
            <input
              class="input-value"
              type="text"
            />
          </div>
        </div>
      </div>
      <div
        class="address-btn"
        @click="submit"
      >确认修改</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
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
    }
  },
  data() {
    return {
      addressQuest: ''
    }
  },
  methods: {
    closePopupChange() {
      this.isShow_v = !this.isShow_v;
    },
    submit() {
      if (this.addressQuest) {
        this.$emit('submit', this.addressQuest);
        this.addressQuest = '';
        this.isShow_v = !this.isShow_v;
      } else {
        wx.showToast({
          title: '所填内容不能为空',
          icon: 'none',
          duration: 1500
        })
      }
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
          display: flex;
        }
        .input-value {
          width: 100%;
          height: 100%;
        }
      }
    }
    .address-btn {
      font-size: 15px;
      width: 85%;
      height: 39px;
      line-height: 39px;
      background-color: #ff6666;
      color: #ffffff;
      box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
      border-radius: 6px;
      margin: 20px auto 0;
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
      transform: translate3d(-50%, -50%, 0) scale(0);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
  }
}
</style>
