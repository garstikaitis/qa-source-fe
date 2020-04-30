const state = {
	step: 0,
	name: '',
	images: [],
	description: '',
	condition: null,
	price: null
};
const getters = {};
const actions = {};
const mutations = {
	SET_BUILDER(state, { key, value }) {
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