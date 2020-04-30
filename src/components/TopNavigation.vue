<template>
	<div class="fixed top-0 bg-white w-screen p-5 flex" style="left: 3.7rem;">
		<div class="w-4/5">
			<input class="search-input" placeholder="Search your books" />
		</div>
		<div class="w-1/5 flex justify-end mr-16 cursor-pointer items-center" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
			<div class="bg-blue-500 px-3 py-1 rounded-full text-white font-bold mr-2 relative" v-if="user.is_admin">A</div>
			<div class="bg-blue-500 px-3 py-1 rounded-full text-white font-bold mr-2 relative" v-else>{{ user.name.substr(0) }}</div>
			<el-card v-if="showTooltip" class="mt-8 absolute rounded-lg" style="top: 20px; z-index: 99999999;">
				<div slot="header">
					<span>Hello {{ user.name }}</span>
				</div>
				<div class="hover:text-blue-500">Settings</div>
				<div @click="logout" class="hover:text-blue-500 mt-2">Logout</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { AuthService } from '@/api';
export default {
	name: 'top-navigation',
	computed: {
		...mapState({
			user: state => state.auth.user,
		})
	},
	data() {
		return {
			showTooltip: false,
		}
	},
	methods: {
		async logout() {
			const service = new AuthService;
			const { data } = await service.logout();
			if(data.success) this.$router.push({ name: 'Login' });
		}
	}
}
</script>

<style lang="scss" scoped>
.search-input {
	width: 100%;
	height: 100%;
	outline: none;
	font-weight: 600;
}
</style>