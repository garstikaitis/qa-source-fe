<template>
	<div class="fixed top-0 left-0 bg-white flex flex-col p-3 h-screen shadow">
		<img :src="require('../assets/logo.png')" style="width: 40px;" class="mb-12 mt-2" />
		<div v-if="auth.user.role === 'admin'">
			<router-link :to="{ name: 'Dashboard' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'Dashboard'" class="activeIndicator"></div>
					<i class="el-icon-coordinate text-4xl" :class="{ activeIcon: $route.name === 'Dashboard' }"></i>
				</div>
			</router-link>
			<router-link :to="{ name: 'Projects' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'Projects'" class="activeIndicator"></div>
					<i class="el-icon-picture-outline-round text-4xl"  :class="{ activeIcon: $route.name === 'Projects' }"></i>
				</div>
			</router-link>
			<router-link :to="{ name: 'Tasks' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'Tasks'" class="activeIndicator"></div>
					<i class="el-icon-edit text-4xl"  :class="{ activeIcon: $route.name === 'Tasks' }"></i>
				</div>
			</router-link>
			<router-link v-if="auth.user.role === 'admin'" :to="{ name: 'Companies' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'Companies'" class="activeIndicator"></div>
					<i class="el-icon-phone-outline text-4xl"  :class="{ activeIcon: $route.name === 'Companies' }"></i>
				</div>
			</router-link>
			<router-link :to="{ name: 'NewListing' }">
				<div class="relative">
					<div v-if="$route.name === 'NewListing'" class="activeIndicator"></div>
					<i class="el-icon-circle-plus-outline text-4xl"  :class="{ activeIcon: $route.name === 'NewListing' }"></i>
				</div>
			</router-link>
		</div>
		<div v-if="auth.user.role === 'tester'">
			<router-link :to="{ name: 'TesterDashboard' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'TesterDashboard'" class="activeIndicator"></div>
					<i class="el-icon-coordinate text-4xl" :class="{ activeIcon: $route.name === 'TesterDashboard' }"></i>
				</div>
			</router-link>
			<router-link :to="{ name: 'TesterProjects' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'TesterProjects'" class="activeIndicator"></div>
					<i class="el-icon-picture-outline-round text-4xl"  :class="{ activeIcon: $route.name === 'TesterProjects' }"></i>
				</div>
			</router-link>
			<router-link :to="{ name: 'TesterTasks' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'TesterTasks'" class="activeIndicator"></div>
					<i class="el-icon-edit text-4xl"  :class="{ activeIcon: $route.name === 'TesterTasks' }"></i>
				</div>
			</router-link>
		</div>
		<div v-if="auth.user.role === 'client'">
			<router-link :to="{ name: 'ClientDashboard' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'ClientDashboard'" class="activeIndicator"></div>
					<i class="el-icon-coordinate text-4xl" :class="{ activeIcon: $route.name === 'ClientDashboard' }"></i>
				</div>
			</router-link>
			<router-link :to="{ name: 'ClientProjects' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'ClientProjects'" class="activeIndicator"></div>
					<i class="el-icon-picture-outline-round text-4xl"  :class="{ activeIcon: $route.name === 'ClientProjects' }"></i>
				</div>
			</router-link>
			<router-link :to="{ name: 'ClientTasks' }">
				<div class="mb-6 relative">
					<div v-if="$route.name === 'ClientTasks'" class="activeIndicator"></div>
					<i class="el-icon-edit text-4xl"  :class="{ activeIcon: $route.name === 'ClientTasks' }"></i>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'side-navigation',
	computed: {
		...mapState({
			auth: state => state.auth
		})
	},
}
</script>

<style scoped>
.activeIcon {
	color: #6C63FF;
}
.activeIndicator {
	position: absolute;
	top: 0;
	right: -12px;
	height: 100%;
	width: 3px;
	background-color: #6C63FF;
}
</style>