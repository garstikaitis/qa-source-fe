<template>
	<div>
		<top-navigation />
		<side-navigation />
		<div class="bg-gray-100 min-h-screen pt-20 pl-20 pr-5">
			<div class="w-full justify-between flex items-center mb-5 mt-4">
				<h1 class="font-bold text-gray-800 text-2xl font-body">{{ title }}</h1>
				<slot name="top-button"></slot>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'page',
	props: {
		title: String,
		required: true,
	}
}
</script>