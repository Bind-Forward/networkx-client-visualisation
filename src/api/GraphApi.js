import axios from 'axios';
import * as urls from '../constants/urls';

class GraphApi {
	static headers = {
		"Accept": "application/json"
	};

	static getGraph(articleId, dictionaryTypes) {
		const params = {
			"article_id": articleId,
			"dictionary_types": { ...dictionaryTypes }
		};

		return axios.get(urls.GRAPHS_URL, { params: params, headers: GraphApi.headers })
			.then(response => {
				return response.data;
			}).catch(error => {
				throw error;
			});
	}
}

export default GraphApi;