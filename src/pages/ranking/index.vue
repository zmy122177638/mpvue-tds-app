<template>
  <section class="ranking-container">
    <Tds-header></Tds-header>
    <div
      class="ranking-action"
      :style="queryData.category === 0 ?'border:none':''"
    >
      <div class="ranking-category">
        <div
          :class="['ranking-category-item',{on: queryData.category === 0}]"
          @click="searchRankChange(0,queryData.timer)"
        >本月热卖</div>
        <div
          :class="['ranking-category-item',{on: queryData.category === 1}]"
          @click="searchRankChange(1,queryData.timer)"
        >优秀团长</div>
      </div>
      <div
        class="ranking-timer"
        v-if="queryData.category === 1"
      >
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 0}]"
          @click="searchRankChange(queryData.category,0)"
        >
          今日
        </div>
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 1}]"
          @click="searchRankChange(queryData.category,1)"
        >
          周
        </div>
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 2}]"
          @click="searchRankChange(queryData.category,2)"
        >
          月
        </div>
      </div>
    </div>
    <scroll-view
      class="ranking-content"
      scroll-y
      :scroll-top="scrollTopNum"
    >
      <div
        class="ranking-list-title"
        v-if="queryData.category === 1"
      >
        <div class="ranking-title-txt">排名</div>
        <div class="ranking-title-txt">小店名称</div>
        <div class="ranking-title-txt">销售额</div>
      </div>
      <div
        class="ranking-list"
        :style="queryData.category === 1?'padding-top:0;':''"
      >
        <div
          class="ranking-item"
          v-for="(item,index) in rankingList"
          :key="index"
        >
          <div class="item-left">
            <div class="item-num">No.{{index+1}}</div>
            <div class="item-img-box">
              <img
                class="item-img"
                :src="item.img"
                :style="queryData.category === 1?'border-radius:50%':''"
                alt=""
              >
              <div
                class="item-grade"
                v-if="item.grade"
              >Lv.{{item.grade}}</div>
            </div>

            <div class="item-info">
              <div class="item-name">
                <div class="item-tx">{{item.name}}</div>
                <img
                  class="item-grade-icon"
                  v-if="item.grade"
                  src="../../../static/img/grade_icon.png"
                />
              </div>
            </div>
          </div>
          <div class="item-right">{{item.orderNum}}</div>
        </div>
      </div>
      <div class="ranking-ponint">仅显示前二十名排行</div>
    </scroll-view>
  </section>
</template>

<script>
import TdsHeader from '@/components/tds-header/tds-header'
export default {
  data() {
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
    searchRankChange(category, timer) {
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

  // 排行头
  .ranking-list-title {
    display: flex;
    padding: 20px 30px 15px;
    align-items: center;
    background-color: #ffffff;
    justify-content: space-between;
    .ranking-title-txt {
      font-size: 15px;
      color: #282828;
      font-weight: bold;
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
          .item-img-box {
            position: relative;
            margin-right: 15px;
          }
          .item-img {
            width: 44px;
            height: 44px;
            border-radius: 6px;
          }
          .item-grade {
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
          .item-grade-icon {
            width: 27px;
            height: 27px;
            margin-left: 10px;
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
  }
}
</style>
