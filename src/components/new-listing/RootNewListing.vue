<template>
	<div>
		<first-step-new-listing v-if="builder.step === 0" />
		<second-step-new-listing v-if="builder.step === 1" />
		<third-step-new-listing v-if="builder.step === 2" />
		<fourth-step-new-listing v-if="builder.step === 3" />
		<fifth-step-new-listing v-if="builder.step === 4" />
		<progress-new-listing />
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'root-new-listing',
	computed: mapState({
		builder: state => state.builder,
	}),
}
</script>