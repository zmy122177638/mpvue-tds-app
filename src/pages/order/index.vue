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
          昨天
        </div>
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 1}]"
          @click="searchRankChange(queryData.category,1)"
        >
          7天
        </div>
        <div
          :class="['ranking-timer-item',{on: queryData.timer === 2}]"
          @click="searchRankChange(queryData.category,2)"
        >
          30天
        </div>
      </div>
    </div>
    <scroll-view
      class="ranking-content"
      scroll-y
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
            <div class="item-name">{{item.name}}</div>
          </div>
          <div class="item-right">{{item.orderNum}}单</div>
        </div>
      </div>
    </scroll-view>
  </section>
</template>

<script>
import TdsHeader from '../../components/tds-header/tds-header'
export default {
  data () {
    return {
      // category 排行类别  timer 排行时间
      queryData: {
        category: 0,
        timer: 0
      },
      rankingList: [
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黄凤梨黄凤梨黄凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 },
        { img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1393987749,3422146058&fm=27&gp=0.jpg', name: '黑凤梨黑凤梨黑凤', orderNum: 10 }
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
        box-shadow: 0 5px 10px #ff6666;
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
      padding: 25px 0;
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
          }
          .item-img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            margin-right: 15px;
          }
          .item-name {
            flex: 1;
            font-size: 15px;
            color: #282828;
            margin-right: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        .item-right {
          font-size: 15px;
          color: #656565;
        }
      }
    }
  }
}
</style>
