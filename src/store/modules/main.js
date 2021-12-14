const state = {
  user:{},
  number: 0
  // user_info: {}
}

const mutations = {
  SET_USER (state, user) {
    let _user = {}

    // 操作状态机
    _user = user
    state.user = {
      ...state.user,
      ..._user
    }
  }
}

const actions = {
  updateUser ({commit}, user) {
    commit('SET_USER', user)
  }
}

const getters = {
  getLoginTime (state) {
    console.log(state.number)
    state.number = state.number + 1;
    return state.number
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
