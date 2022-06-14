import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)


const vue = new Vue({
  router,
  render: h => h(App)
})

vue.$mount('#app')
