<template>
	<div class="w-3/5 mx-auto">
		<h1 class="text-3xl font-body text-blue-700">Finishing touches</h1>
		<p class="mb-8 text-gray-700 text-lg">Add final details, such as price, availability, return time</p>
		<p class="text-gray-700">Price per day <span class="text-gray-500">in EUR</span></p>
		<el-input @input="$store.commit('builder/SET_BUILDER', { key: 'price', value: $event })" :value="builder.price" placeholder="34.50" />
		<div class="w-full">
			<el-button class="mt-8 w-full" @click="handleNext" type="primary">Continue</el-button>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		builder() {
			return this.$store.state.builder;
		}
	},	
	methods: {
		handleNext() {
			if(!this.builder.price) {
				this.$notify({
          title: 'Oops',
          message: 'Price can not be null',
          type: 'error',
          position: 'bottom-right'
        });
			}
			else {
				this.$store.commit('builder/SET_BUILDER', { key: 'step', value: 4 });
			}
		}
	},
	name: 'fourth-step-new-listing'
}
</script>