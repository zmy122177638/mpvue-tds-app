<template>
  <div class="buyer-item">

    <!-- 标题 -->
    <div class="buyer-title">
      <div class="title-left">买家信息</div>
    </div>

    <!-- 主体内容 -->
    <div class="buyer-info">
      <img
        :src="item.headimgurl"
        class="buyer-userimg"
        alt=""
      >
      <div class="buyer-cont">
        <div class="buyer-nickname">{{item.nickname}}</div>
        <div class="buyer-pipe">
          <div class="buyer-pipe-item">
            <div class="item-key">收货姓名：</div>
            <div class="item-value">{{item.consignee}}</div>
          </div>
          <div class="buyer-pipe-item">
            <div class="item-key">联系手机：</div>
            <div class="item-value">{{item.consignee_mobile}}</div>
          </div>
          <div class="buyer-pipe-item">
            <div class="item-key">收货地址：</div>
            <div class="item-value">{{item.consignee_address}}</div>
          </div>
          <div class="buyer-pipe-item">
            <div class="item-key">备注信息：</div>
            <div class="item-value">{{item.remark || '无备注'}}</div>
          </div>
          <div
            class="buyer-pipe-item"
            v-if="!item.logistic_code"
          >
            <div class="item-key">物流信息：</div>
            <div class="item-value">暂无</div>
          </div>
          <div
            class="buyer-pipe-item"
            v-else
          >
            <div class="item-key">{{item.shipper_code}}：</div>
            <div class="item-value">{{item.logistic_code}} <img
                class="vehicle-icon"
                src="../../../static/images/Express44_iCon.png"
              /></div>
          </div>
          <!-- 
          <div
            class="buyer-pipe-set"
            @click="$emit('setAddress')"
          >修改收货地址</div> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.buyer-item {
  margin-top: 15px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  .buyer-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .title-left {
      font-size: 18px;
      color: #282828;
      font-weight: bold;
    }
  }
  // 信息
  .buyer-info {
    display: flex;
    .buyer-userimg {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      display: block;
      margin-right: 15px;
    }
    .buyer-cont {
      flex: 1;
      overflow: hidden;
      .buyer-nickname {
        font-size: 15px;
        color: #282828;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .buyer-pipe {
        .buyer-pipe-item {
          margin-top: 10px;
          display: flex;
          .item-key {
            font-size: 14px;
            color: #b1b1b1;
          }
          .item-value {
            flex: 1;
            font-size: 14px;
            color: #656565;
          }
          .vehicle-icon {
            margin-top: -2px;
            width: 22px;
            height: 22px;
            display: inline-block;
            margin-left: 5px;
            vertical-align: middle;
            border-radius: 50%;
            box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
          }
        }
      }
      .buyer-pipe-set {
        width: 180px;
        height: 34px;
        line-height: 34px;
        color: #ffffff;
        text-align: center;
        background: #ff6666;
        border-radius: 17px;
        box-shadow: 0px 5px 10px rgba(255, 102, 102, 0.35);
        font-size: 15px;
        color: #ffffff;
        margin-bottom: 10px;
        margin-top: 20px;
      }
    }
  }
}
</style>
