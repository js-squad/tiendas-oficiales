<template>
  <aside class="aside">
      <h4>Rango de precios</h4>
      <div>
          <input v-model="priceFilter.min" type="number" id="priceFilterMin" class="price-input-filter" type="text" placeholder="min">
          <input v-model="priceFilter.max" type="number" id="priceFilterMax" class="price-input-filter" type="text" placeholder="max">
          <button id="priceFilterBtn" v-on:click="filterResults">>></button>
      </div>
  </aside>
</template>

<script>
import store from '../store'

export default {

  name: 'Sidebar',

  data () {
    return {
      priceFilter: {
        min: null,
        max: null
      }
    }
  },

  methods: {
    filterResults() {
      store.emit('filterResults', this.priceFilter);
    }
  }

}
</script>

<style lang="stylus">
@import "../variables.styl"

.aside {
  border: 1px solid #D9D9D9;
  position:fixed;
  left: 0;
  top:54px;
  display: flex;
  justify-content: center;
  align-items: center;
  width:20%;
  flex-direction: column;
  padding: 15px;
}

.price-input-filter {
  width: 40px;
}
</style>
