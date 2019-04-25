<template>
  <section class="setting-container">
    <div class="setting-list">
      <div
        class="setting-item"
        @click="navigateToInfo()"
      >
        <div class="item-left">
          <div class="item-label">个人信息</div>
        </div>
        <div class="item-right">
          <div class="item-value"></div>
          <img src="../../../../static/images/ToRightGray_iCon.png" class="item-more-icon"/>
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">手机号码</div>
        </div>
        <div class="item-right">
          <div class="item-value">136****5989</div>
          <img src="../../../../static/images/ToRightGray_iCon.png" class="item-more-icon"/>
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">绑定微信</div>
        </div>
        <div class="item-right">
          <div class="item-value">江湖一点光</div>
          <img src="../../../../static/images/ToRightGray_iCon.png" class="item-more-icon"/>
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">我的邀请人</div>
        </div>
        <div class="item-right">
          <div class="item-value">三千零一页</div>
          <img src="../../../../static/images/ToRightGray_iCon.png" class="item-more-icon"/>
        </div>
      </div>
      <div
        class="setting-item"
        @click="handleAuthorizeChange"
      >
        <div class="item-left">
          <div class="item-label">我的授权书</div>
        </div>
        <div class="item-right">
          <div class="item-value"></div>
          <img src="../../../../static/images/ToRightGray_iCon.png" class="item-more-icon"/>
        </div>
      </div>
    </div>
    <!-- 授权书弹窗 -->
    <Tds-public-popup v-model="isShow">
      <img
        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2153937626,1074119156&fm=27&gp=0.jpg"
        style="width:100%;"
        alt=""
      >
    </Tds-public-popup>
  </section>
</template>

<script>
import TdsPublicPopup from '@/components/tds-popup/tds-public-popup'
export default {
  data() {
    return {
      isShow: false
    }
  },

  components: {
    TdsPublicPopup
  },

  methods: {
    navigateToInfo() {
      mpvue.navigateTo({
        url: '../my_info/main'
      })
    },
    handleAuthorizeChange() {
      this.isShow = !this.isShow;
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
    padding: 13.5px 30px 13px;
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
      .item-more-icon {
        width: 7px;
        height: 11px;
        display:block;
      }
    }
  }
}
</style>
