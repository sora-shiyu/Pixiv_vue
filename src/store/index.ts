import { createStore } from 'vuex'

export default createStore({
  state: {
    screenWidth: 0,
    rollingY: {},
    searchText:"",
    searchMode:undefined

  },
  
  mutations: {
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
  actions: {
  },
  modules: {
  }
})
