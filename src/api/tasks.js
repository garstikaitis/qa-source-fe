import '@/utils/axios';
import axios from 'axios'

class TasksService {
	async getTasks() {
		const { data } = await axios.get('/tasks');
		return data;
	}
	async getTask(taskId) {
		const { data } = await axios.post('/tasks', { taskId });
		return data;
	}
	async createTask(input) {
		const { data } = await axios.post('/tasks/create', { ...input });
		return data;
	}
	async assignTaskToUser({ taskId, userId }) {
		const { data } = await axios.post('/projects/take', { taskId, userId });
		return data;
	}
}

export default TasksService;