<template>
	<page title="Companies">
		<el-button type="primary" slot="top-button" icon="el-icon-plus" @click="showAddCompanyModal = true">Add company</el-button>
		<el-table
			ref="multipleTable"
			:data="companies.companies"
			v-loading="companies.dataState === 'loading'"
			@row-click="handleCurrentChange"
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
				<el-button type="primary" @click="createCompany(form)">Confirm</el-button>
			</span>
		</el-dialog>

		<el-dialog 
			v-if="selectedCompany"
			:title="`Add users to ${selectedCompany.name}`"
			:visible.sync="showAddUsersToCompany"
		>
			<el-form ref="form" :model="users">
				<el-form-item label="Select user">
					<el-select v-model="selectedUser" placeholder="Select">
						<el-option
							v-for="user in filteredUsers"
							:key="user.id"
							:label="user.name"
							:value="user.id" />
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showAddUsersToCompany = false">Cancel</el-button>
				<el-button type="primary" @click="addUserToCompany({ companyId: selectedCompany.id, userId: selectedUser })">Confirm</el-button>
			</span>
		</el-dialog>
	</page>
</template>

<script>
import { CompaniesService, UsersService } from '@/api';
import { mapActions, mapState } from 'vuex';
export default {
	name: 'Companies',
	data() {
      return {
		showAddCompanyModal: false,
		form: {},
		showAddUsersToCompany: false,
		selectedCompany: null,
		selectedUser: null,
		showMore: false,
      }
	},
	computed: {
		...mapState({
			companies: state => state.companies,
			users: state => state.users,
		}),
		filteredUsers() {
			return this.users.users ? this.users.users.filter(user => !user.companies.length) : []
		}
	},
	methods: {
		...mapActions('companies', ['fetchCompanies', 'createCompany', 'addUserToCompany']),
		...mapActions('users', ['fetchUsers']),
		
		handleCurrentChange(data) {
			this.showAddUsersToCompany = true;
			this.selectedCompany = data;
			console.log(data);
		},
	},
	async mounted() {
		this.fetchCompanies();
		this.fetchUsers();
	}
}
</script>