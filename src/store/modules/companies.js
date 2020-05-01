import { dataState } from '@/utils';
import { CompaniesService } from '@/api';
import { Notification } from 'element-ui';

const companiesService = new CompaniesService;

const state = {
	companies: [],
	dataState: dataState.LOADING,
	newCompany: {},
};
const getters = {};
const actions = {
	async fetchCompanies({ commit }) {
		commit('SET_COMPANIES', { key: 'dataState', value: dataState.LOADING })
		try {
			const { data, success } = await companiesService.getCompanies();
			if(success) {
				commit('SET_COMPANIES', { key: 'companies', value: data });
				commit('SET_COMPANIES', { key: 'dataState', value: dataState.SUCCESS })
			} else {
				commit('SET_COMPANIES', { key: 'dataState', value: dataState.ERROR })
				// throw new Exception('Error fetching companies')
			}
		} catch(e) {
			console.log(e);
			// Notification({
			// 	title: 'Error',
			// 	message: 'Error fetching companies',
			// 	type: 'error'
			// });
		}
	},
	async addUserToCompany({ commit }, { companyId, userId }) {
		try {
			const { data, success } = await companiesService.addUserToCompany({ companyId, userId });
			if(success) window.location.reload();
			else throw new Exception('Error adding user to company');
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error adding user to company',
				type: 'error'
			});
		}
	},
	async createCompany({ commit, state }, form) {
		try {
			const { data, success } = await companiesService.createCompany({ ...form });
			if(success) { 
				commit('SET_COMPANIES', { key: 'companies', value: [...state.companies, data] }) 
			}
			else { 
				throw new Exception('Error fetching companies')
			}
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error creating company',
				type: 'error'
			});
		}
	},
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