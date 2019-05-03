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
          placeholder="请输入姓名"
        >
      </div>
      <div class="form-item">
        <input
          type="idcard"
          :value="formData.id"
          @input="getIdChange"
          placeholder="请输入证件号码"
        >
      </div>
      <div
        class="form-subimt"
        @click="submit()"
      >立即认证</div>
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
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    sharerInfo() {
      return this.$store.state.sharerInfo
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
    getIdChange(ev) {
      this.formData.id = ev.target.value;
    },
    submit() {
      const { name, id } = this.formData;
      if (!name) {
        mpvue.showToast({
          title: '请输入姓名',
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
