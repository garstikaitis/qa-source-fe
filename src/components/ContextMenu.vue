<template>
	<div class="absolute font-display bg-white shadow p-2 z-50 w-32 right-0">
		<div v-for="(item, index) in items" :key="index" class="cursor-pointer hover:bg-gray-100 my-1 text-sm">
			{{ item }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'context-menu',
	props: {
		items: {
			type: Array,
			default: () => []
		}
	}
}
</script>