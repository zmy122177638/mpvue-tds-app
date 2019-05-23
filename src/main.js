import Vue from 'vue'
import App from './App'
import store from './store/store'
import '../static/wxui/wxui.css'
import http from './common/js/https'
// 引入vant-weapp
// const vantWeapp = require('vant-weapp');
// 使用vuex
Vue.prototype.$store = store
// 使用请求接口
Vue.prototype.$http = http;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
