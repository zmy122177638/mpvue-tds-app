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
          <img src="../../../../static/images/DownGray_iCon.png" class="select-icon"/>
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
          :value="name"
          @input="getNameChange"
          placeholder="请输入姓名"
        >
      </div>
      <div class="form-item">
        <input
          type="idcard"
          :value="id"
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
export default {
  data() {
    return {
      // 身份类型
      atteList: ['身份证', '居住证', '驾驶证', '港澳通行证', '护照'],
      // 表单数据
      formData: {
        activeIndex: '',
        name: '',
        id: ''
      }
    }
  },

  components: {
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
      console.log(this.formData)
    }
  },

  created() {
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
      display:block;
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
