<template>
  <div class="profit-item">
    <h3 class="item-label">直属团长收益<span class="label-point">(含已结算和未结算)</span></h3>
    <div class="item-content">
      <div class="item-box">累计订单：<span class="item-value">268笔</span></div>
      <div class="item-box">累计收益：<span class="item-value">￥12376</span></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.profit-item {
  margin-top: 15px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  .item-label {
    font-size: 15px;
    color: #282828;
    font-weight: bold;
  }
  .label-point {
    margin-left: 10px;
    font-size: 12px;
    color: #b1b1b1;
  }
  .item-content {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-box {
      font-size: 14px;
      color: #656565;
      .item-value {
        color: #ff6666;
      }
    }
  }
}
</style>
