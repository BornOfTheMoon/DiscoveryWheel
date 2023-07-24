import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    thresholds: {
      sm: 641,
      md: 769,
      lg: 1025,
      xl: 1281,
      '2xl': 1537
    }
  },
  icons: {
    iconfont: 'fa'
  }
})
