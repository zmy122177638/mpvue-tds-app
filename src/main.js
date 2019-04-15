import Vue from 'vue'
import App from './App'
import store from './store/store'
import '../static/wxui/wxui.css'
// 使用vuex
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
