<template>
  <section class="attestation-container">
    <div class="attestation-box">
      <div class="attestation-item">
        <img
          src="../../../../static/images/RealName_iCon.png"
          class="attestation-bg"
          alt=""
        >
        <div class="item-info">
          <img
            :src="userInfo.headimgurl"
            class="item-avator"
            alt=""
          >
          <div class="item-name">{{userInfo.user_name}}</div>
        </div>
        <p class="item-num">证件号码: {{userInfo.id_card}}</p>
        <p class="item-point">个人隐私信息安全保障中</p>
      </div>
    </div>
    <!--  -->
    <div class="setting-list">
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">姓名</div>
        </div>
        <div class="item-right">
          <div class="item-value">{{userInfo.user_name}}</div>
          <!-- <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          /> -->
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">证件类型</div>
        </div>
        <div class="item-right">
          <div class="item-value">身份证</div>
          <!-- <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  }

}
</script>

<style scoped lang="scss">
.attestation-box {
  padding: 15px 15px 30px;
  .attestation-item {
    padding: 20px 20px 12.5px;
    box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
    border-radius: 6px;
    position: relative;
    .attestation-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: -1;
    }
    .item-info {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .item-avator {
        width: 49px;
        height: 49px;
        border-radius: 50%;
        display: block;
        margin-right: 20px;
      }
      .item-name {
        font-size: 20px;
        color: #ffffff;
        font-weight: bold;
      }
    }
    .item-num {
      font-size: 15px;
      color: #ffffff;
      margin-bottom: 15px;
    }
    .item-point {
      font-size: 12px;
      color: #ffffff;
    }
  }
}
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
        display: block;
      }
    }
  }
}
</style>
