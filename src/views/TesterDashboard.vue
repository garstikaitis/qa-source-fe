<template>
	<div>
		<page title="Overview">
			<div class="w-full flex items-center">
				<div class="bg-white shadow p-4 rounded-lg w-48">
					<i class="el-icon-s-open text-blue-500 text-4xl"></i>
					<div class="w-full mt-4">
						<div class="font-bold">Total ongoing projects</div>
						<div class="font-bold text-xl text-blue-500"><count-to :start-val="0" :end-val="projects.projects.length" /></div>
					</div>
				</div>
			</div>
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
		})
	},
	methods: {
		...mapActions('projects', ['fetchProjects'])
	},
	async mounted() {
		this.fetchProjects();
	}
}
</script>