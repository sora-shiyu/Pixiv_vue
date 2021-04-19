import { createStore } from 'vuex'

export default createStore({
  state: {
    screenWidth: 0,
    rollingY: {},
    searchText: '',
    searchMode: undefined,
    SettingStatus: false,
    proxyUrl: '',
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
    ],
  },

  mutations: {
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
      return url.replace('i.pximg.net', state.proxyUrl)
    },
  },
})
