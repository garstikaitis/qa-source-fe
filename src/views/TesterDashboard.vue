<template>
	<div>
		<page title="Overview">
			<div class="w-full flex items-center">
				<div class="bg-white shadow p-4 rounded-lg w-48">
					<i class="el-icon-s-open text-blue-500 text-4xl"></i>
					<div class="w-full mt-4">
						<div class="font-bold">Total ongoing projects</div>
						<div class="font-bold text-xl text-blue-500"><count-to :start-val="0" :end-val="ongoingProjects.length" /></div>
					</div>
				</div>
				<div class="bg-white shadow p-4 rounded-lg w-48 ml-4">
					<i class="el-icon-s-open text-blue-500 text-4xl"></i>
					<div class="w-full mt-4">
						<div class="font-bold">Total finished projects</div>
						<div class="font-bold text-xl text-blue-500"><count-to :start-val="0" :end-val="finishedProjects.length" /></div>
					</div>
				</div>
			</div>
			<div class="w-full flex">
				<div class="w-2/5">
					<h1 class="font-bold text-gray-800 text-2xl font-body mt-12">
						<router-link :to="{ name: 'TesterRatings' }">
							Recent ratings <i class="el-icon-right" />
						</router-link>
					</h1>
					<div class="mt-4 bg-white rounded-lg shadow p-4">
						<div class="w-full flex mt-2 items-center" v-for="rating in ratings" :key="rating.id">
							<div>
								<img class="rounded-full h-12" :src="rating.created_by.company.logo" />
							</div>
							<div class="flex-col ml-3">
								<div class="font-body hover:underline cursor-pointer">
									<router-link :to="{ name: 'TesterTask', params: { taskId: rating.task.id } }">
										{{ rating.task.name }}
									</router-link></div>
								<div>
									<b>{{ rating.created_by.name }}</b> from <b>{{ rating.created_by.companies[0].name }}</b> has given you {{ rating.rating }} stars
								</div>
								<div class="text-gray-500 text-sm">{{ rating.created_at }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="w-3/5 ml-4">
					<h1 class="font-bold text-gray-800 text-2xl font-body mt-12">Historical data</h1>
					<div class="bg-white rounded-lg shadow mt-4 relative">
						<div class="absolute left-0 flex flex-col justify-between h-full py-2 pl-2">
							<div v-for="i in 10" :key="i" class="text-sm text-gray-600">{{ i }}</div>
						</div>
						<trend
							:data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
							:gradient="['#6159E6', '#C4C1FF']"
							auto-draw
							smooth
						/>
					</div>
				</div>
			</div>
		</page>
	</div>
</template>

<script>
import countTo from 'vue-count-to';
import { CompaniesService } from '@/api';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
export default {
	name: 'TesterDashboard',
	components: { countTo },
	computed: {
		...mapState({
			projects: state => state.projects,
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
		},
		ongoingProjects() {
			return this.projects.projects.filter(item => item.status === 'started')
		},
		finishedProjects() {
			return this.projects.projects.filter(item => item.status === 'finished')
		},
	},
	methods: {
		...mapActions('projects', ['fetchProjects']),
		...mapActions('auth', ['fetchMe']),
	},
	async mounted() {
		this.fetchProjects();
		this.fetchMe();
	}
}
</script>

<style>
svg {
	height: 60%;
}
</style>