<template>
  <section class="address-container">
    <div class="address-list">
      <Layout-address-item
        v-for="(item,index) in addressList"
        :key="index"
        :item="item"
        :activeId="activeId"
        @click="handleAddressItem"
        @longpress="longpressAddressItem"
      ></Layout-address-item>
    </div>
    <!-- 新增地址 -->
    <div
      class="add-btn-box"
      @click="handleAddAddress()"
    >
      <img
        src="../../../../static/images/add.png"
        class="add-icon"
      >
      <div class="add-txt">新增地址</div>
    </div>
    <!-- 弹窗 -->
    <Tds-address-popup
      :isShow.sync="isShow"
      :data.sync="formData"
      :tagList="tagList"
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
      // set修改 select选择
      use: 'set',
      // 当前选中地址
      activeId: '',
      // 是否弹窗
      isShow: false,
      // 地址列表
      addressList: [],
      // 标签列表
      tagList: [],
      // 弹窗表单
      formData: {}
    }
  },
  onLoad(options) {
    // 获取传入值
    this.use = options.use || 'set';
    this.activeId = options.id || '';
    console.log(options)
  },
  mounted() {
    this.getAddressList();
  },
  methods: {
    /**
     * @description: 获取收货列表
     * @Date: 2019-04-27 09:52:41
     */
    getAddressList() {
      return this.$http.request('get', 'addresses').then(({ code, resource }) => {
        console.log(resource)
        if (code === 200) {
          this.tagList = resource.tag_list;
          this.addressList = resource.list;
        } else {
          mpvue.showToast({
            title: '获取收货列表失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

    /**
     * @description: 新增收货地址
     * @param {Object} params request参数
     * @return: undefined
     * @Date: 2019-04-27 09:59:18
     */
    addAddressItem(params) {
      return this.$http.request('post', 'addresses', params).then((res) => {
        if (res.code === 200) {
          this.getAddressList();
          mpvue.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          mpvue.showToast({
            title: '新增失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

    /**
     * @description: 修改收货地址
     * @param {Object} params request参数
     * @return: undefined
     * @Date: 2019-04-27 09:59:18
     */
    setAddressItem(params) {
      return this.$http.request('put', 'addresses/' + params.id, params).then((res) => {
        if (res.code === 200) {
          this.getAddressList()
          mpvue.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          mpvue.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

    /**
     * @description: 删除收货地址
     * @param {Number|String} id 地址id
     * @Date: 2019-04-27 09:59:18
     */
    deleteAddressItem(id) {
      return this.$http.request('delete', 'addresses/' + id).then((res) => {
        if (res.code === 200) {
          this.getAddressList()
          mpvue.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          mpvue.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

    /**
     * @description: 点击地址子项
     * @param {Object} formData // 地址数据
     * @Date: 2019-04-22 14:23:38
     */
    handleAddressItem(formData) {
      // 判断是否选择
      if (this.use === 'select') {
        this.activeId = formData.id;
        // 地址拼接
        formData.consignee_address = formData.area.join(' ') + ' ' + formData.address;
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
      console.log(formData)
    },

    /**
     * @description: 长按删除
     * @param {Object} item // 地址数据
     * @Date: 2019-04-27 14:46:46
     */
    longpressAddressItem(item) {
      // 如果是选择状态不允许删除
      if (this.use === 'select') {
        return;
      }
      let that = this;
      mpvue.showActionSheet({
        itemList: ['删除' + ' ' + item.consignee],
        itemColor: '#FF6666',
        success(res) {
          if (res.tapIndex === 0) {
            that.deleteAddressItem(item.id)
          }
        },
        fail(res) {
          that.activeId = '';
        }
      })
    },

    /**
     * @description: 添加地址
     * @Date: 2019-04-22 15:29:25
     */
    handleAddAddress() {
      this.formData = {
        consignee: '',
        consignee_mobile: '',
        area: '',
        address: '',
        tag: '',
        is_default: false,
        use: 'add'
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
      if (formData.use === 'set') {
        // 修改收货地址
        this.setAddressItem(formData)
      } else if (formData.use === 'add') {
        // 添加收货地址
        this.addAddressItem(formData)
      }
    }
  },

  onPullDownRefresh() {
    // 刷新地址列表
    this.getAddressList().then(() => {
      mpvue.stopPullDownRefresh()
    })
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
      width: 20px;
      height: 20px;
      margin-right: 10px;
      display: flex;
    }
    .add-txt {
      font-size: 15px;
      color: #ff6666;
    }
  }
}
</style>
