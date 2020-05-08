<template>
	<page title="Projects">
		<el-table
			ref="multipleTable"
			:data="projects.projects"
			highlight-current-row
			v-loading="projects.dataState === 'loading'"
		>
			<el-table-column
				label="Tester"
				property="tester.name"
				width="120"
				sortable
			/>
			<el-table-column
				property="task.company.name"
				label="Company"
				width="120"
				sortable
			/>
			<el-table-column
				property="status"
				label="Status"
				sortable
			/>
			<el-table-column
				property="task.deadline"
				label="Deadline"
				sortable
			/>
		</el-table>
	</page>
</template>

<script>
import { ProjectsService } from '@/api';
import { mapActions, mapState } from 'vuex';
export default {
	name: 'ClientProjects',
	computed: {
		...mapState({
			projects: state => state.projects,
		}),
	},
	methods: {
		...mapActions('projects', ['fetchProjects']),
	},
	async mounted() {
		this.fetchProjects();
	}
}
</script>