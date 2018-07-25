import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.filter('formatTime', function(value) {
  return (value < 1000 ? "0" + value/100 + ":00" : value/100 + ":00");
});

Vue.use(VueAnalytics, {
  id: 'UA-122843777-1',
  router
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
