<template>
  <header class="tds-header">
    <div class="tds-header-box">
      <div class="tds-header-left">
        <slot name="left">
          <div class="tds-header-figure">
            <img
              :src="userInfo.headimgurl"
              class="tds-header-img"
              alt=""
            >
            <div class="user-grade">{{userInfo.shop_level}}</div>
          </div>

          <h2
            class="tds-header-shopname"
            v-if="userInfo.is_real_check"
          ><span class="tds-header-name">{{userInfo.nickname}}</span>的团大师小店</h2>
          <h2
            class="tds-header-shopname"
            v-else
          >未实名</h2>
        </slot>
      </div>
      <div class="tds-header-right">
        <slot name="right">
          <div :class="['my-status-icon','vip0'+userInfo.vip_level]"></div>
        </slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.tds-header-box {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 15px 10px;
  .tds-header-left {
    flex: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    .tds-header-figure {
      position: relative;
      margin-right: 10px;
    }
    .user-grade {
      font-family: Avenir Next;
      padding: 0px 5px;
      background-color: #ff6666;
      color: #ffffff;
      line-height: 14px;
      font-size: 10px;
      font-weight: 500;
      border-radius: 10.5px 10.5px 10.5px 0;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .tds-header-img {
      display: block;
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    .tds-header-shopname {
      font-size: 18px;
      font-weight: bold;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 5px;
      .tds-header-name {
        color: #ff6666;
      }
    }
  }
  .tds-header-right {
    display: flex;
    .tds-header-shopicon {
      width: 82px;
      height: 24px;
      display: block;
    }
  }
}
</style>
