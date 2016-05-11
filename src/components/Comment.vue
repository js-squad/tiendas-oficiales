<template>
  <li v-show="comment.text" class="item-comment">
    <p class="comment-content" v-show="open">
      {{{comment.text}}}
    </p>
    <ul class="child-comments" v-if="comment.kids" v-show="open">
      <comment v-for="comment in childComments" :comment="comment"></comment>
    </ul>
  </li>
</template>

<script>
import store from '../store';

export default {
  name: 'Comment',

  props: {
    comment: Object
  },

  data () {
    return {
      childComments: []
    }
  },

  created () {
    if (this.comment.kids) {
      store.fetchItems(this.comment.kids)
        .then(comments => this.childComments = comments)
    }
  }
};
</script>

<style lang="stylus">
@import "../variables.styl"

.comment-content
  margin 0 0 16px 24px
  word-wrap break-word
  code
    white-space pre-wrap

.child-comments
  margin 8px 0 8px 22px

.item-comment
  border: 1px dotted #CCC;
</style>
