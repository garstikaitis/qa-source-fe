import { dataState } from '@/utils';
import { TasksService } from '@/api';
import { Notification } from 'element-ui';

const tasksService = new TasksService;

const state = {
	tasks: [],
	dataState: dataState.LOADING,
};
const getters = {};
const actions = {
	async fetchTasks({ commit }) {
		commit('SET_TASKS', { key: 'dataState', value: dataState.LOADING })
		try {
			const { data, success } = await tasksService.getTasks();
			if(success) {
				commit('SET_TASKS', { key: 'tasks', value: data });
				commit('SET_TASKS', { key: 'dataState', value: dataState.SUCCESS })
			} else {
				commit('SET_TASKS', { key: 'dataState', value: dataState.ERROR })
				throw new Exception('Error fetching tasks')
			}
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error fetching tasks',
				type: 'error'
			});
		}
	},
	async createTask({ commit }, form) {
		commit('SET_TASKS', { key: 'dataState', value: dataState.LOADING })
		try {
			const { data, success } = await tasksService.createTask(form);
			if(success) {
				commit('SET_TASKS', { key: 'tasks', value: [...data.tasks, data] });
				commit('SET_TASKS', { key: 'dataState', value: dataState.SUCCESS })
			} else {
				commit('SET_TASKS', { key: 'dataState', value: dataState.ERROR })
				throw new Exception('Error creating task')
			}
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error creating task',
				type: 'error'
			});
		}
	},
	async assignTaskToUser({ commit }, { userId, taskId }) {
		commit('SET_TASKS', { key: 'dataState', value: dataState.LOADING })
		try {
			const { success } = await tasksService.assignTaskToUser({ userId, taskId });
			if(success) {
				window.location.reload();
			} else {
				throw new Exception('Error creating task')
			}
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error creating task',
				type: 'error'
			});
		}
	}
};
const mutations = {
	SET_TASKS(state, { key, value }) {
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