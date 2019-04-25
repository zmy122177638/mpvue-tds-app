// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 用户唯一ssid
    ssid: '',
    // 用户信息
    userInfo: {},
    // 明日预告图片信息
    tomorrowImg: {}
  },
  mutations: {
    // 写入登录 ssid ,作为用户是否已登录的唯一凭证
    setSsid (state, data) {
      // console.log('写入ssid:');
      // console.log(data.ssid);
      state.ssid = data.ssid;
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
