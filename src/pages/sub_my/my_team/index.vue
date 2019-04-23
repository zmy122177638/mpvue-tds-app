<template>
  <section class="team-container">
    <div
      id="navNode"
      :style="'height:'+ fillHeight+'px'"
    >
      <div :class="['nav-list',{fixed:isFixed}]">
        <div
          :class="['nav-item',{on:index === currentIndex}]"
          v-for="(item,index) in navList"
          @click="currentIndex = index"
          :key="index"
        >{{item}}</div>
      </div>
    </div>
    <div class="team-content">
      <!-- 团队成员 -->
      <div
        class="my-member"
        v-show="currentIndex === 0"
      >
        <!-- 我的统计 -->
        <div class="my-team">
          <div class="my-team-list">
            <div class="my-team-item">
              <div class="item-value">36 <span>人</span></div>
              <div class="item-key">直属团长</div>
            </div>
            <div class="my-team-item">
              <div class="item-value">36<span>人</span></div>
              <div class="item-key">从属团长</div>
            </div>
          </div>
        </div>

        <!-- team-list -->
        <div class="member-list">
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
          <Layout-member-item></Layout-member-item>
        </div>
      </div>

      <!-- 团队收益 -->
      <div
        class="my-profit"
        v-show="currentIndex === 1"
      >
        <!-- 收益列表 -->
        <div class="profit-list">
          <Layout-profit-item></Layout-profit-item>
          <Layout-profit-item></Layout-profit-item>
        </div>

        <!-- 收益海报 -->
        <div class="profit-poster">
          <h3 class="poster-title">后台上传海报</h3>

          <div class="poster-describe">
            邀请更多好友成为团大师团长
            <br />
            收益涨涨涨
          </div>
          <div class="poster-btn">立即邀请</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LayoutMemberItem from '@/components/tds-layout/layout-member-item'
import LayoutProfitItem from '@/components/tds-layout/layout-profit-item'
export default {
  components: {
    LayoutMemberItem,
    LayoutProfitItem
  },
  data() {
    return {
      // 选中的导航
      currentIndex: 0,
      // 导航列表
      navList: ['团长团员', '团队收益'],
      // 是否悬浮
      isFixed: false,
      // 填充高度
      fillHeight: ''
    }
  },

  onLoad(options) {
    console.log(options)
    // 接收导航默认选中参数，current
    this.currentIndex = parseInt(options.current) || 0
  },
  mounted() {
    this.getBoundingClientRect('#navNode', (res) => {
      this.fillHeight = res[0].height;
    })
  },
  onPageScroll(ev) {
    this.getBoundingClientRect('#navNode', (res) => {
      if (res[0].top < 0) {
        this.isFixed = true;
      } else if (res[0].bottom > 0) {
        this.isFixed = false;
      }
    })
  },
  methods: {
    /**
     * @description: 获取节点信息 mpvueAPI
     * @param {String} node 节点选择器
     * @param {Function} cb 回调函数
     * @Date: 2019-04-22 09:23:50
     */
    getBoundingClientRect(node, cb) {
      let query = mpvue.createSelectorQuery();
      query.select(node).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        cb(res)
      })
    }
  }

}
</script>

<style scoped lang="scss">
.nav-list {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 7px 0 15px;
  background-color: #ffffff;
  will-change: all;
  border-bottom: 1px solid #f5f5f5;
  &.fixed {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    width: 100%;
  }
  .nav-item {
    flex: 1;
    font-size: 14px;
    color: #b1b1b1;
    text-align: center;
    padding: 12px 0;
    transition: all 0.3s;
    &:nth-last-child(1) {
      margin-right: 0;
    }
    &::after {
      content: '';
      width: 0px;
      height: 2px;
      background-color: transparent;
      position: absolute;
      bottom: 0;
      left: 50%;
      transition: all 0.3s ease-out;
      transform: translate3d(-50%, 0, 0);
    }
    &.on {
      font-size: 14px;
      color: #282828;
      position: relative;
      font-weight: bold;
      &::after {
        content: '';
        width: 18px;
        background-color: #ff6666;
      }
    }
  }
}
.team-content {
  padding-bottom: 30px;
}
// 我的团队
.my-team {
  .my-team-list {
    margin: 15px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    .my-team-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      border-right: 1px solid #dfdfdf;
      justify-content: center;
      &:nth-last-child(1) {
        border: none;
      }
      .item-value {
        font-size: 22px;
        color: #ff6666;
        span {
          font-size: 12px;
        }
      }
      .item-key {
        font-size: 12px;
        color: #282828;
      }
    }
  }
}

// 成员列表
.member-list {
  background-color: #ffffff;
  padding: 0 15px;
}

// 团队收益
.profit-list {
  margin: 0 15px;
}

// 海报
.profit-poster {
  background: rgba(255, 102, 102, 1);
  border-radius: 6px;
  margin: 30px 15px;
  overflow: hidden;
  text-align: center;
  .poster-title {
    padding-top: 24px;
    font-size: 35.5px;
    font-weight: bold;
    color: #ffffff;
  }
  .poster-describe {
    font-size: 12px;
    color: #ffffff;
    font-weight: bold;
    padding: 18px 0;
  }
  .poster-btn {
    width: 60%;
    height: 32.5px;
    line-height: 32.5px;
    background-color: #ffffff;
    color: #ff6666;
    font-size: 12px;
    font-weight: bold;
    border-radius: 17px;
    border: 1px solid rgba(112, 112, 112, 1);
    margin: 0 auto 15px;
  }
}
</style>
