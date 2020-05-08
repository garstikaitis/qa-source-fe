<template>
	<page title="Projects">
		<el-table
			ref="multipleTable"
			:data="projects.projects"
			highlight-current-row
			v-loading="projects.dataState === 'loading'"
			@row-click="handleShowProjectReturnModal"
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
			:title="`Return project`"
			:visible.sync="showProjectReturnModal"
		>
			<el-form ref="form" :model="returnForm">
				<el-form-item label="Upload report" class="flex flex-col items-center justify-center">
					<el-upload 
						id="dropzone" 
						ref="upload"
						action="https://jsonplaceholder.typicode.com/posts/"
						:auto-upload="false"
						:drag="true"
					>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showProjectReturnModal = false">Cancel</el-button>
				<el-button type="primary" @click="handleSubmit">Confirm</el-button>
			</span>
		</el-dialog>
	</page>
</template>

<script>
import { ProjectsService } from '@/api';
import { mapActions, mapState } from 'vuex';
export default {
	name: 'Projects',
	data() {
		return {
			showProjectReturnModal: false,
			selectedProject: null,
			returnForm: {
				files: []
			},
			options: {
				url: 'https://httpbin.org/post',
				autoProcessQueue: false
			}
		}
	},
	computed: {
		...mapState({
			projects: state => state.projects,
			auth: state => state.auth
		}),
	},
	methods: {
		...mapActions('projects', ['fetchProjects', 'returnProject']),
		handleShowProjectReturnModal(project) {
			this.selectedProject = project;
			this.showProjectReturnModal = true;
		},
		handleSubmit() {
			const file = this.$refs.upload.uploadFiles[0];
			const fd = new FormData();
			fd.append('projectId', this.selectedProject.id);
			fd.append('userId', this.selectedProject.userId);
			fd.append('file', file.raw);
			this.returnProject(fd);
		}
	},
	async mounted() {
		this.fetchProjects();
	}
}
</script>