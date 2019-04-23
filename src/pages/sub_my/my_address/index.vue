<template>
  <section class="address-container">
    <div class="address-list">
      <Layout-address-item
        v-for="(item,index) in addressList"
        :key="index"
        :item="item"
        @click="handleAddressItem"
      ></Layout-address-item>
    </div>
    <!-- 新增地址 -->
    <div
      class="add-btn-box"
      @click="handleAddAddress()"
    >
      <div class="add-icon"></div>
      <div class="add-txt">新增地址</div>
    </div>
    <!-- 弹窗 -->
    <Tds-address-popup
      :isShow.sync="isShow"
      :data.sync="formData"
      @submit="handleSubmitForm"
    ></Tds-address-popup>
  </section>
</template>

<script>
import LayoutAddressItem from '@/components/tds-layout/layout-address-item'
import TdsAddressPopup from '@/components/tds-popup/tds-address-popup'
export default {
  components: {
    LayoutAddressItem,
    TdsAddressPopup
  },
  data() {
    return {
      // 0修改 1选择
      type: 0,
      // 是否弹窗
      isShow: false,
      // 地址列表
      addressList: [
        {
          name: 'anles',
          phone: '18588419510',
          region: ['湖南省', '衡阳市', '祁东县'],
          address: '三千地市',
          tag: '公司',
          isNormal: false
        }
      ],
      // 弹窗表单
      formData: {}
    }
  },
  onLoad(options) {
    // 获取传入值
    this.type = options.type || 0;
    console.log(this.type)
  },
  methods: {
    /**
     * @description: 点击地址子项
     * @param {type}
     * @Date: 2019-04-22 14:23:38
     */
    handleAddressItem(formData) {
      console.log(formData)
      // 判断是否选择
      if (this.type) {
        // 存入缓存
        mpvue.setStorage({
          key: 'selAddress',
          data: formData,
          success: function () {
            mpvue.navigateBack(); // 返回上一个页面
          }
        })
      } else {
        this.formData = { ...formData, use: 'set' };
        this.isShow = !this.isShow;
      }
    },

    /**
     * @description: 添加地址
     * @Date: 2019-04-22 15:29:25
     */
    handleAddAddress() {
      this.formData = {
        name: '',
        phone: '',
        region: '',
        address: '',
        tag: '',
        use: 'add',
        isNormal: false
      }
      this.isShow = !this.isShow;
    },

    /**
     * @description:表单提交
     * @param {Object} formData 表单数据
     * @Date: 2019-04-22 17:24:22
     */
    handleSubmitForm(formData) {
      console.log(formData)
      this.addressList.push(formData)
      console.log(formData)
    }
  },

  created() {
  }
}
</script>

<style scoped lang="scss">
.address-container {
  padding-bottom: 84px;
  .address-list {
    margin: 0 15px;
  }
  .add-btn-box {
    position: fixed;
    height: 44px;
    line-height: 44px;
    text-align: center;
    left: 15px;
    right: 15px;
    bottom: 20px;
    background-color: #ffffff;
    border-radius: 22px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    .add-icon {
      width: 15px;
      height: 15px;
      margin-right: 10px;
      background-color: #ff6666;
    }
    .add-txt {
      font-size: 15px;
      color: #ff6666;
    }
  }
}
</style>
