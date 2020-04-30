import axios from 'axios';

class CompaniesService {
	async getCompanies() {
		const { data } = await axios.get('/companies');
		return data;
	}
	async createCompany(input) {
		const { data } = await axios.post('/companies/create', { ...input });
		return data;
	}
}

export default CompaniesService;