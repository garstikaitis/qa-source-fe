<template>
	<div class="w-1/4 ml-4 bg-white rounded-lg shadow py-2 px-4 h-48">
		<div class="font-body font-bold">My profile</div>
		<div>{{ auth.user.name }}</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'my-profile',
	computed: {
		...mapState({
			auth: state => state.auth,
		})
	}
}
</script>