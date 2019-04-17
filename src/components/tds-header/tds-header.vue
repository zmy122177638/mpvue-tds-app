<template>
  <header class="tds-header">
    <div class="tds-header-box">
      <div class="tds-header-left">
        <slot name="left">
          <img
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=27&gp=0.jpg"
            class="tds-header-img"
            alt=""
          >
          <h2 class="tds-header-shopname"><span class="tds-header-name">王多多</span>的团大师小店</h2>
        </slot>
      </div>
      <div class="tds-header-right">
        <slot name="right">
          <img
            src="../../../static/img/user_type.png"
            class="tds-header-shopicon"
            alt=""
          >
        </slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {

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
    .tds-header-img {
      display: block;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .tds-header-shopname {
      font-size: 18px;
      font-weight: bold;
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
