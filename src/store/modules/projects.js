import { dataState } from '@/utils';
import { ProjectsService } from '@/api';
import { Notification } from 'element-ui';

const projectsService = new ProjectsService;

const state = {
	projects: [],
	dataState: dataState.LOADING,
};
const getters = {};
const actions = {
	async fetchProjects({ commit }) {
		commit('SET_PROJECTS', { key: 'dataState', value: dataState.LOADING })
		try {
			const { data, success } = await projectsService.getProjects();
			if(success) {
				commit('SET_PROJECTS', { key: 'projects', value: data });
				commit('SET_PROJECTS', { key: 'dataState', value: dataState.SUCCESS })
			} else {
				commit('SET_PROJECTS', { key: 'dataState', value: dataState.ERROR })
				throw new Exception('Error fetching projects')
			}
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error fetching projects',
				type: 'error'
			});
		}
	},
	async returnProject({ commit }, formData) {
		try {
			const { success } = await projectsService.returnProject(formData);
			if(success) {
				window.location.reload();
			} else {
				throw new Exception('Error fetching projects')
			}
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error returning project',
				type: 'error'
			});
		}
	}
};
const mutations = {
	SET_PROJECTS(state, { key, value }) {
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