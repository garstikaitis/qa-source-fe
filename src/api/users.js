import axios from 'axios';

class UsersService {
	async getUsers() {
		const { data } = await axios.get('/users');
		return data;
	}
	async addUserToCompany({ companyId, userId }) {
		const { data } = await axios.post('/companies/add-user', { companyId, userId });
		return data;
	}
}

export default UsersService;