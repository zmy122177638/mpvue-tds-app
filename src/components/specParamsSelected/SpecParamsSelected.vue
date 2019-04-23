<template>
  <section class="spec-box">
    <section class="product-box">
      <div class="left">
        <img :src="currentImgUrl" />
      </div>
      <div class="right">
        <div class="b">
          <span class="n"><span>￥</span>{{currentPrice}}</span>
          <span class="o"><span>￥</span>{{markPrice}}</span>
        </div>
        <div class="t">
          <div class="t-left">已选:</div>
          <div class="t-right">{{userSelectedStr}}</div>
        </div>
      </div>
    </section>
    <section class="spec-list-box">
      <div
        class="list-type-box"
        v-for="(item,i) in spec"
        :key="i"
      >
        <header class="title">{{item.spec_name}}</header>
        <block
          v-for="(val,index) in item.spec_attr"
          :key="index"
        >
          <div
            v-if="val === userSelected[i]"
            class="list-item active"
          >
            {{val}}
          </div>
          <div
            v-else
            class="list-item"
            :key="index"
            @click="handleSelected(i,index,val)"
          >
            {{val}}
          </div>
        </block>
      </div>
    </section>
    <section class="num-box">
      <span class="num-left">购买数量</span>
      <span class="num-right">
        <span
          v-if="selectedNum > 1"
          class="minus"
          @click="handleMinusNum"
        >-</span>
        <span
          v-else
          class="minus disable"
        >-</span>
        <span class="number">{{selectedNum}}</span>
        <span
          v-if="selectedNum <= limit_num"
          class="add"
          @click="handleAddNum"
        >+</span>
        <span
          v-else
          class="add disable"
        >+</span>
      </span>
    </section>
    <section class="btn-box">
      <button
        type="warn"
        @click="handleSubmitOrder"
      >提交订单</button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'SpecParamsSelected',
  props: {
    produ: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 规格数组
      spec: [
        {
          spec_name: '款式',
          spec_attr: [
            '儿童床【床单款三件套】- 适用120×150被子',
            '自动款',
            '手动款'
          ],
          params_child_has_del: true
        },
        {
          spec_name: '颜色',
          spec_attr: [
            '白色',
            '黄色'
          ],
          params_child_has_del: true
        }
      ],
      // 拼接数据修改参考
      spu: [
        {
          spec_attr_arr: [],
          spec_attr: '自动款-白色',
          stock: 50,
          price: 0.08,
          goods_no: '0001',
          item_image: 'http://oss.baidichan.com/store/images/20190325/AMoQAqePdD8oD1AkY1yM5LlVv7q4ZSRT06DrsJu7.jpeg'
        },
        {
          spec_attr_arr: [],
          spec_attr: '自动款-黄色',
          stock: 20,
          price: 0.02,
          goods_no: '0002',
          item_image: 'http://oss.baidichan.com/store/images/20190325/9hvuYDv2qX2Dj1VRmjDGsVBZjMBesEAiLfnF2hiG.jpeg'
        },
        {
          spec_attr_arr: [],
          spec_attr: '手动款-白色',
          stock: 10,
          price: 0.01,
          goods_no: '0003',
          item_image: 'http://oss.baidichan.com/store/images/20190325/PN8ZHudQRhzt3brpeGrfaF6H3vLb6YIDZzPzyMMW.jpeg'
        },
        {
          spec_attr_arr: [],
          spec_attr: '手动款-黄色',
          stock: 20,
          price: 0.04,
          goods_no: '0004',
          item_image: 'http://oss.baidichan.com/store/images/20190325/A3nJkwHe44mQ8XL2VTxV3i9DlpVr41S0NhOuTBO8.jpeg'
        }
      ],

      // 客户端用户选择的数组 ---每个一维数组内选择的作为一个元素,有多少个规格组就有多少个值，默认每个规格组的第一个
      userSelected: [],
      // 由用户选择拼接出来的规则字符串
      userSelectedStr: '',
      // 当前图片
      currentImgUrl: '',
      // 原价
      markPrice: '23.54',
      // 当前价格
      currentPrice: '',
      // 限制购买数量
      limit_num: 2,
      // 购买数量
      selectedNum: 1
    }
  },
  methods: {
    // 设置默认的用户选择，默认为每组规格组的第一个
    setDefaultSelected() {
      this.currentImgUrl = this.spu[0].item_image
      this.currentPrice = this.spu[0].price
      this.spec.map(function (value, index, array) {
        this.userSelected.push(value.spec_attr[0])
      }.bind(this))
      this.concatStr()
    },
    // 根据用户选择拼接成字符串
    concatStr() {
      this.userSelectedStr = this.userSelected[0]
      if (this.userSelected.length == 1) {
        // 只有一个元素时，无需拼接
        return false
      } else {
        this.userSelected.map(function (value, index) {
          if (index != 0) {
            this.userSelectedStr = this.userSelectedStr + '-' + value
          }
        }.bind(this))
      }
      // console.log('拼接好的字符串')
      // console.log(this.userSelectedStr)
    },
    // 根据用户选择，匹配不同SPU的信息
    findInfoFromSpu() {
      this.spu.map(function (value, index, array) {
        if (value.spec_attr === this.userSelectedStr) {
          this.currentImgUrl = value.item_image
          this.currentPrice = value.price
        }
      }.bind(this))
    },
    // params : i：父级数组下标，j:二级数组下标，val：二级数组下标对应的值
    handleSelected(i, j, val) {
      // console.log('用户选择：')
      // console.log(i+','+j+','+val)
      this.userSelected.splice(i, 1, val)
      // console.log(this.userSelected)
      this.concatStr()
      this.findInfoFromSpu()
    },
    // 数量-1
    handleMinusNum() {
      this.selectedNum -= 1
    },
    // 数量 +1
    handleAddNum() {
      this.selectedNum += 1
    },
    // 提交订单
    handleSubmitOrder() {
      console.log('aaa')
      let xuanze = this.userSelectedStr
      let num = this.selectedNum
      let obj = {
        xuanze,
        num
      }
      this.$emit('submit-order', obj)
    }
  },
  watch: {
    produ: function (nVal, oVal) {
      //  改变现有数据
    }
  },
  created() {
    this.setDefaultSelected()
  }
}
</script>

