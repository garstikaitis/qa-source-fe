<template>
	<div class="w-full bg-white p-4 shadow rounded-lg">
		<div class="font-body text-lg">
			<slot name="title"></slot>
		</div>
		<el-divider />
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'card',
}
</script>