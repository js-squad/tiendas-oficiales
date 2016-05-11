import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import HomeView from './components/HomeView.vue'
import ItemView from './components/ItemView.vue'

// install router
Vue.use(Router)

// routing
let router = new Router()

router.map({
  '/': {
    component: HomeView
  },
  '/item/:id': {
    component: ItemView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
