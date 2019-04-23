<template>
  <header class="tds-header">
    <div class="tds-header-box">
      <div class="tds-header-left">
        <slot name="left">
          <div class="tds-header-figure">
            <img
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=27&gp=0.jpg"
              class="tds-header-img"
              alt=""
            >
            <div class="user-grade">Lv.2</div>
          </div>

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
