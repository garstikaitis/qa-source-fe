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
							:label="type"
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
				<el-form-item v-if="auth.user.role === 'admin'" label="Select company">
					<el-select v-model="form.companyId" placeholder="Select">
						<el-option
							v-for="company in companies.companies"
							:key="company.id"
							:label="company.name"
							:value="company.id" />
					</el-select>
				</el-form-item>
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
			types: ['Alpha testing','Acceptance testing','Ad-hoc testing','Accessibility testing','Beta testing','Browser compatibility testing','Backward compatibility testing','Boundary value testing','Usability testing']
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
			this.form.companyId = this.user.company.id;
			this.createTask(this.form);
		}
	},
	async mounted() {
		this.fetchTasks();
	}
}
</script>