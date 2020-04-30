<template>
	<div class="w-3/5 mx-auto">
		<h1 class="text-3xl font-body text-blue-700">Review your listing</h1>
		<p class="mb-8 text-gray-700 text-lg">Make sure everything is correct and hit Publish when you are ready</p>


	</div>
</template>

<script>
export default {
	name: 'fifth-step-new-listing',
	computed: {
		builder() {
			return this.$store.state.builder;
		}
	}
}
</script>