import {commonParams} from './config'
import axios from 'axios'
import jsonp from 'common/js/jsonp'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongVKey(mid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    songmid: mid,
    uin: 0,
    filename: `C400${mid}.m4a`,
    guid: 1951187172,
    cid: 205361747,
    callback: '_callback'
  })
  return jsonp(url, data)
}

export function getOnlySongVKey(mid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    songmid: mid,
    uin: 0,
    filename: `C400${mid}.m4a`,
    guid: 1951187172,
    cid: 205361747,
    callback: '_callback'
  })
  return jsonp(url, data)
}