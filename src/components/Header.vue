<template>
  <header>
    <input id="searchInput" type="search" placeholder="Buscar..." v-on:keyup.enter="fireSearch" v-model="searchInput">
    <button id="searchBtn" v-on:click="fireSearch">Buscar</button>
  </header>
</template>

<script>
import store from '../store'

export default {

  name: 'Header',

  data () {
    return {
      searchInput: ''
    }
  },
  methods: {
    fireSearch () {
      store.emit('userSearch', this.searchInput);
      this.$route.router.go('/');
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

header {
  width: 100%;
  height: 54px;
  background-color:#FFF059;
  border-bottom:1px solid #D9D9D9;
  display: flex;
  justify-content: center;
  align-items: center;
  position:fixed;
  top: 0;
  z-index: 9999;
}

#searchInput {
  height: 40px;
  width: 400px;
  font-size: 16px;
}

#searchBtn {
  height:40px;
}

</style>
