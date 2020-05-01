<template>
	<div>
		<page title="Overview">
			<div class="w-full flex items-center">
				<div class="bg-white shadow p-4 rounded-lg w-48 mr-4" v-if="auth.user.role === 'admin'">
					<i class="el-icon-bank-card text-blue-500 text-4xl"></i>
					<div class="w-full mt-4">
						<div class="font-bold">Total companies</div>
						<div class="font-bold text-xl text-blue-500"><count-to :start-val="0" :end-val="companies.companies.length" /></div>
					</div>
				</div>
				<div class="bg-white shadow p-4 rounded-lg w-48  mr-4" v-if="auth.user.role !== 'tester'">
					<i class="el-icon-user text-blue-500 text-4xl"></i>
					<div class="w-full mt-4">
						<div class="font-bold">Total users</div>
						<div class="font-bold text-xl text-blue-500"><count-to :start-val="0" :end-val="users.users.length" /></div>
					</div>
				</div>
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
	name: 'Dashboard',
	components: { countTo },
	computed: {
		...mapState({
			companies: state => state.companies,
			users: state => state.users,
			auth: state => state.auth,
			projects: state => state.projects
		})
	},
	methods: {
		...mapActions('companies', ['fetchCompanies']),
		...mapActions('users', ['fetchUsers']),
		...mapActions('projects', ['fetchProjects'])
	},
	async mounted() {
		console.log(this.auth.user.role);
		if(this.auth.user.role === 'admin') {
			this.fetchCompanies();
		}
		if(this.auth.user.role !== 'tester') {
			this.fetchUsers();
		}
		this.fetchProjects();
	}
}
</script>