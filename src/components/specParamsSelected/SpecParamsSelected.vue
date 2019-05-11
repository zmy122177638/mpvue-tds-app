<template>
  <section class="spec-box">
    <section class="product-box">
      <div class="left">
        <img v-if="currentSpu.item_image" :src="currentSpu.item_image" />
        <img v-else src="../../../static/images/CommodityNull.png" />
      </div>
      <div class="right">
        <div class="b">
          <span class="n"><span>￥</span>{{currentSpu.price}}</span>
          <span class="o"><span>￥</span>{{productData.market_price}}</span>
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
        v-for="(item,i) in productData.spec"
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
          v-if="productData.limit_num == 0 || (productData.limit_num != 0 && selectedNum < productData.limit_num)"
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
        class="submit-btn"
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
    pData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 商品信息
      productData: this.pData,
      // 客户端用户选择的数组 ---每个一维数组内选择的作为一个元素,有多少个规格组就有多少个值，默认每个规格组的第一个
      userSelected: [],
      // 由用户选择拼接拼接出来的规则字符串
      userSelectedStr: '',
      // 购买数量,默认为1
      selectedNum: 1,
      // 当前用户选择的spu
      currentSpu: {}
    }
  },
  methods: {
    // 设置默认的用户选择，默认为每组规格组的第一个
    setDefaultSelected() {
      this.userSelected = [];
      this.userSelectedStr = '';
      this.selectedNum = 1;
      this.currentSpu = {};
      if (this.productData.goods_id) {
        // 以第一个spu作为默认
        this.currentSpu = this.productData.spu[0];
        this.productData.spec.map(function (value, index, array) {
          // 以spec中的所有选项中的第一个作为默认选项
          this.userSelected.push(value.spec_attr[0])
        }.bind(this))
        this.concatStr();
        this.findInfoFromSpu();
      }
    },
    // 根据用户选择拼接成字符串
    concatStr() {
      this.userSelectedStr = this.userSelected[0]
      if (this.userSelected.length === 1) {
        // 只有一个元素时，无需拼接
        return false
      } else {
        this.userSelected.map(function (value, index) {
          if (index !== 0) {
            this.userSelectedStr = this.userSelectedStr + '-' + value
          }
        }.bind(this))
      }
      // console.log('拼接好的字符串')
      // console.log(this.userSelectedStr)
    },
    // 根据用户选择，匹配不同SPU的信息
    findInfoFromSpu() {
      this.productData.spu.map(function (value, index, array) {
        if (value.spec_attr === this.userSelectedStr) {
          this.currentSpu = value;
        }
      }.bind(this))
      // console.log('当前spu:');
      // console.log(this.currentSpu);
    },
    // 用户选择不同spec选项时响应， params : i：父级数组下标，j:二级数组下标，val：二级数组下标对应的值
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
    // 拼接商品订单提交
    setgoodData () {
      // 拼接商品订单信息
      let goodData = {};
      // 用户选择的spu
      goodData.spu = this.currentSpu;
      // 商品id
      goodData.goods_id = this.productData.goods_id;
      // 商品名称
      goodData.goods_name = this.productData.goods_name;
      // 缩略图
      goodData.goods_image_url = goodData.spu.item_image;
      // 规格拼接字符串
      goodData.spec_attr = goodData.spu.spec_attr;
      // 单位
      goodData.unit = this.productData.unit;
      // 购买个数
      goodData.num = this.selectedNum;
      // 总金额
      goodData.amount = goodData.spu.price * goodData.num
      // 要邮费的地区
      // goodData.charge_zone = this.productData.charge_zone;
      // // 不邮寄的地区
      // goodData.unshipping_zone = this.productData.unshipping_zone;
      // // 商品重量
      // goodData.weight = this.productData.weight;

      return goodData;
    },
    // 提交订单
    handleSubmitOrder () {
      let obj = this.setgoodData();
      this.$emit('submit-order', obj)
    }
  },
  watch: {
    pData: function (nVal, oVal) {
      // console.log('改变')
      //  改变现有数据
      this.productData = nVal;
      // 值改变时设置默认值：
      this.setDefaultSelected()
    }
  },
  mounted() {
    // console.log('选择---------====mounted')
    // 值改变时设置默认值：
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
    .submit-btn{
      background: #ff6666;
      color: #fff;
    }
  }
}
</style>
