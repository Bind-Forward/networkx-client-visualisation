import mockData from './mockArticlesData';
import _ from 'lodash';

class MockArticleApi {
	static getAllArticles() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(mockData);
			}, 1000);
		});
	}

	static getArticle(articleId) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let article =  _.find(mockData, { id: articleId });

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