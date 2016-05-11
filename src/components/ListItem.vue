<template>
  <li class="list-item">
    <div class="item-segment item-image">
      <div class="inner-item-segment">
        <img class="item-img" src="{{item.thumbnail}}" alt="">
      </div>
    </div>
    <div class="item-segment item-name">
      <div class="inner-item-segment">
        <a :href="`#/item/${item.id}`">{{item.title}}</a>
      </div>
    </div>
    <div class="item-segment item-price">
      <div class="inner-item-segment">
        ${{item.price}}
      </div>
    </div>
    <div class="item-segment item-additional-info">
      <div class="inner-item-segment">
        <span>{{item.seller_address.state.name}}</span>
      </div>
    </div>
  </li>
</template>

<script>
import store from '../store'
import Item from './Item.vue'
import Sidebar from './Sidebar.vue'

export default {

  name: 'ListItem',

  props: {
    item: Object
  }
}
</script>

<style lang="stylus">
.home-view
  margin-top: 54px;
  margin-left: 20%;

.list-item {
  list-style: none;
  height: 90px;
  display:flex;
  border-bottom: 1px solid #cdcdcd;
}

.list-item:hover {
  
}

.item-segment {
  height:100%;
  display: inline-block;
  text-align: center;
}

.item-image {
  width: 15%;
}

.item-name {
  width: 50%;
}

.item-price {
  width: 15%;
}

.item-additional-info {
  width: 20%;
}

.inner-item-segment {
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  flex-direction: column;
}

.item-img {
  height: 100%;
}
</style>
