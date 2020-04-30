import axios from 'axios';
import Cookies from 'js-cookie';

class AuthService {
	async register({ email, password }) {
		const { data, success } = await axios.post('/register', { email, password });
		axios.defaults.headers['Authorization'] = `Bearer ${data.data.api_token}`;
		Cookies.set('authToken', data.data.api_token);
		return { data, success };
	}

	async login({ email, password }) {
		const { data, success } = await axios.post('/login', { email, password });
		axios.defaults.headers['Authorization'] = `Bearer ${data.data.api_token}`;
		Cookies.set('authToken', data.data.api_token);
		return { data, success };
	}

	async logout() {
		const { data, success } = await axios.post('/logout');
		axios.defaults.headers['Authorization'] = ``;
		Cookies.set('authToken', '');
		return { data, success };
	}
}

export default AuthService;