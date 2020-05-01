import Vue from 'vue'
import Vuex from 'vuex'
import { builder, auth, users, companies, tasks, projects } from './modules';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    builder,
    auth,
    users,
    companies,
    tasks,
    projects
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
