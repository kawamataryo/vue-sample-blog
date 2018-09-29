import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/moment'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import router from "./router"


Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  router,
  render: h => h(App)
}).$mount('#app')
