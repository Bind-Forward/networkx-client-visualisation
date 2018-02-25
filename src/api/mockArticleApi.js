import mockData from './mockData/mockArticlesData.json';
import _ from 'lodash';
import axios from 'axios';
import * as urls from '../constants/urls';

class MockArticleApi {
	
	static headers = {
		"Accept": "application/json"
	};

	static getAllArticles(fetchFromUri = true) {
		return new Promise((resolve, reject) => {
			if (fetchFromUri) {
				axios.get(urls.MOCK_ARTICLES_URL, { headers: MockArticleApi.headers })
					.then(response => {
						resolve(response.data)
					}).catch(error => {
						reject(error);
					});
			} else {
				setTimeout(() => {
					resolve(mockData);
				}, 1000);
			}
		});
	}

	static getArticle(articleId) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let article = _.find(mockData, { id: articleId });

				if (!_.isEmpty(article)) {
					resolve(article);
				} else {
					reject("Unable to find article");
				}
			});
		});
	}
}

export default MockArticleApi;