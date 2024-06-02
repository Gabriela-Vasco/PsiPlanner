import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import TextareaAutosize from 'vue-textarea-autosize'

Vue.config.productionTip = false
Vue.use(TextareaAutosize)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
