<template>
	<page title="Projects">
		<el-table
			ref="multipleTable"
			:data="projects.projects"
			highlight-current-row
			v-loading="projects.dataState === 'loading'"
			@row-click="handleShowRatingModal"
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
		<el-dialog 
			v-if="selectedProject"
			:title="`Rate project`"
			:visible.sync="showRatingModal"
		>
			<el-form ref="form" :model="rateForm">
				<el-form-item label="Rate from 1 to 5 where 5 is the highest">
					<el-rate v-model="rateForm.rating"></el-rate>
				</el-form-item>
				<el-form-item label="Comment" class="flex flex-col items-center justify-center">
					<el-input type="textarea" v-model="rateForm.comment" />
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showRatingModal = false">Cancel</el-button>
				<el-button type="primary" @click="handleRateTask">Confirm</el-button>
			</span>
		</el-dialog>
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
			auth: state => state.auth,
		}),
	},
	data() {
		return {
			selectedProject: null,
			showRatingModal: false,
			rateForm: {}
		}
	},
	methods: {
		...mapActions('projects', ['fetchProjects']),
		...mapActions('tasks', ['rateTask']),
		handleShowRatingModal(data) {
			this.selectedProject = data;
			this.showRatingModal = true; 
		},
		handleRateTask() {
			const input = {
				rating: this.rateForm.rating,
				comment: this.rateForm.comment,
				created_by: this.auth.user.id,
				given_to: this.selectedProject.userId, // TODO UPDATE
				taskId: this.selectedProject.task.id,
			}
			this.rateTask(input);
		},
	},
	async mounted() {
		this.fetchProjects();
	}
}
</script>