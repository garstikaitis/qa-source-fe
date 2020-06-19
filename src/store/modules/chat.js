import { dataState } from '@/utils';
import { Notification } from 'element-ui';
import { ChatService } from '../../api';
import { Client } from 'twilio-chat';

const chatService = new ChatService;

const state = {
	chat: null,
	dataState: dataState.LOADING,
	token: null,
	chatWindow: null,
	client: null,
	channel: null,
};
const getters = {};
const actions = {
	async startChat({ commit }, { taskId, clientId }) {
		return new Promise(async (resolve, reject) => {
			commit('SET_CHAT', { key: 'dataState', value: dataState.LOADING })
			try {
				const { data, success } = await chatService.startChat({ taskId, clientId });
				if(success) {
					commit('SET_CHAT', { key: 'chat', value: data });
					commit('SET_CHAT', { key: 'dataState', value: dataState.SUCCESS })
					resolve({ success: true, data });
				} else {
					commit('SET_CHAT', { key: 'dataState', value: dataState.ERROR })
					throw new Exception('Error starting chat')
				}
			} catch(e) {
				reject('Error creating chat');
				Notification({
					title: 'Error',
					message: 'Error starting chat',
					type: 'error'
				});
			}
		})
	},
	async initChat({ commit, dispatch }, email) {
		commit('SET_CHAT', { key: 'dataState', value: dataState.LOADING })
		try {
			const { token } = await chatService.generateChatToken(email);
			if(token) {
				commit('SET_CHAT', { key: 'token', value: token });
				dispatch('joinChat', token);
			} else {
				commit('SET_CHAT', { key: 'dataState', value: dataState.ERROR })
				throw new Exception('Error generating chat token')
			}
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error generating chat token',
				type: 'error'
			});
		}
	},
	async joinChat({ commit, state, rootState, dispatch }, token) {
		const client = await Client.create(token);
		commit('SET_CHAT', { key: 'client', value: client });
		client.on("tokenAboutToExpire", async () => {
			const token = await chatService.generateChatToken(rootState.auth.user.email);
			client.updateToken(token);
		});
		dispatch('getChannel', client);
	},
	async getMessages({ commit }, channel) {
		try {
			const data = await channel.getMessages();
			commit('SET_CHAT', { key: 'chatWindow', value: data });
			commit('SET_CHAT', { key: 'dataState', value: dataState.SUCCESS });
		} catch(e) {
			Notification({
				title: 'Error',
				message: 'Error getting messages',
				type: 'error'
			});
		}
	},
	sendMessage({ commit, state }, message) {
		state.channel.sendMessage(message);
	},
	async getChannel({ commit, dispatch, state, rootState }, client) {
		try {
			const channelName = `${rootState.auth.user.id}-${rootState.projects.projects.task.client_id}-${rootState.projects.projects.task.id}`;
			const data = await client.getChannelByUniqueName(channelName);
			commit('SET_CHAT', { key: 'channel', value: data });
			dispatch('getMessages', data);
			state.channel.on("messageAdded", message => {
				state.chatWindow.items.push(message);
			});
		} catch(e) {
			console.log(e);
			Notification({
				title: 'Error',
				message: 'Error getting channel',
				type: 'error'
			});
		}
	},
};
const mutations = {
	SET_CHAT(state, { key, value }) {
		state[key] = value;
	},
	RESET_CHAT(state) {
		state.chat = null;
		state.dataState = dataState.LOADING,
		state.token = null;
		state.chatWindow = null;
		state.client = null;
		state.channel = null;
	}
};


export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};