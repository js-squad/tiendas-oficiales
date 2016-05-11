<template>
  <div class="item-component" v-show="item.id">
    <div class="short-description" >
      <div class="left">
        <!-- left -->
        <ul class="item-small-img-list">
          <template v-for="picture in item.pictures">
            <li class="small-img">
              <img src="{{picture.url}}" alt="" width="40" height="40" class="item-small-img" v-on:click="changeDisplayImg(picture)">
            </li>
            
            <!-- {{ photo }} -->
          </template>
        </ul>
        <img src="{{item.displayImg}}" id="item-big-img" width="500" height="500">
      </div>
      <div class="right">
        <!-- right -->
        <h3> ${{ item.price }} </h3>
            {{ item.seller_address.state.name }}
        <button>Comprar</button>
      </div>
    </div>


    <h2>Descripcción de la publicación</h2>
    {{{ item.description.text }}}
  </div>

</template>

<script>
export default {

  name: 'Item',

  props: {
    item: Object,
    index: Number
  },

  methods: {
    changeDisplayImg (photo) {
      this.item.displayImg = photo.url;
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

/*.item
  padding 2px 0 2px 40px
  position relative
  transition background-color .2s ease
  p
    margin 2px 0
  .title:visited
      color $gray
  .index
    color $gray
    position absolute
    width 30px
    text-align right
    left 0
    top 4px
  .domain, .subtext
    font-size 11px
    color $gray
    a
      color $gray
  .subtext a:hover
    text-decoration underline*/

.item-small-img-list
  float:left;

#item-big-img
  clear:both;

.item-component
  width: 60%;
  margin: 0 auto;
  text-align:center;

.short-description

  display: flex;

  .right
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    *
      padding: 10px;

.small-img {
  border: 1px solid white;
}

.small-img:hover {
  border: 1px dotted black;
  cursor: pointer;
}
</style>
