<template>
  <sidebar></sidebar>
  <div class="home-view" v-show="!loading">
    <!-- item list -->
    <list-item
      v-for="item in items"
      :item="item"
      track-by="id">
    </liste-item>
    <!-- navigation -->
    <div class="nav" v-show="items.length > 0">
      <a v-if="page > 1" :href="`#/news/${(page - 1)}`">&lt; prev</a>
      <a v-if="page < 4" :href="`#/news/${(page + 1)}`">more...</a>
    </div>
  </div>
  <img class="loading-img" src="../../static/loading.gif" v-show="loading">
</template>

<script>
import store from '../store'
import Item from './Item.vue'
import Sidebar from './Sidebar.vue'
import ListItem from './ListItem.vue'

export default {

  name: 'HomeView',

  components: {
    'list-item': ListItem,
    Sidebar
  },

  data () {
    return {
      page: 1,
      items: [],
      loading: false
    }
  },

  created () {
    store.on('userSearch', this.update);
    store.on('filterResults', this.filter);
  },

  destroyed () {
    store.removeListener('userSearch', this.update);
    store.removeListener('filterResults', this.filter);
  },

  methods: {
    update (searchStr) {
      this.loading = true;
      store.fetchItems({
        data: searchStr
      }).then((response) => {
        this.loading = false;
        this.items = response.results;
      }).catch((err)=> {
        this.loading = false;
        console.log(err);
      });
    },
    filter (opts) {
      this.items = this.items.filter((e) => e.price > opts.min && e.price < opts.max);
    }
  },

}
</script>

<style lang="stylus">
.home-view
  margin-top: 54px;
  margin-left: 20%;

.loading-img 
  display: block;
  margin: 54px auto;
</style>
