<template>
  <div class="item-view" v-show="item.id">
    <h2>{{item.title}}</h2>
    <item :item="item"></item>
    <p class="itemtext" v-if="hasText" v-html="item.text"></p>

    <h2>Preguntas al vendedor</h2>
    <input class="question-input"></input><button>Preguntar</button>
    <ul class="comments" v-if="comments">
      <comment
        v-for="comment in comments"
        :comment="comment">
      </comment>
    </ul>
    <p v-show="!comments.length && !isJob">No comments yet.</p>
  </div>
  <img class="loading-img" src="../../static/loading.gif" v-show="!item.id">
</template>

<script>
import store from '../store'
import Item from './Item.vue'
import Comment from './Comment.vue'

export default {

  name: 'ItemView',

  components: {
    Item,
    Comment
  },

  data () {
    return {
      item: {},
      comments: [],
      pollOptions: null
    }
  },

  route: {
    data ({ to }) {
      return Promise.all([
          store.fetchItem(to.params.id),
          store.fetchDescription(to.params.id)
        ]).then(([item, description]) => {
        item.displayImg = item.pictures[0].url;
        item.description = description;
        return {
          item
        }
      })
    },
    deactivate () {
      this.item = {};
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.item-view
  text-align: center;
  margin-top: 54px;
  .item
    padding-left 0
    margin-bottom 30px
    .index
      display none
  .poll-options
    margin-left 30px
    margin-bottom 40px
    li
      margin 12px 0
    p
      margin 8px 0
    .subtext
      color $gray
      font-size 11px
  .itemtext
    color $gray
    margin-top 0
    margin-bottom 30px
  .itemtext p
    margin 10px 0

.comments
  margin: 0 auto;
  width: 60%;
  border: 1px dotted #CCC;

.question-input
  width: 40%;
</style>
