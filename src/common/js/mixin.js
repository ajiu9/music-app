import {mapGetters} from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handleplaylist(this.playList)
  },
  activated () {
    this.handleplaylist(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handleplaylist(newVal)
    }
  },
  methods: {
    handleplaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}