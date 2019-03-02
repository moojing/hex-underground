import Vue from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/scss/common.scss'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
