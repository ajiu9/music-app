<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" :key="item.id">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {search} from 'api/search'
import {ERR_OK} from 'api/config'

const TYPE_SINGER = 'singer'

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: []
    }
  },
  methods: {
    search() {
      search(this.query, this.page, this.showSinger).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
        }
      })
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.songname}-`
      }
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(data.song.list)
      }
      console.log(ret)
      return ret
    }
  },
  watch: {
    query() {
      this.search()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-l
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-l
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>