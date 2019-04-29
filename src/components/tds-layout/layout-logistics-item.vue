<template>
  <div class="logistics-item">

    <!-- 标题 -->
    <div class="logistics-title">
      <div class="title-left">订单状态</div>
      <div
        v-if="status >= 7"
        class="title-right"
        @click="$emit('onService')"
      >申请售后</div>
    </div>

    <!-- 主体内容 -->
    <div class="logistics-info">
      <div class="order-status-box">
        <div
          :class="['order-status-item', {'on':item.time}]"
          v-for="(item,index) in stateList"
          :key="index"
        >
          <div class="step-box"></div>
          <div class="order-status-btn">
            <p class="order-status">{{item.val}}</p>
            <p class="order-status-time">{{item.time}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 状态列表
    stateList: {
      type: Boolean,
      required: true
    },
    // 物流状态
    status: {
      default: 3
    }
  }
}
</script>

<style lang="scss" scoped>
.logistics-item {
  margin-top: 15px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  .logistics-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .title-left {
      font-size: 18px;
      color: #282828;
      font-weight: bold;
    }
    .title-right {
      width: 64px;
      line-height: 25px;
      text-align: center;
      height: 25px;
      background-color: #ffefef;
      border-radius: 6px;
      color: #ff6666;
      font-size: 12px;
    }
  }
  // 信息
  .logistics-info {
    display: flex;
    .order-status-box {
      flex: 1;
      .order-status-item {
        margin-left: 25px;
        padding: 10px 0 10px 21.5px;
        border-left: 1px solid #f6f8fa;
        position: relative;
        .step-box {
          position: absolute;
          left: -10px;
          top: 50%;
          margin-top: -9px;
          width: 18px;
          height: 18px;
          border: 3px solid #c1c1c1;
          box-sizing: border-box;
          background-color: #ffffff;
          border-radius: 50%;
          &::before {
            width: 0;
          }
          &::after {
            width: 0;
          }
        }

        .order-status-btn {
          padding: 12px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f6f8fa;
          border-radius: 5px;
          position: relative;
          &::before {
            content: '';
            border: 10px solid transparent;
            border-right-color: #f6f8fa;
            position: absolute;
            left: -16px;
            top: 50%;
            margin-top: -10px;
          }
          .order-status {
            font-size: 15px;
            color: #c1c1c1;
          }
          .order-status-time {
            font-size: 14px;
            color: #c1c1c1;
          }
        }
        &.on {
          border-left: 2px solid #ff6666;
          .step-box {
            position: absolute;
            left: -11px;
            top: 50%;
            margin-top: -10px;
            width: 20px;
            height: 20px;
            background: rgba(255, 102, 102, 0.3);
            border-radius: 50%;
            border: none;
            &::before {
              content: '';
              width: 12px;
              height: 12px;
              background-color: #ff6666;
              border-radius: 50%;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
            &::after {
              content: '';
              width: 5px;
              height: 5px;
              background-color: #ffffff;
              border-radius: 50%;
              position: absolute;
              left: 50%;
              top: 50%;
              z-index: 1;
              transform: translate(-50%, -50%);
            }
            &.end {
              bottom: 0;
              top: normal;
              bottom: 0;
            }
          }
          .order-status-btn {
            .order-status {
              font-size: 15px;
              color: #ff6666;
            }
            .order-status-time {
              font-size: 14px;
              color: #ff6666;
            }
          }
        }
      }
    }
  }
}
</style>
