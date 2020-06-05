<template>
	<page>
		<template #title>
			<h1 class="font-bold text-gray-800 text-2xl font-body cursor-pointer hover:underline" @click="$router.push({ name: 'TesterProjects' })"><i class="el-icon-back mr-2"></i>{{ projects.projects ? projects.projects.task.name : 'Project' }}</h1>
		</template>
		<div class="flex">
			<div class="w-3/5 mr-4">
				<card>
					<template #title>
						<div class="flex justify-between items-center">
							<div class="flex">
								{{ projects.projects.task.name }}
								<tag class="ml-2">{{ projects.projects.status }}</tag>
							</div>
							<div class="relative">
								<icon @click="showContextMenu = !showContextMenu">more_horiz</icon>
								<context-menu v-if="showContextMenu" :items="['Return project', 'Leave project']"></context-menu>
							</div>
						</div>
					</template>
					<template v-loading="chat.dataState === 'success'">
						<div :class="{ 'bg-gray-100': message.state.author === auth.user.email}" class="my-2 rounded border" v-for="message in chat.chatWindow.items" :key="message.state.sid">
							{{ message.state.body }}
						</div>
						<div class="flex w-full items-center p-2 write-message-container rounded mt-8">
							<div class="w-1/10">
								<icon>attach_file</icon>
							</div>
							<div class="w-4/5 mr-24 ml-4">
								<input class="w-full h-8 outline-none" v-model="message" placeholder="Write a message" />
							</div>
							<div class="w-1/10 flex justify-end">
								<el-button @click="sendMessage(message); message = ''" type="primary">Send</el-button>
							</div>
						</div>
					</template>
				</card>
			</div>
			<div class="flex flex-col w-2/5">
				<card>
					<template #title>
						<div class="flex justify-between items-center">
							Project activity
							<icon hint="Show all activity">visibility</icon>
						</div>
					</template>
					<template>
						<div class="text-gray-500 font-semibold">14 days ago</div>
						<div>Client created the project</div>
						<div>You have applied for the project</div>
						<div class="text-gray-500 font-semibold mt-4">12 days ago</div>
						<div>You have been approved to the project</div>
						<div class="text-gray-500 font-semibold mt-4">2 days ago</div>
						<div>Client rejected your report</div>
					</template>
				</card>
				<card class="my-4">
					<template #title>Project details</template>
					<template>
						<div class="flex flex-col">
							<card-row name="Title">{{ projects.projects.task.name }}</card-row>
							<card-row name="Description">{{ projects.projects.task.description }}</card-row>
							<card-row name="Type of work">{{ projects.projects.task.type }} testing</card-row>
						</div>
					</template>
				</card>
				<card>
					<template #title>Client details</template>
					<template>
						<div class="flex flex-col">
							<card-row name="Name">{{ projects.projects.task.company.name }}</card-row>
							<card-row name="Project count">n/a</card-row>
							<card-row name="Average rating">n/a</card-row>
						</div>
					</template>
				</card>
			</div>
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
			message: '',
			showContextMenu: false,
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

<style scoped>
.write-message-container {
	border: 2px solid #D7D7D7;
}
</style>