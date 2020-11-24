import Vue from 'vue'
import App from './App.vue'
import Cell from './components/Cell'
import Grid from './components/Grid'

window.Event = new Vue()

Vue.component('Cell', Cell)
Vue.component('Grid', Grid)
new Vue({
  el: '#app',
  render: h => h(App)
})
