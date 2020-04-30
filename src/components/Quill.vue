<template>
	<div>
		<div id="toolbar"></div>
		<div class="h-48">
			<div class="editor min-h-full"></div>			
		</div>
	</div>
</template>

<script>
import Quill from 'quill';
export default {
	name: 'quill',
	mounted() {
		const toolbarOptions = [
			['bold', 'italic', 'underline'],        // toggled buttons
		];
		const options = {
			modules: {
				toolbar: toolbarOptions,
			},
			placeholder: 'Try to be as descriptive as possible, add conditions, mention any quirks that tool may have',
			theme: 'snow'
		};
		const editor = new Quill('.editor', options);
		editor.on('text-change', () => {
			this.$emit('change', editor.root.innerHTML.split('  ').join(' &nbsp;'));
		});
	}
}
</script>