<template>
  <div
    class="address-item"
    @click="$emit('click',item)"
    @longpress="$emit('longpress',item)"
  >
    <div
      class="address-normal"
      v-if="item.is_default"
    >默认</div>

    <div
      v-if="use === 'select'"
      :class="['address-icon',{'on':activeId === item.id}]"
    ></div>

    <div class="address-content">
      <div class="address-info">
        <div class="address-name">{{item.consignee}}&nbsp;&nbsp;&nbsp;{{item.consignee_mobile}}</div>
        <!-- <div
          class="avtive-txt"
          v-if="activeId == item.id"
        >当前选择</div> -->
      </div>
      <p class="address-cc"><span
          class="address-tag"
          v-if="item.tag"
        >{{item.tag}}</span>{{item.area[0]+ ' ' + item.area[1]+ ' ' + item.area[2]+ ' ' + item.address}}</p>
    </div>
    <div class="address-more-icon" @click.stop="$emit('editChange',item)"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否选中
    activeId: {
      type: Number || String,
      default: ''
    },
    // 地址数据
    item: {
      type: Object,
      requeired: true
    },
    use: {
      type: String,
      default: 'set'
    }
  }
}
</script>

<style lang="scss" scoped>
.address-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-top: 15px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  .address-normal {
    width: 60px;
    line-height: 20px;
    position: absolute;
    top: 4px;
    right: -18px;
    transform: rotate(45deg);
    background-color: #ff6666;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
  }
  .address-tag {
    display: inline-block;
    width: 30px;
    margin-right: 5px;
    line-height: 15px;
    font-size: 12px;
    color: #ff6666;
    text-align: center;
    background-color: rgba(255, 102, 102, 0.1);
    border-radius: 1px;
    box-sizing: border-box;
  }
  .address-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin-right: 12px;
    background: url('../../../static/images/select_no.png') no-repeat;
    background-size: 100% 100%;
    align-self: flex-start;
    &.on {
      background: url('../../../static/images/select_on.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .address-content {
    flex: 1;
    margin-right: 15px;
    overflow: hidden;
    .address-info {
      display: flex;
      align-items: center;
      line-height: 20px;
      .address-name {
        margin-right: 5px;
        font-size: 15px;
        color: #282828;
        max-width: 75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .avtive-txt {
        border-radius: 3px;
        font-size: 12px;
        width: 20%;
        line-height: 15px;
        text-align: center;
        color: #ff6666;
        border: 1px solid #ff6666;
      }
    }
    .address-cc {
      margin-top: 10px;
      font-size: 15px;
      line-height: 20px;
      color: #282828;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      // overflow: hidden;
    }
  }
  .address-more-icon {
    width: 14px;
    height: 15px;
    display: block;
    background: url('../../../static/images/Edit_iCon.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
