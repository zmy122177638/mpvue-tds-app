// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 用户验证token
    token: '',
    // 用户信息
    userInfo: {},
    // 分享人信息，如果没有上级分享人(即不是别人分享入口进入的，则分享人信息为当前用户信息)
    sharerInfo: {}
  },
  mutations: {
    // 写入用户登录信息
    writeUserInfo(state, data) {
      // console.log('写入用户信息:');
      // console.log(data.userInfo);
      state.userInfo = data.userInfo;
      // console.log(state.userInfo);
    },
    // 写入token 登录凭证
    writeToken(state, data) {
      state.token = data.token;
    },
    // 写入分享人信息
    writeSharerInfo(state, data) {
      state.sharerInfo = data.sharerInfo;
    }
  },
  getters: {
    // 判断用户是否为VIP会员，如果是返回会员等级，如果不是，返回false
    isVip(state) {
      return state.userInfo.vip_level === 0 ? false : state.userInfo.vip_level;
    }
  },
  actions: {},
  // 设置store本地存储,这里使用的是微信同步本地读写方式
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => mpvue.getStorageSync(key),
        setItem: (key, value) => mpvue.setStorageSync(key, value),
        removeItem: key => {}
      }
    })
  ]
})

export default store
