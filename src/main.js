import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

//初始化云开发
wx.cloud.init({
    // env: 'wx9da7b7d41029b825',
    traceUser: true,
  })

const app = new Vue(App)
app.$mount()
