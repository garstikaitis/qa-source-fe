<template>
	<div>
		<page>
			Dashboard
		</page>
	</div>
</template>

<script>
import { CompaniesService } from '@/api';
import axios from 'axios';
export default {
	name: 'Dashboard',
	async mounted() {
		const service = new CompaniesService;
		await service.getCompanies();
	}
}
</script>