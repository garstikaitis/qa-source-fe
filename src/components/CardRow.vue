<template>
	<div class="w-full flex justify-between items-center">
		<div class="text-gray-600">{{ name }}</div>
		<div class="text-blue-900"><slot></slot></div>
	</div>
</template>
<script>
export default {
	name: 'card-row',
	props: {
		name: String,
		required: true,
	}
}
</script>