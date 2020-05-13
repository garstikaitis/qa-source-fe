import '@/utils/axios';
import axios from 'axios';

class UsersService {
	async getUsers() {
		const { data } = await axios.get('/users');
		return data;
	}

	async getMe() {
		const { data } = await axios.get('/users/me');
		return data;
	}
}

export default UsersService;