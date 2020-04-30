<template>
	<page title="Companies">
		<el-button type="primary" slot="top-button" icon="el-icon-plus" @click="showAddCompanyModal = true" circle />
		<el-table
			ref="multipleTable"
			:data="tableData.data"
			highlight-current-row
			@current-change="handleCurrentChange"
		>
			<el-table-column
				label="Name"
				property="name"
				width="120"
				sortable
			/>
			<el-table-column
				property="slug"
				label="Slug"
				width="120"
				sortable
			/>
			<el-table-column
				property="credits_remaining"
				label="Credits remaining"
				sortable
			/>
		</el-table>
		<el-dialog 
			title="Create new company"
			:visible.sync="showAddCompanyModal"
		>
			<el-form ref="form" :model="form">
				<el-form-item label="Company name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="Slug">
					<el-input v-model="form.slug"></el-input>
				</el-form-item>
				<el-form-item label="Credits remaining">
					<el-input type="number" v-model="form.credits_remaining"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showAddCompanyModal = false">Cancel</el-button>
				<el-button type="primary" @click="createCompany">Confirm</el-button>
			</span>
		</el-dialog>

		<el-dialog 
			v-if="selectedCompany"
			:title="`Add users to ${selectedCompany.name}`"
			:visible.sync="showAddUsersToCompany"
		>
			<el-form ref="form" :model="users">
				<el-form-item label="Credits remaining">
					<el-select v-model="selectedUser" placeholder="Select">
						<el-option
							v-for="user in users.data"
							:key="user.id"
							:label="user.name"
							:value="user.id" />
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showAddUsersToCompany = false">Cancel</el-button>
				<el-button type="primary" @click="addUserToCompany">Confirm</el-button>
			</span>
		</el-dialog>
	</page>
</template>

<script>
import { CompaniesService, UsersService } from '@/api';
export default {
	name: 'Companies',
	data() {
      return {
		showAddCompanyModal: false,
		form: {},
        tableData: [],
		multipleSelection: [],
		showAddUsersToCompany: false,
		service: null,
		usersService: null,
		selectedCompany: null,
		selectedUser: null,
		users: null,
      }
	},
	methods: {
		async createCompany() {
			const data = this.service.createCompany(this.form);
			if(data.success) window.location.reload();
		},
		handleCurrentChange(data) {
			this.showAddUsersToCompany = true;
			this.selectedCompany = data;
			console.log(data);
		},
		async addUserToCompany() {
			const data = await this.usersService.addUserToCompany({ companyId: this.selectedCompany.id, userId: this.selectedUser });
			console.log(data);
		}
	},
	async mounted() {
		this.service = new CompaniesService;
		this.tableData = await this.service.getCompanies();
		this.usersService = new UsersService;
		this.users = await this.usersService.getUsers();
	}
}
</script>