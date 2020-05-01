import '@/utils/axios';
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
	async addUserToCompany({ companyId, userId }) {
		const { data } = await axios.post('/companies/add-user', { companyId, userId });
		return data;
	}
}

export default CompaniesService;