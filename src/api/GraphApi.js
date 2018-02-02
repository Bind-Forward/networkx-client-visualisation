import axios from 'axios';
import * as urls  from '../constants/urls';

class GraphApi {	
	static getGraph(articleId = 1) {
		return axios.get(`${urls.GRAPH_URL}/${articleId}`)
			.then(response => {
				return response.data;
			}).catch(error => {
				throw error;
			});
	}
}

export default GraphApi;