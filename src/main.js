import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import './assets/styles/tailwind.css'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.prototype.$http = Axios

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token // поменять на authorization, текущее состояние для Express
}

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
