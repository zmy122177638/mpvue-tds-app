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
          <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          />
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">手机号码</div>
        </div>
        <div class="item-right">
          <div class="item-value">{{userInfo.mobile_phone || ''}}</div>
          <!-- <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          /> -->
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">我的邀请人</div>
        </div>
        <div class="item-right">
          <div class="item-value">{{userInfo.upper_name || ''}}</div>
          <!-- <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          /> -->
        </div>
      </div>
      <div class="setting-item">
        <div class="item-left">
          <div class="item-label">绑定微信</div>
        </div>
        <div class="item-right">
          <div class="item-value">{{userInfo.nickname || ''}}</div>
          <!-- <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          /> -->
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
          <img
            src="../../../../static/images/ToRightGray_iCon.png"
            class="item-more-icon"
          />
        </div>
      </div>
    </div>
    <!-- 授权书弹窗 -->
    <Tds-public-popup v-model="isShow">
      <img
        :src="userInfo.letter_of_authorization"
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
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    navigateToInfo() {
      mpvue.navigateTo({
        url: '../my_info/main'
      })
    },
    handleAuthorizeChange() {
      if (this.userInfo.type) {
        // 如果已经生成授权书
        if (this.userInfo.letter_of_authorization) {
          this.previewImageImg(this.userInfo.letter_of_authorization)
        } else {
          // 否则请求授权书接口
          this.$http.request('get', 'user/getLetter').then(({ code, resource }) => {
            if (code === 200) {
              resource && this.previewImageImg(resource)
            } else {
              mpvue.showToast({
                title: '获取授权书失败，请重试',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      } else {
        mpvue.showToast({
          title: '未获得授权书，快去成为团长吧',
          icon: 'none',
          duration: 2000
        })
      }
    },
    previewImageImg(img) {
      mpvue.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img], // 需要预览的图片http链接列表
        fail() {
          mpvue.showToast({
            title: '图片地址异常，请重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
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
    box-sizing: border-box;
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
        overflow: hidden;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        color: #b1b1b1;
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
