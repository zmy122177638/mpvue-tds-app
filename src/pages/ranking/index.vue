<template>
  <section class="ranking-container">
    <Tds-header></Tds-header>
    <div class="ranking-action">
      <div class="ranking-category">
        <div
          :class="['ranking-category-item',{on: queryData.category === 0}]"
          @click="searchRankChange(0,queryData.timer)"
        >用户排行</div>
        <div
          :class="['ranking-category-item',{on: queryData.category === 1}]"
          @click="searchRankChange(1,queryData.timer)"
        >店铺排行</div>
      </div>
      <div class="ranking-timer">
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 0}]"
          @click="searchRankChange(queryData.category,0)"
        >
          今天
        </div>
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 1}]"
          @click="searchRankChange(queryData.category,1)"
        >
          昨天
        </div>
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 2}]"
          @click="searchRankChange(queryData.category,2)"
        >
          本月累计
        </div>
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 3}]"
          @click="searchRankChange(queryData.category,3)"
        >
          上月总榜
        </div>
      </div>
    </div>
    <scroll-view
      class="ranking-content"
      scroll-y
      :scroll-top="scrollTopNum"
    >
      <div class="ranking-list">
        <div
          class="ranking-item"
          v-for="(item,index) in rankingList"
          :key="index"
        >
          <div class="item-left">
            <div class="item-num">No.{{index+1}}</div>
            <img
              class="item-img"
              :src="item.img"
              alt=""
            >
            <div class="item-info">
              <div class="item-name">
                <div class="item-tx">{{item.name}}</div>
                <div
                  class="item-grade"
                  v-if="item.grade"
                >Lv.{{item.grade}}</div>
              </div>
              <div
                class="item-status"
                v-if="item.status"
              >{{item.status}}</div>
            </div>
          </div>
          <div class="item-right">{{item.orderNum}}</div>
        </div>
      </div>
      <div :class="['ranking-ponint',{'on':queryData.category === 1}]">仅显示前二十名用户排行</div>
      <!-- 悬浮店铺排名 -->
      <div
        class="ranking-self"
        v-if="queryData.category === 1"
      >
        <div class="ranking-rknum">我的小店排名: <span>No.351</span></div>
        <div class="ranking-rkmoney">金额: 357</div>
      </div>
    </scroll-view>
  </section>
</template>

<script>
import TdsHeader from '@/components/tds-header/tds-header'
export default {
  data () {
    return {
      // category 排行类别  timer 排行时间
      queryData: {
        category: 0,
        timer: 0
      },
      scrollTopNum: '',
      rankingList: [
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 }

      ]
    }
  },

  components: {
    TdsHeader
  },

  methods: {
    /**
     * @description: 切换排行条件
     * @param {Number}  category 排行分类
     * @param {Number}  timer 排行时间
     * @return: undefined
     * @Date: 2019-04-16 11:08:04
     */
    searchRankChange (category, timer) {
      this.queryData = { category, timer }
      console.log(this.queryData)
      this.scrollTopNum = 0
      this.$nextTick(() => {
        this.scrollTopNum = ''
      })
      if (this.queryData.category === 1) {
        this.rankingList = this.rankingList.fill({ img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10, status: '资深掌柜', grade: 4 }, 0, this.rankingList.length)
      } else {
        this.rankingList = this.rankingList.fill({ img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤', orderNum: 10 }, 0, this.rankingList.length)
      }
    }
  }
}
</script>

<style scoped lang="scss">
img {
  display: block;
}
.ranking-container {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .ranking-action {
    background-color: #ffffff;
    border-bottom: 1px solid #f2f2f2;
  }
  // 排行分类
  .ranking-category {
    display: flex;
    justify-content: space-between;
    padding: 15px 26.5px 8px;
    align-items: center;
    .ranking-category-item {
      text-align: center;
      width: 134px;
      height: 34px;
      line-height: 34px;
      color: #b1b1b1;
      font-size: 15px;
      border-radius: 6px;
      background-color: #f6f8fa;
      &.on {
        background-color: #ff6666;
        box-shadow: 0 5px 10px rgba(255, 102, 102, 0.35);
        color: #ffffff;
      }
    }
  }
  // 排行时间
  .ranking-timer {
    display: flex;
    align-items: center;
    .ranking-timer-item {
      flex: 1;
      padding: 12px 0;
      text-align: center;
      font-size: 15px;
      color: #b1b1b1;
      &.on {
        color: #ff6666;
        font-weight: bold;
        position: relative;
        &::after {
          content: '';
          width: 30px;
          height: 2px;
          background-color: #ff6666;
          position: absolute;
          bottom: 0;
          left: 50%;
          border-radius: 1px;
          transform: translate3d(-50%, 0, 0);
        }
      }
    }
  }
  // 排行内容
  .ranking-content {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .ranking-list {
      background-color: #ffffff;
      padding-top: 25px;
      .ranking-item {
        padding: 0 30px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
        .item-left {
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          .item-num {
            width: 58px;
            font-size: 15px;
            color: #ff0a0a;
            font-weight: 500;
            font-family: Avenir Next;
          }
          .item-img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            margin-right: 15px;
          }
          .item-info {
            display: flex;
            flex: 1;
            flex-direction: column;
            overflow: hidden;
            margin-right: 15px;
            box-sizing: border-box;
            .item-name {
              flex: 1;
              display: flex;
              align-items: center;
              font-size: 15px;
              color: #282828;
              .item-tx {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              .item-grade {
                margin-left: 3px;
                font-family: Avenir Next;
                padding: 0px 5px;
                background-color: #ff6666;
                color: #ffffff;
                line-height: 16px;
                font-size: 12px;
                font-weight: 500;
                border-radius: 3px;
              }
            }
            .item-status {
              font-size: 12px;
              color: #b1b1b1;
            }
          }
        }
        .item-right {
          font-size: 15px;
          color: #656565;
        }
      }
    }
    .ranking-ponint {
      font-size: 14px;
      color: #b1b1b1;
      background-color: #ffffff;
      text-align: center;
      padding: 25px 0;
      &.on {
        padding-bottom: 70px;
      }
    }
    .ranking-self {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 11.5px 30px;
      box-sizing: border-box;
      background-color: rgba(255, 102, 102, 0.9);
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .ranking-rknum {
        font-size: 15px;
        color: #ffffff;
        span {
          font-family: Avenir Next;
          font-weight: 500;
        }
      }
      .ranking-rkmoney {
        font-size: 15px;
        color: #ffffff;
      }
    }
  }
}
</style>
