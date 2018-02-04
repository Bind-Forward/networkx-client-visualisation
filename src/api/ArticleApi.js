import axios from 'axios';
import * as urls from '../constants/urls';

class ArticleApi {
	static headers = {
		"Accept": "application/json"
	};
	
	static getAllArticles() {
		return axios.get(urls.ARTICLES_URL, { headers: ArticleApi.headers })
			.then(response => {
				return response.data;
			}).catch(error => {
				throw error;
			});
	}

	static getArticle(articleId) {
		return axios.get(`${urls.ARTICLE_URL}/${articleId}`, { headers: ArticleApi.headers })
			.then(response => {
				return response.data;
			}).catch(error => {
				throw error;
			})
	}
}

export default ArticleApi;