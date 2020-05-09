<template>
	<page title="Tasks">
		<div class="flex">
			<div class="w-3/4" v-loading="tasks.dataState === 'loading'">
				<div class="block px-4 py-2 bg-white rounded-lg shadow mb-4" v-for="task in tasks.tasks" :key="task.id">
					<router-link :to="{ name: 'TesterTask', params: { taskId: task.id } }">
						<div class="font-bold font-body text-blue-500">{{ task.name }}<el-tag effect="plain" class="ml-2" type="info">{{ task.type }}</el-tag></div>
						<div>{{ task.description }}</div>
						<div class="flex w-full justify-between items-center">
							
							<div>Created by: {{ task.company.name }}</div>
							<el-button type="primary" @click="assignTaskToUser({ userId: auth.user.id, taskId: task.id })">Apply</el-button>
						</div>
					</router-link>
				</div>
			</div>
			<my-profile />
		</div>
	</page>
</template>

<script>
import { TasksService } from '@/api';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
	name: 'TesterTasks',

	computed: {
		...mapState({
			tasks: state => state.tasks,
			auth: state => state.auth,
		}),
		...mapGetters('auth', ['user']),
	},
	methods: {
		...mapActions('tasks', ['fetchTasks', 'assignTaskToUser']),
		...mapActions('companies', ['fetchCompanies']),
	},
	async mounted() {
		this.fetchTasks();
	}
}
</script>