<template>
	<i class="material-icons relative" v-on="$listeners" @mouseenter="showHint = true" @mouseleave="showHint = false" :class="{'cursor-pointer': clickable}">
		<slot></slot>
		<div class="absolute hint-container bg-white shadow font-display text-sm p-2" v-if="showHint && hint">
			{{ hint }}
		</div>
	</i>
</template>

<script>
export default {
	name: 'icon',
	props: {
		clickable: {
			type: Boolean,
			default: true,
		},
		hint: {
			type: String,
		}
	},
	data() {
		return {
			showHint: false,
		}
	}
}
</script>

<style scoped>
.hint-container {
	top: 20px;
	right: 0px;
}
</style>