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
    // 明日预告图片信息
    tomorrowImg: {},
    // 小程序进入场景值,默认为1001 ；主要用来判断用户是否从被人分享中进入小程序
    scene: 1001
  },
  mutations: {
    // 写入用户登录信息
    writeUserInfo (state, data) {
      // console.log('写入用户信息:');
      // console.log(data.userInfo);
      state.userInfo = data.userInfo;
      // console.log(state.userInfo);
    },
    // 写入token 登录凭证
    writeToken (state, data) {
      state.token = data.token;
    }
  },
  getters: {},
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
