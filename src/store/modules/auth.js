import { Notification } from 'element-ui';
import { AuthService, UsersService } from '../../api';
import router from '@/router';

const authService = new AuthService;
const usersService = new UsersService;

const state = {
	user: window.localStorage.getItem('user') || null,
	token: null,
	userMeta: null,
};
const getters = {
	user: state => state.user ? { ...state.user, company: state.user.companies.length ? state.user.companies[0] : null } : null,
};
const actions = {
	async logout({ commit }) {
		try {
			const success = await authService.logout();
			if(success) {
				commit('SET_USER', { key: 'user', value: null });
				window.localStorage.removeItem('user');
				router.push({ name: 'Login' });
			} else {
				throw new Exception('Error logging out')
			}
		} catch(e) {
			return Notification({
				type: 'error',
				title: 'Error',
				message: 'Error logging out'
			})
		}
	},
	async fetchMe({ commit }) {
		try {
			const { data, success } = await usersService.getMe();
			if(success) commit('SET_USER', { key: 'userMeta', value: data });
			else throw new Exception('Error fetching user data');
		} catch(e) {
			console.log(e);
			Notification({
				type: 'error',
				title: 'Error',
				message: 'Error fetching user data'
			})
		}
	}
};
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