const state = {
	user: null,
	token: null,
};
const getters = {};
const actions = {};
const mutations = {
	SET_USER(state, { key, value }) {
		state[key] = value;
	}
};


export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};