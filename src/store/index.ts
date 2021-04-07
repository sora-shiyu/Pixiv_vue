import { createStore } from 'vuex'

export default createStore({
  state: {
    screenWidth: 0,
    rollingY: {

    },

  },
  
  mutations: {
    setRollingY(state, n) {
      state.rollingY[n.path] = n.value
    },
    setScreenWidth(state, n) {
      state.screenWidth = n
    },
  },
  actions: {
  },
  modules: {
  }
})
