
const state = {
    page: 1
  }
   
const mutations = {
    SET_QUERY_PARAMS: (state, page ) => {
        state.page = page
    }
}

const actions = {
    setQueryParams({ commit }, page) {
        commit('SET_QUERY_PARAMS', page)
    }
}

export default {
namespaced: true,
state,
mutations,
actions
}