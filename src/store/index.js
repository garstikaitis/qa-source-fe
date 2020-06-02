import Vue from 'vue'
import Vuex from 'vuex'
import { builder, auth, users, companies, tasks, projects, chat } from './modules';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    builder,
    chat,
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
        "chat.token"
      ]
    })
  ]
})
