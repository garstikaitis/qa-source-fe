import Vue from 'vue'
import Vuex from 'vuex'
import { builder, auth } from './modules';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    builder,
    auth
  },
  plugins: [
    createPersistedState({
      paths: [
        "auth.user",
        "auth.token"
      ]
    })
  ]
})
