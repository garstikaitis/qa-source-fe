import '@/utils/axios';
import axios from 'axios';

class ChatService {
	async startChat() {
		const { data } = await axios.post('/chat');
		return data;
	}
	async generateChatToken(email) {
		const { data } = await axios.post('/chat/token', { email });
		return data;
	}
}

export default ChatService;