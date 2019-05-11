<template>
  <section class="main">
    <img
      src="../../../../static/images/ExpressIMG.png"
      class="bg"
      alt=""
    >
    <scroll-view
      scroll-y
      class="scroll-view"
    >
      <section class="wrapper">
        <section class="content">
          <header class="top-header">物流状态</header>
          <ul
            class="list"
            v-if="hasLogistics"
          >
            <block
              v-for="(item, index) in logisticsData"
              :key="index"
            >
              <li
                :key="index"
                v-if="item.Remark == '在途中'"
              >
                <block
                  v-for="(v, i) in item.AcceptStation"
                  :key="i"
                >
                  <div
                    class="li"
                    :key="i"
                    v-if="i == 0"
                  >
                    <div class="time-l">{{ v.AcceptTime }}</div>
                    <div class="des-r">
                      <header class="des-header">{{ v.Remark }}</header>
                      <p class="des-p">{{ v.AcceptStation }}</p>
                    </div>
                  </div>
                  <div
                    class="li"
                    :key="i"
                    v-else
                  >
                    <div class="time-l small-time">{{ v.AcceptTime }}</div>
                    <div class="des-r">
                      <header
                        class="des-header before-header"
                        style="height: 10px;"
                      ></header>
                      <p class="des-p pre-last">{{ v.AcceptStation }}</p>
                    </div>
                  </div>
                </block>
              </li>
              <li
                :key="index"
                v-else
              >
                <div class="li">
                  <div class="time-l">{{ item.AcceptTime }}</div>
                  <div class="des-r">
                    <header class="des-header">{{ item.Remark }}</header>
                    <p class="des-p">{{ item.AcceptStation }}</p>
                  </div>
                </div>
              </li>
            </block>
          </ul>
          <p
            v-else
            class="not-tip"
          >没有更多物流信息</p>
        </section>
      </section>
    </scroll-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      logistic_code: '',
      query: {}, // 存储页面传递的参数，包括key_id和物流单号
      logisticsData: [], // 物流信息,
      hasLogistics: true // 是否有物流信息
    };
  },
  onLoad(options) {
    this.logistic_code = options.id;
  },
  mounted() {
    this.getWuLiuInfo();
  },
  methods: {
    getWuLiuInfo() {
      return this.$http.request('get', 'orders/logistics', {
        logistic_code: this.logistic_code
      })
        .then(({ code, resource }) => {
          console.info(resource);
          if (code === 200) {
            if (resource.traces.length >= 1) {
              this.hasLogistics = true;
              this.logisticsData = resource.traces;
            } else {
              this.hasLogistics = false;
            }
          } else {
            mpvue.showToast({
              title: '获取物流信息失败，请重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bg {
  height: 190px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.scroll-view {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  z-index: 2;
}
.wrapper {
  padding: 150px 15px 40px;
}
.content {
  min-height: 400px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  .top-header {
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: bold;
    color: #282828;
    padding: 20px 0;
    /*border: 1px solid red;*/
  }
  .not-tip {
    line-height: 200px;
    text-align: center;
    color: #b1b1b1;
  }

  .list {
    /*margin: 0px;*/
    /*padding: 0px;*/
    li .li {
      display: flex;
      .time-l {
        font-size: 14px;
        color: #656565;
        width: 100px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
        padding-top: 10px;
        /*border: 1px solid red;*/
        line-height: 25px;
      }
      .small-time {
        font-size: 13px;
        line-height: 20px;
      }
      .des-r {
        flex: 1;
        .des-header {
          font-family: PingFang SC;
          font-size: 17px;
          color: #656565;
          height: 37px;
          line-height: 37px;
          padding-left: 20px;
          position: relative;
          box-sizing: border-box;
          border-left: 2px solid #f6f8fa;
          /*border-left: 2px solid red;*/
          &::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #f6f8fa;
            // background: red;
            border-radius: 10px;
            position: absolute;
            left: -5px;
            bottom: -3px;
          }
        }
        .before-header {
          &::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #f6f8fa;
            // background: red;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            position: absolute;
            left: -5px;
            bottom: -17px;
          }
        }
        .des-p {
          display: block;
          font-size: 14px;
          color: #b1b1b1;
          word-break: break-all;
          word-wrap: break-word;
          padding-left: 20px;
          /*height: 80px;*/
          border-left: 2px solid #f6f8fa;
          /*border-left: 2px solid red;*/
          line-height: 25px;
          padding-bottom: 20px;
        }
        .pre-last {
          font-size: 13px;
          padding-bottom: 0px;
        }
      }
    }
    li .li:last-child {
      .des-r {
        .pre-last {
          padding-bottom: 20px;
        }
      }
    }
    /*第一个列表元素特殊处理*/
    li:first-child .li:first-child {
      .time-l {
        color: #ff7d30;
      }
      .des-r {
        .des-header {
          font-size: 18px;
          color: #ff7d30;
          font-weight: bold;
          border-left: 2px solid transparent;
          &::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #ff7d30;
            border-radius: 10px;
            position: absolute;
            left: -5px;
            bottom: -4px;
          }
          &::after {
            content: '';
            width: 16px;
            height: 16px;
            background: #ff7d30;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            position: absolute;
            left: -9px;
            bottom: -8px;
            opacity: 0.3;
          }
        }
        .des-p {
        }
      }
    }
    /*最后一个元素特殊处理*/
    li:last-child .li:first-child {
      .time-l {
      }
      .des-r {
        .des-header {
        }
        .des-p {
          border-left: 2px solid transparent;
        }
      }
    }
  }
}
</style>