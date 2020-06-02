<template>
	<page title="Projects">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="Ongoing" name="ongoing" />
			<el-tab-pane label="Finished" name="finished" />
		</el-tabs>
		<div class="flex">
			<div class="w-3/4" v-if="activeTab === 'ongoing'" v-loading="projects.dataState === 'loading'">
				<div class="px-4 py-2 bg-white rounded-lg shadow mb-4" v-for="project in ongoingProjects" :key="project.id">
					<router-link :to="{ name: 'TesterProject', params: { projectId: project.id } }">
						<div class="font-bold font-body text-blue-500">{{ project.task.name }}<el-tag effect="plain" class="ml-2" type="info">{{ project.task.type }}</el-tag></div>
						<div>{{ project.task.description }}</div>
						<div class="flex w-full justify-between items-center">
							
							<div>Created by: {{ project.task.company.name }}</div>
							<el-button type="primary" @click="handleShowProjectReturnModal(project)">Return</el-button>
						</div>
					</router-link>
				</div>
			</div>
			<div class="w-3/4" v-else>
				<div class="px-4 py-2 bg-white rounded-lg shadow mb-4" v-for="project in finishedProjects" :key="project.id">
					<router-link :to="{ name: 'TesterProject', params: { projectId: project.id } }">
						<div class="font-bold font-body text-blue-500">{{ project.task.name }}<el-tag effect="plain" class="ml-2" type="info">{{ project.task.type }}</el-tag></div>
						<div>{{ project.task.description }}</div>
						<div class="flex w-full justify-between items-center">
							
							<div>Created by: {{ project.task.company.name }}</div>
							<el-button v-if="activeTab === 'ongoing'" type="primary" @click="handleShowProjectReturnModal(project)">Return</el-button>
							<el-button v-else type="primary" @click="handleShowRatingModal(project)">Rate</el-button>
						</div>
					</router-link>
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
			showRatingModal: false,
			options: {
				url: 'https://httpbin.org/post',
				autoProcessQueue: false
			},
			rateForm: {}
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
		...mapActions('tasks', ['rateTask']),
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
		handleShowRatingModal(project) {
			this.selectedProject = project;
			this.showRatingModal = true;
		},
		handleRateTask() {
			const input = {
				rating: this.rateForm.rating,
				comment: this.rateForm.comment,
				created_by: this.auth.user.id,
				given_to: 2, // TODO UPDATE
				taskId: this.selectedProject.task.id,
			}
			this.rateTask(input);
		}
	},
	mounted() {
		this.fetchProjects();
	}
}
</script>