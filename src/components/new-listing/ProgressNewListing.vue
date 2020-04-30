<template>
	<div class="w-3/5 mx-auto flex justify-around mt-12">
		<div @click="handleStepChange({ step: i - 1 })" :class="{ active: currentStep === i - 1 }" class="cursor-pointer rounded-full text-white font-bold circle bg-blue-600 flex items-center justify-center" v-for="i in 5" :key="i">{{ i }}</div>
	</div>
</template>

<script>
export default {
	name: 'progress-new-listing',
	computed: {
		currentStep() {
			return this.$store.state.builder.step;
		}
	},
	methods: {
		handleStepChange({ step }) {
			this.$store.commit('builder/SET_BUILDER', { key: 'step', value: step })
		} 
	}
}
</script>

<style lang="scss" scoped>
.circle {
	width: 40px;
	height: 40px;
	opacity: 0.4;
	&.active {
		opacity: 1;
	}
}
</style>