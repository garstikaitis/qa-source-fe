<template>
	<page title="Projects">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="Ongoing" name="ongoing" />
			<el-tab-pane label="Finished" name="finished" />
		</el-tabs>
		<div class="flex">
			<div class="w-3/4" v-if="activeTab === 'ongoing'">
				<div class="px-4 py-2 bg-white rounded-lg shadow mb-4" v-for="project in ongoingProjects" :key="project.id">
					<div class="font-bold font-body text-blue-500">{{ project.task.name }}<el-tag effect="plain" class="ml-2" type="info">{{ project.task.type }}</el-tag></div>
					<div>{{ project.task.description }}</div>
					<div class="flex w-full justify-between items-center">
						
						<div>Created by: {{ project.task.company.name }}</div>
						<el-button type="primary" @click="handleShowProjectReturnModal(project)">Return</el-button>
					</div>
				</div>
			</div>
			<div class="w-3/4" v-else>
				<div class="px-4 py-2 bg-white rounded-lg shadow mb-4" v-for="project in finishedProjects" :key="project.id">
					<div class="font-bold font-body text-blue-500">{{ project.task.name }}<el-tag effect="plain" class="ml-2" type="info">{{ project.task.type }}</el-tag></div>
					<div>{{ project.task.description }}</div>
					<div class="flex w-full justify-between items-center">
						
						<div>Created by: {{ project.task.company.name }}</div>
						<el-button type="primary" @click="handleShowProjectReturnModal(project)">Return</el-button>
					</div>
				</div>
			</div>
			<my-profile />
		</div>
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
import { mapState, mapActions } from 'vuex';
export default {
	name: 'TesterProjects',
	data() {
		return {
			activeTab: 'ongoing',
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
		ongoingProjects() {
			return this.projects.projects.length ? this.projects.projects.filter(p => p.status === 'started') : [];
		},
		finishedProjects() {
			return this.projects.projects.length ? this.projects.projects.filter(p => p.status === 'finished') : [];
		}
		
	},
	methods: {
		...mapActions('projects', ['fetchProjects', 'returnProject']),
		handleSubmit() {
			const file = this.$refs.upload.uploadFiles[0];
			const fd = new FormData();
			fd.append('projectId', this.selectedProject.id);
			if(this.auth.user.role === 'admin') fd.append('userId', this.selectedProject.userId);
			else fd.append('userId', this.auth.user.id);
			fd.append('file', file.raw);
			this.returnProject(fd);
		},
		handleShowProjectReturnModal(project) {
			this.selectedProject = project;
			this.showProjectReturnModal = true;
		},
	},
	mounted() {
		this.fetchProjects();
	}
}
</script>