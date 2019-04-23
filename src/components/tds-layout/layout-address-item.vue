<template>
  <div
    class="address-item"
    @click="$emit('click',item)"
  >
    <div class="address-normal" v-if="item.isNormal">默认</div>
    <div class="address-icon"></div>
    <div class="address-content">
      <p class="address-name">{{item.name}}&nbsp;&nbsp;&nbsp;{{item.phone}}</p>
      <p class="address-cc"><span class="address-tag">{{item.tag}}</span>{{item.region + ',' + item.address}}</p>
    </div>
    <div class="address-more-icon"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      requeired: true
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
    width: 28px;
    margin-right: 5px;
    line-height: 15px;
    font-size: 13px;
    color: #ff6666;
    text-align: center;
    background-color: rgba(255, 102, 102, 0.1);
    border-radius: 1px;
    box-sizing: border-box;
  }
  .address-icon {
    width: 18px;
    height: 18px;
    background-color: #ff6666;
    border-radius: 50%;
    margin-right: 12px;
    align-self: flex-start;
  }
  .address-content {
    flex: 1;
    margin-right: 15px;
    overflow: hidden;
    .address-name {
      font-size: 15px;
      line-height: 20px;
      color: #282828;
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
    width: 7px;
    height: 13px;
    background-color: #ff6666;
  }
}
</style>
