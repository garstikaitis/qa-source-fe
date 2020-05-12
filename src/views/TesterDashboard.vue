<template>
	<div>
		<page title="Overview">
			<div class="w-full flex items-center">
				<div class="bg-white shadow p-4 rounded-lg w-48">
					<i class="el-icon-s-open text-blue-500 text-4xl"></i>
					<div class="w-full mt-4">
						<div class="font-bold">Total ongoing projects</div>
						<div class="font-bold text-xl text-blue-500"><count-to :start-val="0" :end-val="ongoingProjects.length" /></div>
					</div>
				</div>
				<div class="bg-white shadow p-4 rounded-lg w-48 ml-4">
					<i class="el-icon-s-open text-blue-500 text-4xl"></i>
					<div class="w-full mt-4">
						<div class="font-bold">Total finished projects</div>
						<div class="font-bold text-xl text-blue-500"><count-to :start-val="0" :end-val="finishedProjects.length" /></div>
					</div>
				</div>
			</div>
			<h1 class="font-bold text-gray-800 text-2xl font-body mt-12">Recent ratings</h1>
		</page>
	</div>
</template>

<script>
import countTo from 'vue-count-to';
import { CompaniesService } from '@/api';
import { mapState, mapActions } from 'vuex';
export default {
	name: 'TesterDashboard',
	components: { countTo },
	computed: {
		...mapState({
			projects: state => state.projects
		}),
		ongoingProjects() {
			return this.projects.projects.filter(item => item.status === 'started')
		},
		finishedProjects() {
			return this.projects.projects.filter(item => item.status === 'finished')
		},
	},
	methods: {
		...mapActions('projects', ['fetchProjects']),
		...mapActions('auth', ['fetchMe']),
	},
	async mounted() {
		this.fetchProjects();
		this.fetchMe();
	}
}
</script>