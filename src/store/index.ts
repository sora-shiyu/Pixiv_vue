import { createStore } from 'vuex'

export default createStore({
  state: {
    screenWidth: 0,
    rollingY: {},
    searchText: '',
    searchMode: undefined,
    SettingStatus: false,
    proxyUrl: '',
    cacheArtworksData: {},
    cacheUserIllustsData: {
      id:0,
      data:[]
    },
    proxyUrlData: [
      {
        value: 'i.pixiv.cat',
        label: 'pixiv.cat',
      },
      {
        value: 'pixiv.shiyua.workers.dev',
        label: 'shiyua.ltd',
      },
      {
        value: 'api.pixiv.moe/image/i.pximg.net',
        label: 'pixiv.moe',
      },
      {
        value: 'http://i.shiyua.ltd:2020/',
        label: 'i.shiyua.ltd',
      },
    ],
  },

  mutations: {
    setCacheUserIllustsData(state, n) {
      state.cacheUserIllustsData = n
    },
    setCacheArtworksData(state, n) {
      state.cacheArtworksData = n
    },
    setProxyUrl(state, n) {
      state.proxyUrl = n
    },
    setSettingStatus(state, n) {
      state.SettingStatus = n
    },
    setRollingY(state, n) {
      state.rollingY[n.path] = n.value
    },
    setScreenWidth(state, n) {
      state.screenWidth = n
    },
    setSearchText(state, n) {
      state.searchText = n
    },
    setSearchMode(state, n) {
      state.searchMode = n
    },
  },

  actions: {},
  modules: {},
  getters: {
    getProxyUrl: (state) => (url: String) => {
      if (state.proxyUrl.indexOf('http://') != -1) {
        return url.replace('https://i.pximg.net', state.proxyUrl)
      } else {
        return url.replace('i.pximg.net', state.proxyUrl)
      }
    },
    getWaterfallBoxWidth: (state) => {
      return (state.screenWidth - 20) / 2
    },
  },
})
