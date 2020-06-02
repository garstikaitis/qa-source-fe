<template>
	<page>
		<template #title>
			<h1 class="font-bold text-gray-800 text-2xl font-body cursor-pointer hover:underline" @click="$router.push({ name: 'TesterProjects' })"><i class="el-icon-back mr-2"></i>{{ projects.projects ? projects.projects.task.name : 'Project' }}</h1>
		</template>
		<div>
			<el-button @click="startChat">Start</el-button>
		</div>
		<el-input v-model="message" />
		<el-button @click="sendMessage(message)">Send message</el-button>
		<div v-if="chat.dataState === 'success'">
			<div v-for="message in chat.chatWindow.items" :key="message.state.sid">{{ message.state.body }}</div>
		</div>
	</page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ChatService } from '@/api';
export default {
	name: 'TesterProject',
	data() {
		return {
			message: ''
		}
	},
	computed: {
		...mapState({
			projects: state => state.projects,
			auth: state => state.auth,
			chat: state => state.chat,
		})
	},
	methods: {
		...mapActions('projects', ['fetchProject']),
		...mapActions('chat', ['startChat', 'generateChatToken', 'initChat', 'sendMessage']),
		handleSendMessage() {
			this.sendMessage(this.message);
		}
	},
	mounted() {
		this.fetchProject(this.$route.params.projectId);
		this.initChat(this.auth.user.email);
	}
}
</script>