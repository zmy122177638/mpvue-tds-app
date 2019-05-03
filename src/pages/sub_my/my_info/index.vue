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
            :src="userInfo.headimgurl"
          />
          <!-- <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          /> -->
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">昵称</div>
        </div>
        <div class="item-right">
          <div class="item-value">{{userInfo.nickname}}</div>
          <!-- <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          /> -->
        </div>
      </div>
      <div
        class="setting-item"
        @click="navigateTowechatID"
      >
        <div class="item-left">
          <div class="item-label">微信号</div>
        </div>
        <div class="item-right">
          <div class="item-value">{{userInfo.wechat_number}}</div>
          <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          />
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
          <div
            class="item-value"
            v-if="!userInfo.is_real_check"
          >未认证</div>
          <div
            class="item-value"
            v-else
            style="color:#FF6666"
          >已认证</div>
          <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          />
        </div>
      </div>
      <!-- <picker
        @change="selectSexChange"
        :value="sexActive"
        :range="sexList"
      > -->
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">性别</div>
        </div>
        <div class="item-right">
          <div class="item-value">{{userInfo.sex === 2 ? '女' : '男'}}</div>
          <!-- <img
              src="../../../../static/images/ToRightGray_iCon.png"
              class="item-more-icon"
            /> -->
        </div>
      </div>
      <!-- </picker> -->
      <!-- <picker
        mode="region"
        @change="selectAddressChange"
      > -->
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">所在地区</div>
        </div>
        <div class="item-right">
          <div class="item-value">{{region}}</div>
          <!-- <img
              src="../../../../static/images/ToRightGray_iCon.png"
              class="item-more-icon"
            /> -->
        </div>
      </div>
      <!-- </picker> -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
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
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    sharerInfo() {
      return this.$store.state.sharerInfo
    }
  },
  onShow() {
    this.$http.request('get', 'user/getBaseInfo', { uid: this.userInfo.id }).then(({ code, resource }) => {
      // 重新存入
      if (code === 200) {
        // 如果分享人id和用户id是一致，同步信息
        if (this.sharerInfo.id === resource.id) {
          this.$store.commit('writeSharerInfo', { sharerInfo: { ...resource } })
        }
        this.$store.commit('writeUserInfo', { userInfo: { ...resource } })
      } else {
        mpvue.showToast({
          title: '获取用户信息失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
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
     * @description: 选择地址
     * @Date: 2019-04-25 17:31:18
     */
    selectAddressChange(ev) {
      this.region = ev.target.value;
    },
    /**
     * @description: 绑定微信id
     * @Date: 2019-05-03 14:56:45
     */
    navigateTowechatID() {
      mpvue.navigateTo({
        url: '../my_info_input/main'
      })
    },
    /**
     * @description: 身份认证
     * @Date: 2019-04-25 17:39:35
     */
    navigateToAttestation() {
      if (this.userInfo.is_real_check) {
        mpvue.navigateTo({
          url: '../my_attestation/main'
        })
      } else {
        mpvue.navigateTo({
          url: '../my_attestation_no/main'
        })
      }
    }
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
      display: flex;
      justify-content: flex-end;
      align-items: center;
      overflow: hidden;
      .item-value {
        font-size: 15px;
        overflow: hidden;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #b1b1b1;
      }
      .item-avator {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        display: block;
      }
      .item-more-icon {
        width: 7px;
        height: 11px;
        margin-left: 15px;
        display: block;
      }
    }
  }
}
</style>
