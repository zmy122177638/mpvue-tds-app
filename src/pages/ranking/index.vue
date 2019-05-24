<template>
  <section class="ranking-container">
    <Tds-header></Tds-header>
    <kaidianYouliBtn :userIsVip="userInfo.type"></kaidianYouliBtn>
    <div class="ranking-action">
      <div class="ranking-category">
        <div :class="['ranking-category-item',{on: queryData.category === 'goods'}]"
             @click="searchRankChange('goods',queryData.timeDay)">本月热卖</div>
        <div :class="['ranking-category-item',{on: queryData.category === 'shop'}]"
             @click="searchRankChange('shop',queryData.timeDay)">小店排行</div>
      </div>
      <div class="ranking-timer"
           v-if="queryData.category !== 'goods'">
        <div :class="['ranking-timer-item',{on: queryData.timeDay === 'yesterday'}]"
             @click="searchRankChange(queryData.category,'yesterday')">
          昨天
        </div>
        <div :class="['ranking-timer-item',{on: queryData.timeDay === 'last7day'}]"
             @click="searchRankChange(queryData.category,'last7day')">
          7天
        </div>
        <div :class="['ranking-timer-item',{on: queryData.timeDay === 'last30day'}]"
             @click="searchRankChange(queryData.category,'last30day')">
          30天
        </div>
      </div>
    </div>
    <scroll-view class="ranking-content"
                 scroll-y
                 :scroll-top="scrollTopNum">
      <div class="ranking-list-title"
           v-if="queryData.category === 'shop'">
        <div class="ranking-title-txt">排名</div>
        <div class="ranking-title-txt">小店信息</div>
        <div class="ranking-title-txt">销售额</div>
      </div>

      <div class="ranking-list"
           :style="queryData.category === 'shop'?'padding-top:0':''">
        <div class="ranking-item"
             v-for="(item,index) in rankingList"
             :key="index">
          <div class="item-left">
            <div class="item-num">No.{{item.ranking}}</div>
            <div class="img-box">
              <img :class="['item-img',{'on':queryData.category === 'goods'}]"
                   :src="item.image_url"
                   alt="">
              <div class="item-grade"
                   v-if="item.shop_level">{{item.shop_level}}</div>
            </div>

            <div class="item-info">
              <div class="item-name">
                <div class="item-tx">{{item.title}}的小店</div>

              </div>
              <div class="item-status"
                   v-if="item.vip_level">{{item.vip_level}}</div>
            </div>
          </div>
          <div class="item-right"
               v-show="queryData.category === 'shop'">{{item.score}}</div>
        </div>
      </div>
      <div v-if="rankingList.length > 0"
           :class="['ranking-ponint',{'on':queryData.category === 'shop'}]">
        {{queryData.category === 'shop'?'仅显示前二十名小店排行':'仅显示前二十名商品排行'}}
      </div>
      <div v-if="isNodata"
           :class="['ranking-ponint',{'on':queryData.category === 'shop'}]">
        暂无数据
      </div>
      <!-- 悬浮店铺排名 -->
      <div class="ranking-self"
           v-if="queryData.category === 'shop' && my_ranking.ranking">
        <div class="ranking-rknum">我的小店排名: <span>{{'No.'+(my_ranking.ranking || 0)}}</span></div>
        <div class="ranking-rkmoney">金额: {{my_ranking.score || 0}}</div>
      </div>
    </scroll-view>
  </section>
</template>

<script>
import TdsHeader from '@/components/tds-header/tds-header'
import kaidianYouliBtn from '@/components/kaidianYouliBtn/KaidianYouliBtn'
export default {
  data () {
    return {
      // category 排行类别  timeDay 排行时间
      queryData: {
        category: 'goods',
        timeDay: 'month'
      },
      // scrollTop位置
      scrollTopNum: '',
      // 排行列表
      rankingList: [],
      // 我的排行
      my_ranking: {},
      // 无数据
      isNodata: false
    }
  },

  components: {
    TdsHeader,
    kaidianYouliBtn
  },
  mounted () {
    this.getShopRanking(this.queryData);
  },
  computed: {
    // 用户信息
    userInfo () {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    getShopRanking (queryData) {
      this.$http.request('get', `rankings/${queryData.category}/${queryData.timeDay}`).then(({ code, resource }) => {
        if (code === 200) {
          if (queryData.category === 'shop') {
            this.rankingList = resource.all;
            this.my_ranking = resource.my_ranking;
          } else if (queryData.category === 'goods') {
            this.rankingList = resource;
          }
          this.isNodata = this.rankingList.length < 1;
        } else {
          mpvue.showToast({
            title: '获取排行失败，请重试',
            icon: 'none',
            duration: 2000
          })
        }

        console.log(resource)
      })
    },
    /**
     * @description: 切换排行条件
     * @param {Number}  category 排行分类
     * @param {Number}  timeDay 排行时间
     * @return: undefined
     * @Date: 2019-04-16 11:08:04
     */
    searchRankChange (category, timeDay) {
      if (category === 'goods') {
        timeDay = 'month';
      } else if (category === 'shop' && timeDay === 'month') {
        if (!this.userInfo.type) {
          mpvue.showToast({
            title: '你还没有小店哦,赶紧去开店吧',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        timeDay = 'yesterday'
      }
      this.queryData = { category, timeDay };
      console.log(this.queryData)
      this.getShopRanking(this.queryData);

      // this.scrollTopNum = 0
      // this.$nextTick(() => {
      //   this.scrollTopNum = ''
      // })
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
    background-color: #ffffff;
    -webkit-overflow-scrolling: touch;
    .ranking-list {
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
            font-style: italic;
            font-family: Avenir Next;
          }
          .img-box {
            position: relative;
          }
          .item-img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            margin-right: 15px;
            background: url('../../../static/images/AvatarNull.png') no-repeat;
            background-size: 100% 100%;
            &.on {
              border-radius: 6px;
              background: url('../../../static/images/CommodityNull.png')
                no-repeat;
              background-size: 100% 100%;
            }
          }
          .item-grade {
            position: absolute;
            bottom: 0;
            left: 0;
            font-family: Avenir Next;
            padding: 0px 5.8px;
            background-color: #ff6666;
            color: #ffffff;
            line-height: 14px;
            font-size: 10px;
            font-weight: 500;
            border-radius: 7.5px 7.5px 7.5px 0px;
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
          font-style: italic;
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

