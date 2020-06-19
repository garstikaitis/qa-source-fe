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
	async createTask({ commit, state }, form) {
		commit('SET_TASKS', { key: 'dataState', value: dataState.LOADING })
		try {
			const { data, success } = await tasksService.createTask(form);
			if(success) {
				let tasks = state.tasks;
				tasks.push(data);
				commit('SET_TASKS', { key: 'tasks', value: tasks });
				commit('SET_TASKS', { key: 'dataState', value: dataState.SUCCESS })
			} else {
				commit('SET_TASKS', { key: 'dataState', value: dataState.ERROR })
				throw new Exception('Error creating task')
			}
		} catch(e) {
			console.log(e);
			Notification({
				title: 'Error',
				message: 'Error creating task',
				type: 'error'
			});
		}
	},
	async applyToTask({ commit, dispatch, state }, { userId, taskId }) {
		const chatStarted = await dispatch('chat/startChat', { taskId: state.tasks.id, clientId: state.tasks.client_id }, { root: true }); 
		if(chatStarted.success) {
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
	},
	async rateTask({ commit }, input) {
		commit('SET_TASKS', { key: 'dataState', value: dataState.LOADING });
		try {
			const { success } = await tasksService.rateTask(input);
			if(success) {
				window.location.reload();
			} else {
				throw new Exception('Error rating task')
			}
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error rating task',
				type: 'error'
			});
		}
	},
	async fetchTask({ commit }, taskId) {
		commit('SET_TASKS', { key: 'dataState', value: dataState.LOADING })
		try {
			const { success, data } = await tasksService.getTask(taskId);
			console.log(success, data);
			if(success) {
				commit('SET_TASKS', { key: 'tasks', value: data });
				commit('SET_TASKS', { key: 'dataState', value: dataState.SUCCESS });
			} else {
				commit('SET_TASKS', { key: 'dataState', value: dataState.ERROR })
				throw new Exception('Error creating task')
			}
		} catch(e) {
			console.log(e);
			Notification({
				title: 'Error',
				message: 'Error fetching task',
				type: 'error'
			});
		}
	},
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