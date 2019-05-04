<template>
  <section
    :class="['popup-container',{on:isShow}]"
    v-show="isShow"
  >
    <div
      class="popup-bg"
      v-show="isMask"
      @click="isMaskClick?isShow = !isShow:null"
    ></div>
    <div class="popup-wrapper">
      <slot>
        <div class="popup-title">您还未实名认证</div>
        <div class="popup-content">
          <p class="popup-p">您和赚钱之间的距离只差一个实名认证！实名认证后才能分享商品和销售开店礼包赚钱!</p>

          <!-- btn -->
          <div
            class="popup-btn"
            @click="navigateToAttestation"
          >去实名</div>
        </div>
      </slot>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    // v-model绑定
    value: {
      type: Boolean,
      default: false
    },
    // 是否显示mask
    isMask: {
      type: Boolean,
      default: true
    },
    // 是否开启mask事件关闭
    isMaskClick: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShow: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    navigateToAttestation() {
      mpvue.navigateTo(
        { url: '../../pages/sub_my/my_attestation_no/main' }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .popup-bg {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    transition: all 0.3s;
  }
  .popup-wrapper {
    transition: all 0.3s;
    width: 80%;
    border-radius: 18px;
    position: absolute;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 15px 15px;
    background-color: #fff;
    overflow: hidden;
  }
  &.on {
    .popup-bg {
      animation: opacityshow 0.45s ease-out;
    }
    .popup-wrapper {
      transform: translate(-50%, -50%);
      animation: showtimer 0.45s ease-out;
    }
  }
  @keyframes opacityshow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes showtimer {
    0% {
      transform: translate(-50%, -70%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
}
.popup-title {
  font-size: 20px;
  font-weight: bold;
  color: #282828;
  text-align: center;
}
.popup-content {
  padding: 30px 15px 0;
}
.popup-p {
  font-size: 16px;
  color: #252525;
  line-height: 30px;
}
.popup-btn {
  margin: 40px 0 15px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  color: #fff;
  width: 100%;
  font-size: 15px;
  background-color: #ff6666;
  box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
  border-radius: 22px;
}
</style>

