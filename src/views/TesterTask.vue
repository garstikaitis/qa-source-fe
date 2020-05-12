<template>
	<page>
		<template #title>
			<h1 class="font-bold text-gray-800 text-2xl font-body cursor-pointer hover:underline" @click="$router.push({ name: 'TesterTasks' })"><i class="el-icon-back mr-2"></i>{{ tasks.tasks ? tasks.tasks.name : 'Task' }}</h1>
		</template>
		<div class="flex">
			<div class="w-3/4" v-if="tasks.dataState !== 'loading'">
				<div class="block px-4 py-2 bg-white rounded-lg shadow mb-4">
					<div class="header flex justify-between items-center pt-4">
						<div>
							<div class="font-bold font-body text-blue-500">{{ tasks.tasks.name }}<el-tag effect="plain" class="ml-2" type="info">{{ tasks.tasks.type }}</el-tag></div>
							<div class="text-gray-500 text-sm">Posted {{ postedAt }} ago</div>
						</div>
						<div>
							<el-button type="primary" @click="assignTaskToUser({ userId: auth.user.id, taskId: tasks.tasks.id })">Apply</el-button>
						</div>
					</div>
					<el-divider />
					<div class="body">
						<div>{{ tasks.tasks.description }}</div>
					</div>
					<el-divider />
					<div class="footer mb-4">
						<div class="font-bold">Client information</div>
						<div class="flex w-full justify-between items-center">
							<div>{{ tasks.tasks.company.name }}</div>
						</div>
						<div class="font-bold mt-2" v-if="tasks.tasks.file">Attached files</div>
						<div class="flex w-full justify-between items-center" v-if="tasks.tasks.file">
							<el-link icon="el-icon-folder-checked" type="primary" :href="downloadLink" download>{{ tasks.tasks.file.original_filename }}</el-link>
						</div>
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
import moment from 'moment';
import axios from 'axios';
export default {
	name: 'TesterTask',

	computed: {
		...mapState({
			tasks: state => state.tasks,
			auth: state => state.auth
		}),
		downloadLink() {
			return `${axios.defaults.baseURL}files/taskFiles/${this.tasks.tasks.id}`;
		},
		postedAt() {
			if(this.tasks.tasks) {
				const createdAt = moment(this.tasks.tasks.created_at);
				const timePassed = moment().diff(createdAt, 'minutes');
				if(timePassed >= 60) {
					return `${moment().diff(createdAt, 'hours')} hours`;
				} else {
					return `${timePassed} minutes`;
				}
			}
			return null;
		}
	},
	methods: {
		...mapActions('tasks', ['fetchTask']),
	},
	async mounted() {
		this.fetchTask(this.$route.params.taskId);
	}
}
</script>