<template>
	<page title="Tasks">
		<div class="flex">
			<div class="w-3/4" v-if="tasks.dataState !== 'loading'">
				<div class="block px-4 py-2 bg-white rounded-lg shadow mb-4">
					<div class="font-bold font-body text-blue-500">{{ tasks.tasks.name }}<el-tag effect="plain" class="ml-2" type="info">{{ tasks.tasks.type }}</el-tag></div>
					<div>{{ tasks.tasks.description }}</div>
					<div class="flex w-full justify-between items-center">
						
						<div>Created by: {{ tasks.tasks.company.name }}</div>
						<el-button type="primary" @click="assignTaskToUser({ userId: auth.user.id, taskId: tasks.tasks.id })">Apply</el-button>
					</div>
				</div>
			</div>
			<my-profile />
		</div>
	</page>
</template>

<script>
import { TasksService } from '@/api';
import { mapActions, mapState } from 'vuex';
export default {
	name: 'TesterTask',

	computed: {
		...mapState({
			tasks: state => state.tasks,
			auth: state => state.auth
		}),
	},
	methods: {
		...mapActions('tasks', ['fetchTask']),
	},
	async mounted() {
		this.fetchTask(this.$route.params.taskId);
	}
}
</script>