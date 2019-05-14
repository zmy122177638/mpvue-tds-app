<template>
  <section class="attestation-container">
    <div class="form-wrap">
      <picker
        @change="selectChange"
        :value="activeIndex"
        :range="atteList"
      >
        <div
          class="form-item form-select"
          v-if="formData.activeIndex === ''"
        >
          <div class="select-label">请选择证件类型</div>
          <img
            src="../../../../static/images/DownGray_iCon.png"
            class="select-icon"
          />
        </div>

        <div
          class="form-item form-select"
          v-else
        >
          <div class="select-label">当前选择</div>
          <div
            class="select-value"
            v-if="formData.activeIndex !== ''"
          >{{atteList[formData.activeIndex]}}</div>
        </div>
      </picker>

      <div class="form-item">
        <input
          type="text"
          :value="formData.name"
          @input="getNameChange"
          @blur="nameRulesBlur"
          placeholder="请输入姓名"
        >
      </div>
      <div class="form-item">
        <input
          type="idcard"
          :value="formData.id"
          @input="getIdChange"
          @blur="idRulesBlur"
          placeholder="请输入证件号码"
        >
      </div>

      <div class="point-box">
        <div class="point-t">提示：</div>
        <div class="point-p"><span class="p-key">1、</span>请填写与当前微信一致的实名认证信息，否则将会导致无法提现！</div>
        <div class="point-p"><span class="p-key">2、</span>请关注微信公众号：团大师，否则将会导致无法接收消息提醒</div>
      </div>
      <div
        v-if="!isGetNumber"
        :class="['form-subimt',{'on':!isClickFlag}]"
        @click="submit"
      >立即认证</div>
      <button
        v-else
        open-type="getPhoneNumber"
        @getphonenumber="submit"
        :class="['form-subimt',{'on':!isClickFlag}]"
      >立即认证</button>
    </div>

  </section>
</template>

<script>
import { IdCodeValid } from '@/common/js/index'
export default {
  data() {
    return {
      // 身份类型
      atteList: ['身份证'],
      // 表单数据
      formData: {
        activeIndex: 0,
        name: '',
        id: ''
      },
      // 姓名是否验证成功
      isRulesGetName: false,
      // 身份证是否验证成功
      isRulesGetId: false,
      // 手机号加密
      encryptedData: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    sharerInfo() {
      return this.$store.state.sharerInfo
    },
    // 是否可点击状态
    isClickFlag() {
      return this.formData.id && this.formData.name;
    },
    // 是否获取手机号按钮
    isGetNumber() {
      return this.isRulesGetName && this.isRulesGetId;
    }
  },

  methods: {
    selectChange(ev) {
      this.formData.activeIndex = parseInt(ev.target.value);
      this.formData.idStr = this.atteList[this.formData.activeIndex];
    },
    getNameChange(ev) {
      this.formData.name = ev.target.value;
    },
    nameRulesBlur(ev) {
      if (!/^[\u4e00-\u9fa5]{2,6}$/.test(ev.target.value)) {
        this.isRulesGetName = false;
      } else {
        this.isRulesGetName = true;
      }
    },
    getIdChange(ev) {
      this.formData.id = ev.target.value;
    },
    idRulesBlur(ev) {
      const { pass } = IdCodeValid(ev.target.value);
      if (!pass) {
        this.isRulesGetId = false;
      } else {
        this.isRulesGetId = true;
      }
    },
    submit(e) {
      if (!this.isClickFlag) { return; }
      const { name, id } = this.formData;
      if (!name) {
        mpvue.showToast({
          title: '请输入你的姓名',
          icon: 'none',
          duration: 2000
        })
        return;
      } else if (!/^[\u4e00-\u9fa5]{2,6}$/.test(name)) {
        mpvue.showToast({
          title: '请输入你的真实姓名',
          icon: 'none',
          duration: 2000
        })
        return;
      } else if (!id) {
        mpvue.showToast({
          title: '请输入身份证号码',
          icon: 'none',
          duration: 2000
        })
        return;
      } else {
        const { pass, msg } = IdCodeValid(id);
        if (!pass) {
          mpvue.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
          return;
        }
      }

      console.log(e)

      if (e && e.mp && e.mp.detail && e.mp.detail.encryptedData) {
        // 更新手机号
        let params = {
          enc_data: e.mp.detail.encryptedData,
          iv: e.mp.detail.iv
        }
        this.$http.request('post', 'auth/editInfo', params)
          .then(res => {
            if (res.code === 200) {
              // 更新store中的userInfo
              this.$store.commit({
                type: 'writeUserInfo',
                userInfo: res.data
              });
              // 实名认证
              this.$http.request('put', 'user/idCard', { id_card: id, user_name: name }).then(({ code, resource, message }) => {
                if (code === 200) {
                  mpvue.showToast({
                    title: '认证成功',
                    icon: 'success',
                    duration: 2000,
                    success() {
                      mpvue.redirectTo({
                        url: '../my_info/main'
                      })
                    }
                  })
                } else {
                  mpvue.showToast({
                    title: message,
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            } else {
              mpvue.showToast({
                title: '认证失败,请重新认证',
                icon: 'none',
                duration: 2000
              })
            }
          })
      } else {
        mpvue.showToast({
          title: '认证失败,请重新认证',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form-wrap {
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  .form-item {
    padding: 20px 30px;
    margin-bottom: 10px;
    background-color: #ffffff;
  }
  .form-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .select-label {
      font-size: 16px;
      color: #282828;
      font-weight: bold;
    }
    .select-icon {
      width: 11px;
      height: 7px;
      display: block;
    }
    .select-value {
      font-size: 16px;
      color: #282828;
    }
  }
  .form-subimt {
    margin: 30px 40px 40px;
    background-color: #ff6666;
    box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
    border-radius: 22px;
    height: 39px;
    line-height: 39px;
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    &.on {
      background-color: #dfdfdf;
      color: #656565;
      box-shadow: none;
    }
  }
}
.point-box {
  margin: 15px 15px 0;
  .point-t {
    font-size: 12px;
    line-height: 22px;
    color: #ff6666;
  }
  .point-p {
    font-size: 12px;
    line-height: 22px;
    color: #ff6666;
    padding-left: 18px;
    position: relative;
    .p-key {
      position: absolute;
      left: 0;
      top: 0;
      line-height: 22px;
    }
  }
}
</style>
