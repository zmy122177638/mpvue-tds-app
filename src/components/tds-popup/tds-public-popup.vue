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
      <div
        class="popup-close"
        @click="isShow = !isShow"
      >
        <span class="popup-close-l"></span>
        <span class="popup-close-l"></span>
      </div>
      <slot>
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
  }
}
</script>

<style lang="scss" scoped>
.popup-container {
  .popup-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    z-index: 98;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transition: all 0.3s;
  }
  .popup-wrapper {
    transition: all 0.3s;
    width: 90%;
    position: fixed;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    padding: 40px 15px 15px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    .popup-close {
      width: 18px;
      height: 18px;
      position: absolute;
      right: 20px;
      top: 15px;
      overflow: hidden;
      .popup-close-l {
        width: 100%;
        height: 1px;
        background-color: #282828;
        border-radius: 17px;
        left: 0;
        right: 0;
        top: 9px;
        position: absolute;
        transform: rotate(-45deg);
        &:nth-last-child(1) {
          transform: rotate(45deg);
        }
      }
    }
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
</style>
