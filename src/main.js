import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import TextareaAutosize from 'vue-textarea-autosize'
import money from 'vuejs-money'

Vue.config.productionTip = false
Vue.use(TextareaAutosize)
Vue.use(money)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