<style scoped lang="scss">
@import '../../common/scss/index.scss';
.spec-box {
  @include common-width;
  min-height: 200rpx;
  padding: 30rpx 0rpx;
  .product-box {
    display: -webkit-flex;
    display: flex;
    min-height: 180rpx;
    margin-bottom: 30rpx;
    .left {
      -webkit-flex: 1;
      flex: 1;
      img {
        width: 180rpx;
        height: 180rpx;
        -webkit-border-radius: 15rpx;
        -moz-border-radius: 15rpx;
        border-radius: 15rpx;
      }
    }
    .right {
      -webkit-flex: 2;
      flex: 2;
      /*background: #e64340;*/
      .t {
        padding-top: 20rpx;
        font-size: 28rpx;
        line-height: 40rpx;
        display: -webkit-flex;
        display: flex;
        .t-left {
          width: 80rpx;
        }
        .t-right {
          -webkit-flex: 1;
          flex: 1;
        }
      }
      .b {
        /*font-size: .9rem;*/
        color: #a5a5a5;
        padding-top: 15rpx;
        .n {
          font-weight: bold;
          font-size: 40rpx;
          color: rgba(255, 10, 10, 1);
          margin-right: 20rpx;
          span {
            font-size: 28rpx;
          }
        }
        .o {
          font-weight: bold;
          text-decoration: line-through;
          font-weight: bold;
          color: rgba(177, 177, 177, 1);
          span {
            font-size: 24rpx;
          }
        }
      }
    }
  }

  .spec-list-box {
    min-height: 300rpx;
    max-height: 700rpx;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    &::-webkit-scrollbar {
      /*隐藏滚轮*/
      display: none;
    }
    .list-type-box {
      width: 100%;
      margin-bottom: 30rpx;
      .title {
        font-size: 34rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
      }
      .list-item {
        display: inline-block;
        background: rgba(246, 248, 250, 1);
        color: rgba(101, 101, 101, 1);
        -webkit-border-radius: 12rpx;
        -moz-border-radius: 12rpx;
        border-radius: 12rpx;
        padding: 8rpx 25rpx;
        margin: 0rpx 30rpx 20rpx 0rpx;
        &.active {
          background: rgba(255, 239, 239, 1);
          color: #ff6666;
        }
      }
    }
  }

  .num-box {
    height: 80rpx;
    margin-bottom: 40rpx;
    /*border: 1px solid red;*/
    .num-left {
      font-size: 34rpx;
      font-weight: bold;
      line-height: 80rpx;
    }
    .num-right {
      float: right;
      .minus {
        display: inline-block;
        height: 60rpx;
        line-height: 60rpx;
        margin: 10rpx 10rpx 0 0;
        padding: 0rpx 20rpx;
        font-size: 40rpx;
        font-weight: bold;
        -webkit-border-radius: 10rpx;
        -moz-border-radius: 10rpx;
        border-radius: 10rpx;
        background: rgba(246, 248, 250, 1);
        color: rgba(101, 101, 101, 1);
        &.disable {
          color: rgba(223, 223, 223, 1);
        }
      }
      .number {
        display: inline-block;
        vertical-align: bottom;
        padding: 6rpx 35rpx;
        background: rgba(246, 248, 250, 1);
        font-weight: bold;
        font-size: 32rpx;
        -webkit-border-radius: 10rpx;
        -moz-border-radius: 10rpx;
        border-radius: 10rpx;
        margin-right: 10rpx;
      }
      .add {
        display: inline-block;
        height: 60rpx;
        line-height: 60rpx;
        margin: 10rpx 0 0 0;
        padding: 0rpx 20rpx;
        font-size: 40rpx;
        font-weight: bold;
        -webkit-border-radius: 10rpx;
        -moz-border-radius: 10rpx;
        border-radius: 10rpx;
        background: rgba(246, 248, 250, 1);
        color: rgba(101, 101, 101, 1);
        &.disable {
          color: rgba(223, 223, 223, 1);
        }
      }
    }
  }

  .btn-box {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 20%;
    margin-bottom: 20rpx;
  }
}
</style>
