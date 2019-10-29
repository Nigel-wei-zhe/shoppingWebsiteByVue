// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'vue-loading-overlay/dist/vue-loading.css'
import Loading from 'vue-loading-overlay'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import tw from 'vee-validate/dist/locale/zh_TW'

import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'
import timestampToFormatTimeFilter from './filters/timestampToFormatTime'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: tw.messages[rule] // 把 message 加進去並中文化
  })
}
extend('telRegExp', {
  validate: value => {
    const reg = /^09\d{8}$/
    return reg.test(value)
  },
  message: '電話 格式錯誤'
}) // 自訂的手機號碼驗證
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('timestampToFormatTime', timestampToFormatTimeFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`
    // const vm = this
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
