<template>
	<page title="Tasks">
		<el-button type="primary" slot="top-button" icon="el-icon-plus" @click="showAddTaskModal = true">Add task</el-button>
		<el-table
			ref="multipleTable"
			:data="tasks.tasks"
			highlight-current-row
			v-loading="tasks.dataState === 'loading'"
		>
			<el-table-column
				label="Name"
				property="name"
				width="120"
				sortable
			/>
			<el-table-column
				label="Company"
				property="company.name"
				width="120"
				sortable
			/>
			<el-table-column
				property="deadline"
				label="Deadline"
				width="150"
				sortable
			>
				<template slot-scope="scope">{{ scope.row.deadline | moment("MMM d, hh:mm") }}</template>
			</el-table-column>
		</el-table>
		<el-dialog 
			title="Create new task"
			:visible.sync="showAddTaskModal"
		>
			<el-form ref="form" :model="form">
				<el-form-item label="Client title">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="Task type">
					<el-select v-model="form.type" placeholder="Select">
						<el-option
							v-for="(type, index) in types"
							:key="index"
							:label="`${type} testing`"
							:value="type" />
					</el-select>
				</el-form-item>
				<el-form-item label="Task description">
					<el-input type="textarea" :rows="6" v-model="form.description"></el-input>
				</el-form-item>
				<el-form-item label="Deadline">
					<el-date-picker
						v-model="form.deadline"
						type="datetime"
						placeholder="Select date and time"
						value-format="yyyy-MM-dd HH:mm:ss"
					/>
				</el-form-item>
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
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showAddTaskModal = false">Cancel</el-button>
				<el-button type="primary" @click="handleCreateTask">Confirm</el-button>
			</span>
		</el-dialog>
	</page>
</template>

<script>
import { TasksService } from '@/api';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
	name: 'ClientTasks',
	data() {
		return {
			showAddTaskModal: false,
			form: {},
			types: ['Alpha','Acceptance','Ad-hoc','Accessibility','Beta','Browser compatibility','Backward compatibility','Boundary value','Usability']
		}
	},
	computed: {
		...mapState({
			tasks: state => state.tasks,
			auth: state => state.auth,
		}),
		...mapGetters('auth', ['user']),
	},
	methods: {
		...mapActions('tasks', ['fetchTasks', 'createTask']),
		handleCreateTask() {
			const file = this.$refs.upload.uploadFiles[0];
			const fd = new FormData();
			fd.append('name', this.form.name);
			fd.append('companyId', this.user.company.id);
			fd.append('description', this.form.description);
			fd.append('type', this.form.type);
			fd.append('deadline', this.form.deadline);
			fd.append('file', file.raw);
			this.createTask(fd);
		}
	},
	async mounted() {
		this.fetchTasks();
	}
}
</script>