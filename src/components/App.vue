<template>
  <div id="wrapper">
    <header-component></header-component>
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
import store from '../store'

import Header from './Header.vue';

export default {
  name: 'App',
  components: {
    'header-component': Header
  },
  data() {
    return {
      store,
      header: {}
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"
* { box-sizing: border-box }

html, body
  margin: 0
  font-family Verdana
  font-size 13px
  height 100%

ul
  list-style-type none
  padding 0
  margin 0

a
  color #000
  cursor pointer
  text-decoration none
  

</style>
