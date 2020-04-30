<template>
	<div class="w-3/5 mx-auto">
		<h1 class="text-3xl font-body text-blue-700">Upload pictures</h1>
		<p class="mb-8 text-gray-700 text-lg">Try to find fine quality images that look representable</p>
		<dropzone id="dropzone" :options="options" @vdropzone-success="handleFileUploadSuccess" />
		<div class="w-full mt-8">
			<el-button class="w-full" @click="$store.commit('builder/SET_BUILDER', { key: 'step', value: 2 });" type="primary">Continue</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'second-step-new-listing',
	computed: {
		auth() {
			return this.$store.state.auth;
		}
	},
	data() {
		return {
			options: {
				url: ''
			}
		}
	},
	methods: {
		handleFileUploadSuccess(file, response) {
			const images = this.$store.state.builder.images;
			this.$store.commit('builder/SET_BUILDER', { key: 'images', value: [...images, file] });
		}
	},
	created() {
		this.options = {
			url: `http://localhost:3000/files/temp-file?userId=${this.auth.user.id}`,
		};
	}
}
</script>