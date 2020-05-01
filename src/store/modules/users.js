import { dataState } from '@/utils';
import { UsersService } from '@/api';
import { Notification } from 'element-ui';

const usersService = new UsersService;

const state = {
	users: [],
	dataState: dataState.LOADING,
};
const getters = {
	usersExcludingAdmins: state => state.users ? state.users.filter(user => !user.companies.length) : [],
};
const actions = {
	async fetchUsers({ commit }) {
		commit('SET_COMPANIES', { key: 'dataState', value: dataState.LOADING })
		try {
			const { data, success } = await usersService.getUsers();
			if(success) {
				commit('SET_COMPANIES', { key: 'users', value: data });
				commit('SET_COMPANIES', { key: 'dataState', value: dataState.SUCCESS })
			} else {
				commit('SET_COMPANIES', { key: 'dataState', value: dataState.ERROR })
				throw new Exception('Error fetching companies')
			}
		} catch (e) {
			Notification({
				title: 'Error',
				message: 'Error fetching users',
				type: 'error'
			});
		}
	}
};
const mutations = {
	SET_COMPANIES(state, { key, value }) {
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