<template>
  <!-- 售后原因 -->
  <div
    :class="['service-popup',{on:isShow_v}]"
    v-show="isShow_v"
  >
    <div
      class="service-bg"
      @click="closePopupChange"
    ></div>
    <div class="service-popup-cont">
      <div class="service-title">{{title}}</div>
      <div class="service-input">
        <textarea
          :placeholder="placeholder"
          @input="inputChange"
          class="input-box"
          :value="serviceQuest"
          :fixed="true"
        />
        </div>
        <div class="service-btn" @click="submit">提交申请</div>
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
    title: {
      type: String,
      default: '标题'
    },
    placeholder: {
      type: String,
      default: '请输入不超过140字的内容！'
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
      serviceQuest: ''
    }
  },
  methods: {
    closePopupChange() {
      this.isShow_v = !this.isShow_v;
    },
    inputChange(ev) {
      this.serviceQuest = ev.target.value;
    },
    submit() {
      if (this.serviceQuest) {
        this.$emit('submit', this.serviceQuest);
        this.serviceQuest = '';
        this.isShow_v = !this.isShow_v;
      } else {
        mpvue.showToast({
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
.service-popup {
  .service-bg {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .service-popup-cont {
    border-radius: 6px;
    background-color: #ffffff;
    position: fixed;
    z-index: 99;
    width: 90%;
    box-sizing: border-box;
    padding: 20px 30px;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .service-title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .service-input {
      width: 100%;
      height: 160px;
      padding: 15px;
      border-radius: 6px;
      box-sizing: border-box;
      background-color: #f6f8fa;
    }

    .input-box {
      width: 100%;
      height: 100%;
    }
    .service-btn {
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
    .service-popup-cont {
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
