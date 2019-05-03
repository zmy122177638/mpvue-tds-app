<template>
  <section class="attestation-container">
    <div class="form-wrap">
      <div class="form-item">
        <input
          type="text"
          :value="formData.wechatId"
          @input="getNameChange"
          placeholder="请输入微信号"
        >
      </div>

      <div
        class="form-subimt"
        @click="submit()"
      >确认保存</div>
    </div>

  </section>
</template>

<script>

export default {
  data() {
    return {
      // 身份类型
      atteList: ['身份证'],
      // 表单数据
      formData: {
        wechatId: ''
      }
    }
  },

  methods: {
    getNameChange(ev) {
      this.formData.wechatId = ev.target.value;
    },
    submit() {
      const { wechatId } = this.formData;
      if (!wechatId) {
        mpvue.showToast({
          title: '请输入微信号',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      this.$http.request('put', 'user/wechatID', { wechat_number: wechatId }).then(({ code, resource, message }) => {
        if (code === 200) {
          mpvue.showToast({
            title: '绑定成功',
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
    }
  }
}
</script>

<style scoped lang="scss">
.form-wrap {
  padding-top: 15px;
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
    margin: 40px;
    background-color: #ff6666;
    box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
    border-radius: 22px;
    height: 39px;
    line-height: 39px;
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }
}
</style>

