import '@/utils/axios';
import axios from 'axios';

class ProjectsService {
	async getProjects() {
		const { data } = await axios.get('/projects');
		return data;
	}
	async getProject(id) {
		const { data } = await axios.post(`/projects`, { projectId: id });
		return data;
	}
	async returnProject(formData) {
		const { data } = await axios.post('/projects/return', formData);
		return data;
	}
}

export default ProjectsService;