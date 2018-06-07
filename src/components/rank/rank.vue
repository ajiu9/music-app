<template>
<div class="rank" ref="rank">
  <scroll class="toplist" :data="topList" ref="toplist">
    <ul class="ulwrapper">
      <li class="item" v-for="item in topList" :key="item.id" @click="selectItem(item)">
        <div class="icon">
          <img v-lazy="item.picUrl" width="100" height="100">
        </div>
        <ul class="songlist">
          <li class="song" v-for="(song, index) in item.songList" :key="song.id">
            <span>{{index + 1}}</span>
            <span>{{song.songname}}--{{song.singername}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="loading-container" v-show="!topList.length">
      <loading></loading>
    </div>
  </scroll>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    handleplaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: '/rank/item.id'
      })
      this.setTopList(item)
    },
    _getTopList() {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.rank
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .toplist
    height: 100%
    overflow: hidden
    background: #f4f4f4
    .ulwrapper
      padding-bottom: 10px
    .item
      display: flex
      margin: 10px
      height: 100px
      background: $color-background
      .icon
        flex: 0 0 100px
        width: 100px
        height: 100px
      .songlist
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 20px
        height: 100px
        overflow: hidden
        color: $color-text
        font-size: $font-size-small
        .song
          no-wrap()
          line-height: 26px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>