<template>
  <div class="member-item">
    <img
      src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg"
      class="member-img"
      alt=""
    >
    <div class="member-content">
      <div class="member-t">
        <span class="name">卖火柴的小女孩</span>
        <span class="copy-icon"></span>
        <span class="phone-icon"></span>
      </div>
      <div class="member-c">
        <p class="member-c-p">最近登录：2019/04/10 19:34:20</p>
        <p class="member-c-p">从属：136人</p>
      </div>
      <div class="member-f">
        <p class="member-f-p">累计销售额：<span>￥2615</span></p>
        <p class="member-f-p">累计订单：<span>26笔</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.inlines {
  display: inline-block;
  vertical-align: middle;
}
.member-item {
  display: flex;
  padding: 20px 0 15px;
  background-color: #ffffff;
  border-bottom: 1px solid #f2f2f2;
  .member-img {
    display: block;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .member-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .member-t {
      display: flex;
      align-items: center;
      .name {
        font-size: 16px;
        font-weight: bold;
        color: #282828;
        display: inline-block;
      }
      .copy-icon {
        width: 15px;
        height: 15px;
        background-color: red;
        display: inline-block;
        margin-left: 20px;
      }
      .phone-icon {
        width: 15px;
        height: 15px;
        background-color: red;
        display: inline-block;
        margin-left: 20px;
      }
    }
    .member-c {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top:10px;
      .member-c-p {
        font-size: 12px;
        color: #b1b1b1;
      }
    }
    .member-f {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top:10px;
      .member-f-p {
        font-size: 14px;
        color: #656565;
        span {
          color: #ff6666;
        }
      }
    }
  }
}
</style>
