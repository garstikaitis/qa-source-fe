import '@/utils/axios';
import axios from 'axios';

class ChatService {
	async startChat({ clientId, taskId }) {
		const { data } = await axios.post('/chat', {
			clientId,
			taskId
		});
		return data;
	}
	async generateChatToken(email) {
		const { data } = await axios.post('/chat/token', { email });
		return data;
	}
}

export default ChatService;