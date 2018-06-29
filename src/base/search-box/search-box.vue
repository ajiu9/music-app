<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" class="box" v-model="query" :placeholder="placeholder">
    <i @click="clear" class="icon-dismiss" v-show="query"></i>
  </div>
</template>

<script type="text/ecmascript-6">
import {debounce} from 'common/js/util'
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲，歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.$watch('query', debounce((newquery) => {
      this.$emit('query', newquery)
    }, 200))
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    },
    blur() {
      this.$refs.query.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-background
    .icon-search
      font-size: 24px
      color: $color-text-d
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-text-d
</style>