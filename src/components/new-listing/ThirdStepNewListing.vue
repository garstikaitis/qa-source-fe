<template>
	<div class="w-3/5 mx-auto">
		<h1 class="text-3xl font-body text-blue-700">Add information</h1>
		<p class="mb-8 text-gray-700 text-lg">Try to be as descriptive as possible, add conditions, mention any quirks that tool may have</p>
		<p class="mb-2 text-gray-700">Description</p>
		<quill @change="val => $store.commit('builder/SET_BUILDER', { key: 'description', value: val })" />
		<div class="w-full mt-20">
			<p class="mb-2 text-gray-700">Condition</p>
			<el-select class="mb-8" @input="$store.commit('builder/SET_BUILDER', { key: 'condition', value: $event })" :value="builder.condition" placeholder="Select">
				<el-option
					v-for="item in conditions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<el-button class="mt-8 w-full" @click="handleNext" type="primary">Continue</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'third-step-new-listing',
	computed: {
		builder() {
			return this.$store.state.builder;
		}
	},
	data() {
		return {
			conditions: [
				{
					label: 'Great',
					value: 'great'
				},
				{
					label: 'Good',
					value: 'good'
				}, 
				{
					label: 'Poor',
					value: 'poor'
				}
			]
		}
	},
	methods: {
		handleNext() {
      if(!this.builder.description.length) {
        this.$notify({
          title: 'Oops',
          message: 'Description cannot be empty',
          type: 'error',
          position: 'bottom-right'
        });
			}
			else if(!this.builder.condition) {
				this.$notify({
          title: 'Oops',
          message: 'Please select condition',
          type: 'error',
          position: 'bottom-right'
        });
			} else {
				this.$store.commit('builder/SET_BUILDER', { key: 'step', value: 3 });
			}
		}
	}
}
</script>

<style>
</style>