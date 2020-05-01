import '@/utils/axios';
import axios from 'axios';

class ProjectsService {
	async getProjects() {
		const { data } = await axios.get('/projects');
		return data;
	}
}

export default ProjectsService;