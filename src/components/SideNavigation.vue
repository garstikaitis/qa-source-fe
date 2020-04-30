<template>
	<div class="fixed top-0 left-0 bg-white flex flex-col p-3 pt-20 h-screen shadow">
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
		<router-link :to="{ name: 'Companies' }">
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
</template>

<script>
export default {
	name: 'side-navigation',
	mounted() {
		console.log(this.$route);
	}
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