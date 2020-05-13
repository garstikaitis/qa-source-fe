<template>
	<page title="Ratings">
		<el-table
			ref="multipleTable"
			:data="ratings"
			v-loading="!ratings.length"
		>
			<el-table-column
				label="Received by"
				property="created_by.name"
				sortable
			/>
			<el-table-column
				property="rating"
				label="Rating"
				sortable
			/>
			<el-table-column
				property="comment"
				label="Comment"
				sortable
			/>
			<el-table-column
				property="task.name"
				label="Task"
				sortable
			/>
			<el-table-column
				property="created_at"
				label="Created at"
				sortable
			/>
		</el-table>
	</page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
export default {
	name: 'TesterRatings',
	computed: {
		...mapState({
			auth: state => state.auth
		}),
		ratings() {
			if(this.auth.userMeta) {
				return this.auth.userMeta.ratings.map(item => {
					return {
						...item,
						created_by: {
							...item.created_by,
							company: item.created_by.companies[0]
						},
						created_at: moment(item.created_at).fromNow(),
					}
				})
			} 
		}
	},
	methods: {
		...mapActions('auth', ['fetchMe'])
	},
	mounted() {
		this.fetchMe();
	}
}
</script>