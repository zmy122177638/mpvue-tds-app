<template>
  <section class="info-container">
    <div class="setting-list">
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">头像</div>
        </div>
        <div class="item-right">
          <img
            class="item-avator"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3544639926,1213429070&fm=27&gp=0.jpg"
          />
          <div class="item-more-icon"></div>
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">昵称</div>
        </div>
        <div class="item-right">
          <div class="item-value">我在人民广场</div>
          <div class="item-more-icon"></div>
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">微信号</div>
        </div>
        <div class="item-right">
          <div class="item-value">wdd001</div>
          <div class="item-more-icon"></div>
        </div>
      </div>
      <div
        class="setting-item"
        @click="navigateToAttestation"
      >
        <div class="item-left">
          <div class="item-label">实名认证</div>
        </div>
        <div class="item-right">
          <div class="item-value">未实名</div>
          <div class="item-more-icon"></div>
        </div>
      </div>
      <picker
        @change="selectSexChange"
        :value="sexActive"
        :range="sexList"
      >
        <div class="setting-item">
          <div class="item-left">
            <div class="item-label">性别</div>
          </div>
          <div class="item-right">
            <div class="item-value">{{sexList[sexActive]}}</div>
            <div class="item-more-icon"></div>
          </div>
        </div>
      </picker>
      <picker
        mode="region"
        @change="selectAddressChange"
      >
        <div class="setting-item">
          <div class="item-left">
            <div class="item-label">所在地区</div>
          </div>
          <div class="item-right">
            <div class="item-value">{{region}}</div>
            <div class="item-more-icon"></div>
          </div>
        </div>
      </picker>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // 是否验证
      isAttestation: false,
      // 性别列表
      sexList: ['女', '男'],
      // 选中性别index
      sexActive: 0,
      // 当前地址
      region: ['广东省', '广州市', '海珠区']
    }
  },

  components: {
  },

  methods: {
    /**
     * @description: 选择性别
     * @Date: 2019-04-25 17:31:18
     */
    selectSexChange(ev) {
      this.sexActive = ev.target.value;
    },
    /**
     * @description: 选择性别
     * @Date: 2019-04-25 17:31:18
     */
    selectAddressChange(ev) {
      this.region = ev.target.value;
    },
    /**
     * @description: 身份认证
     * @Date: 2019-04-25 17:39:35
     */
    navigateToAttestation() {
      if (this.isAttestation) {
        mpvue.navigateTo({
          url: '../my_attestation/main'
        })
      } else {
        mpvue.navigateTo({
          url: '../my_attestation_no/main'
        })
      }
    }
  },

  created() {
  }
}
</script>

<style scoped lang="scss">
.setting-list {
  .setting-item {
    background-color: #ffffff;
    height: 64px;
    padding: 0 30px;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-left {
      flex: 1;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .item-label {
        font-size: 16px;
        color: #282828;
        font-weight: bold;
      }
    }
    .item-right {
      flex: 1;
      overflow: hidden;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .item-value {
        font-size: 15px;
        color: #b1b1b1;
        margin-right: 15px;
      }
      .item-avator {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 15px;
        display: block;
      }
      .item-more-icon {
        width: 7px;
        height: 11px;
        background-color: red;
      }
    }
  }
}
</style>
